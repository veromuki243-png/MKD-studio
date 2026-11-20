# Floute tous les visages détectés sauf celui du prof (casquette, à droite).
import cv2, json, sys, subprocess
video, dets, sortie, apercu = sys.argv[1:5]
F = json.load(open(dets))["frames"]
# Suivi du prof : on part de sa position connue et on prend, image par image,
# la détection la plus proche (sinon on garde la dernière position).
DEPART = [float(v) for v in sys.argv[5].split(",")]  # cx,cy du prof à l'image 0
pos = DEPART; PROF = []
for dl in F:
    best, bd = None, 1e9
    for d in dl:
        cx, cy = d[0] + d[2]/2, d[1] + d[3]/2
        dist = ((cx - pos[0])**2 + (cy - pos[1])**2) ** 0.5
        if dist < 55 and d[2] >= 15 and dist < bd: best, bd = d, dist
    PROF.append(best)
    if best: pos = [best[0] + best[2]/2, best[1] + best[3]/2]
A_FLOUTER = [[d for d in dl if d is not PROF[i]] for i, dl in enumerate(F)]
# Personne au premier plan (tête haute, y < 780) : on comble les trous de détection
# (visage de profil) par interpolation entre les positions connues.
GRAND = [next((d for d in dl if d[1] + d[3]/2 < 780 and d[2] >= 20), None) for dl in F]
connus = [i for i, g in enumerate(GRAND) if g]
for a, b in zip(connus, connus[1:]):
    if 1 < b - a <= 40:
        for i in range(a + 1, b):
            t = (i - a) / (b - a)
            A_FLOUTER[i].append([GRAND[a][k] + (GRAND[b][k] - GRAND[a][k]) * t for k in range(4)] + [1.0])
json.dump([[p[0] + p[2]/2, p[1] + p[3]/2] if p else None for p in PROF], open(sortie + ".prof.json", "w"))
R = 4  # dilatation temporelle (images)
cap = cv2.VideoCapture(video); fps = cap.get(5); W = int(cap.get(3)); H = int(cap.get(4))
tmp = sortie + ".tmp.mp4"
vw = cv2.VideoWriter(tmp, cv2.VideoWriter_fourcc(*"mp4v"), fps, (W, H))
i = 0; apercus = {}
while True:
    ok, f = cap.read()
    if not ok: break
    for j in range(max(0, i - R), min(len(F), i + R + 1)):
        for x, y, w, h, s in A_FLOUTER[j]:
            cx, cy = x + w/2, y + h/2; bw, bh = w * 0.95, h * 0.9
            pr = PROF[i]
            if pr and abs(cx - (pr[0] + pr[2]/2)) < pr[2] * 1.2 and abs(cy - (pr[1] + pr[3]/2)) < pr[3] * 1.2: continue
            x0, y0, x1, y1 = int(max(0, cx - bw)), int(max(0, cy - bh)), int(min(W, cx + bw)), int(min(H, cy + bh))
            if x1 - x0 < 4 or y1 - y0 < 4: continue
            roi = f[y0:y1, x0:x1]
            k = max(15, (int(w) // 2) * 2 + 1)
            flou = cv2.GaussianBlur(cv2.resize(cv2.resize(roi, (max(1, (x1-x0)//6), max(1, (y1-y0)//6))), (x1-x0, y1-y0)), (k, k), 0)
            masque = cv2.ellipse(__import__("numpy").zeros(roi.shape[:2], "uint8"), ((x1-x0)//2, (y1-y0)//2), ((x1-x0)//2, (y1-y0)//2), 0, 0, 360, 255, -1)
            roi[masque > 0] = flou[masque > 0]
    vw.write(f)
    if i in (10, 80, 140, 250): apercus[i] = cv2.resize(f[450:1150, :], None, fx=0.5, fy=0.5)
    i += 1
vw.release()
subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", tmp, "-i", video, "-map", "0:v", "-map", "1:a?", "-c:v", "libx264", "-crf", "20", "-pix_fmt", "yuv420p", "-c:a", "copy", sortie], check=True)
import os; os.remove(tmp)
k = sorted(apercus); cv2.imwrite(apercu, cv2.vconcat([cv2.hconcat([apercus[k[0]], apercus[k[1]]]), cv2.hconcat([apercus[k[2]], apercus[k[3]]])]))
print("ok", i, "images")
