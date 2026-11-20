# Relie les détections image par image en « pistes » (une par personne)
import json, sys, math
d = json.load(open(sys.argv[1])); F = d["frames"]
pistes = []  # {id, pts: {frame: [cx, cy, w, h]}}
actives = []
for i, dets in enumerate(F):
    libres = list(range(len(dets)))
    for p in sorted(actives, key=lambda p: -len(p["pts"])):
        last_f = max(p["pts"]); cx, cy, w, h = p["pts"][last_f]
        if i - last_f > 20: continue
        best, bd = None, 1e9
        for j in libres:
            x, y, W, H, s = dets[j]; dx = x + W/2 - cx; dy = y + H/2 - cy
            dist = math.hypot(dx, dy)
            if dist < max(45, 2.2*w) and dist < bd: best, bd = j, dist
        if best is not None:
            x, y, W, H, s = dets[best]; p["pts"][i] = [x + W/2, y + H/2, W, H]; libres.remove(best)
    for j in libres:
        x, y, W, H, s = dets[j]
        p = {"id": len(pistes), "pts": {i: [x + W/2, y + H/2, W, H]}}; pistes.append(p); actives.append(p)
    actives = [p for p in actives if i - max(p["pts"]) <= 20]
out = [{"id": p["id"], "pts": {str(k): v for k, v in p["pts"].items()}} for p in pistes]
json.dump(out, open(sys.argv[2], "w"))
for p in pistes:
    ks = sorted(p["pts"]); 
    if len(ks) < 3: continue
    m = [sum(p["pts"][k][a] for k in ks)/len(ks) for a in range(4)]
    print(f'piste {p["id"]:3d}: images {ks[0]:3d}-{ks[-1]:3d} ({len(ks):3d} dét.) centre moyen ({m[0]:.0f},{m[1]:.0f}) taille {m[2]:.0f}')
