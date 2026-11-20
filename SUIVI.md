# Suivi des montages — MKD Studio

Tableau de bord de toutes les vidéos de l'école : ce qui est en cours, ce qui est publié, ce qui reste à faire.

**Statuts :** 💡 Idée · 📥 Rushs reçus · ✂️ En montage · 👀 À valider · ✅ Validée · 📢 Publiée

---

## En cours

| # | Vidéo | Type | Format | Plateforme | Statut | Échéance | Notes |
|---|-------|------|--------|------------|--------|----------|-------|
| 001 | Intro MKD Studio | Intro / générique | 9:16 · 3 s | Reels, TikTok | 👀 À valider | — | V3 : sous-titre « MORE THAN DANCE » (`Intro`) ou « BIEN PLUS QUE DES COURS DE DANSE » (`Intro-FR`) — choisir la version |
| 002 | Pub Meta — Groupe Formation | Publicité | 9:16 · ≈ 22 s | Meta (Reels, Stories, fil) | 👀 À valider | — | V4 (`Pub-Formation`, ≈ 19 s, sans musique) : « Envie de faire partie d'un groupe de danse ? » → Groupe formation → Voyages → Cours intensifs → Shootings → Et bien plus… → fin. Inscriptions ados & adultes dès 11 ans, bouton « S'inscrire » : accroche « T'as envie de faire partie du groupe ? » → voyages, cours intensifs, shootings, profs invités, concours → « Rejoins le groupe » |
| 003 | Pub Meta — Cours ados (4 versions) | Publicité A/B | 9:16 · 13–19 s | Meta | 👀 À valider | — | V1 Question · V2 Rythme · V3 Écran partagé · V4 Check-list. Messages : hip-hop & afro, freestyle & chorégraphie, mercredi & jeudi, dès 11 ans |
| 004 | Pub Meta — Cours adultes (4 versions) | Publicité A/B | 9:16 · 14–20 s | Meta | 👀 À valider | — | V1 Question · V2 Métro-boulot-dodo · V3 Écran partagé · V4 Check-list. Afterwork & hip-hop, chaque jeudi, ambiance garantie |

## Idées / à venir

| Vidéo | Type | Plateforme | Pour quand | Notes |
|-------|------|------------|------------|-------|
| Teaser de rentrée | Teaser de cours | Instagram, TikTok | | |
| Extrait de spectacle | Captation | YouTube, Facebook | | |
| Présentation de l'école | Vidéo de marque | Site web, YouTube | | |

## Publiées

| # | Vidéo | Plateforme | Date de publication | Lien | Vues / retours |
|---|-------|------------|---------------------|------|----------------|
| | | | | | |

---

## Journal

### 2026-11-19
- Remotion 4.0.545 installé dans le projet.
- Création de la composition `Intro` (1080×1920, 30 i/s, 3 s) : premier rendu de test réussi.
- Création des fichiers `SUIVI.md`, `METHODE.md` et `DA.md`.

- Remotion configuré pour utiliser le Chromium installé (téléchargement bloqué par le réseau).

### 2026-11-19 (suite)
- Logo reçu → versions blanche et noire à fond transparent dans `public/marque/`.
- DA complétée : noir et blanc, police Montserrat, street dance (hip-hop, afro, break), développement personnel et préparation physique, public enfants / ados / adultes.
- Intro V2 aux couleurs de l'école.
- Site mkdstudio.co non accessible depuis l'environnement de montage → infos pratiques à fournir.

- Intro V3 : la signature remplace « Street dance », en anglais et en français.

