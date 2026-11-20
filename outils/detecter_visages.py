import cv2, json, sys
video, modele, sortie = sys.argv[1], sys.argv[2], sys.argv[3]
ech = float(sys.argv[4]) if len(sys.argv) > 4 else 2.0
cap = cv2.VideoCapture(video)
W = int(cap.get(3)); H = int(cap.get(4))
# on ne regarde que la bande où sont les têtes (y 30%–65%) pour aller vite, agrandie
y0, y1 = int(H*0.30), int(H*0.62)
det = cv2.FaceDetectorYN.create(modele, "", (int(W*ech), int((y1-y0)*ech)), 0.55, 0.3, 5000)
res = []; n = 0
while True:
    ok, f = cap.read()
    if not ok: break
    crop = cv2.resize(f[y0:y1], None, fx=ech, fy=ech)
    _, faces = det.detect(crop)
    L = []
    if faces is not None:
        for x, y, w, h, *rest in faces:
            L.append([round(float(x)/ech,1), round(float(y)/ech+y0,1), round(float(w)/ech,1), round(float(h)/ech,1), round(float(rest[-1]),2)])
    res.append(L); n += 1
json.dump({"W": W, "H": H, "frames": res}, open(sortie, "w"))
print(n, "frames;", sum(1 for r in res if r), "avec visages; max", max(len(r) for r in res))