### Pub Meta — Groupe Formation
- Maquette 9:16 créée avec emplacements pour 8 plans + carte de fin.
- 2026-11-20 : 6 rushs reçus, convertis en H.264 1080×1920 30 i/s (`public/rushs/formation/rush1…6.mp4`).
  - rush1 : montage existant (couloir, prof, cours d'anatomie, aéroport, soirée, ville)
  - rush2 : grand cours en ligne avec prof en rouge
  - rush3 : backstage shooting studio
  - rush4 : cours dans la grande salle, travail au sol
  - rush5 : photo de groupe avec les lettres MKD
  - rush6 : danse à deux, caméra à la main
- V1 montée.
- V2 : nouvelle accroche sur la vidéo du couloir, rubrique « Concours » supprimée.
- V3 : 2 nouveaux rushs (rush7 grande salle, rush8 danse en cercle) pour « Groupe formation » ; photo MKD déplacée dans « Shootings » ; « More than dance » supprimée ; « Profs invités » réduit au prof au t-shirt Tupac. 
- V4 : accroche raccourcie (« Envie de faire partie d'un groupe de danse ? »), « Profs invités » remplacé par « Et bien plus… ». Manque : musique.

### Pub Meta — Cours ados (4 versions)
- 2026-11-20 : 10 rushs reçus → `public/rushs/ados/ado1…10.mp4` (non enregistrés sur GitHub : élèves mineurs).
- 4 versions pour tester sur Meta :
  - `Pub-Ados-V1-Question` (19 s) : « Tu cherches un cours de danse ? » → une rubrique par message
  - `Pub-Ados-V2-Rythme` (13,5 s) : mots-chocs, coupes rapides
  - `Pub-Ados-V3-Ecran-partage` (14,5 s) : deux vidéos face à face (hip-hop/afro, freestyle/chorégraphie, mercredi/jeudi)
  - `Pub-Ados-V4-Check-list` (14,3 s) : un seul plan, check-list qui se remplit
- Correction : les plans « hip-hop » étaient de l'afro. 6 nouveaux rushs (ado11…16). Classement validé : hip-hop = ado7, 11, 12, 13, 15 · afro = ado3, 6, 9, 10 · freestyle = ado14, 16. V1, V2, V3 mises à jour.
- Retours : « Chorés commerciales » → « Chorégraphie » partout ; V1 hip-hop = trio (ado17) ; V2 hip-hop = groupe (ado18) ; chorégraphie V1 et V3 = groupe seul (ado18) ; « Le programme » retiré de l'intro V3.

### Pub Meta — Cours adultes (4 versions)
- 2026-11-20 : 5 rushs reçus → `public/rushs/adultes/adu1…5.mp4` (non enregistrés sur GitHub).
- Floutage des visages sur le cours de hip-hop (adu3) : détection automatique (OpenCV / YuNet), tous les visages floutés sauf le prof à casquette → `adu3-floute.mp4`. Scripts dans `outils/`.
- 4 versions :
  - `Pub-Adultes-V1-Question` (20 s) : « Envie de te détendre après le boulot ? » → Ne pense à rien → Amuse-toi → Afterwork dance → Hip-hop → Chaque jeudi → Ambiance garantie
  - `Pub-Adultes-V2-Metro-boulot-dodo` (14 s) : cartons noirs « Métro. Boulot. Dodo ? » → « Pas le jeudi. » → Afterwork, Hip-hop, Zéro prise de tête, Ambiance garantie
  - `Pub-Adultes-V3-Ecran-partage` (14,5 s) : Afterwork/Hip-hop · Détente/Ambiance · Chaque/Jeudi
  - `Pub-Adultes-V4-Check-list` (14,3 s) : « Ton jeudi soir » + check-list (4 cases cochées puis phrase finale « Il ne manque que toi »)

**Prochaines étapes**
- [ ] Valider la V4 de la pub Formation
- [ ] Choisir les versions ados à lancer (test A/B)
- [ ] Valider le floutage et choisir les versions adultes
- [ ] Choisir la musique
- [ ] Choisir la version de l'intro (EN ou FR)
- [ ] Fournir les infos pratiques (adresse, Instagram, téléphone, offre d'essai) pour la carte de fin
- [ ] Recevoir les premiers rushs
- [ ] Choisir le premier montage à réaliser
