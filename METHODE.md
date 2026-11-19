# Méthode de montage — MKD Studio

Comment on travaille ensemble, de la prise de vue à la publication.

---

## 1. Le brief

Avant chaque vidéo, on fixe :

- **L'objectif** : remplir un cours, annoncer un spectacle, montrer les progrès des élèves, présenter l'école…
- **La plateforme** : elle décide du format et de la durée (voir le tableau ci-dessous).
- **Le message principal**, en une phrase.
- **L'appel à l'action** : « Inscris-toi », « Cours d'essai gratuit », « Réserve ta place »…
- **L'échéance**.

→ La vidéo est ajoutée dans `SUIVI.md` avec le statut 💡 Idée.

## 2. Le tournage

- **Filmer à l'horizontale ou à la verticale selon la destination.** En cas de doute, filmer en 4K à l'horizontale : on peut recadrer à la verticale ensuite.
- **Bien éclairer** : face à la lumière, jamais à contre-jour devant une fenêtre.
- **Stabiliser** : trépied ou téléphone posé, pas à main levée pendant une chorégraphie complète.
- **Plans larges + plans serrés** : le plan large montre la chorégraphie, les gros plans (pieds, mains, visages) donnent l'émotion.
- **Plusieurs prises** de la même chorégraphie, pour choisir la meilleure.
- **Noter la musique utilisée** (titre, artiste, version) pour pouvoir la caler au montage.
- **Autorisations** : vérifier le droit à l'image des élèves, surtout des mineurs.

## 3. L'envoi des fichiers

- Déposer les rushs dans `public/rushs/<nom-de-la-video>/`.
- Les fichiers de plus de 100 Mo ne passent pas sur GitHub : envoyer un lien de téléchargement direct (Google Drive, WeTransfer…).
- Musiques dans `public/musique/`, logo et éléments graphiques dans `public/marque/`.

→ Statut 📥 Rushs reçus.

## 4. Le montage

L'outil est **Remotion** (montage par code) avec **ffmpeg** pour les traitements (découpe, conversion, son).

Structure type d'une vidéo courte pour les réseaux :

| Moment | Durée | Contenu |
|--------|-------|---------|
| Accroche | 0–2 s | Le mouvement le plus spectaculaire, tout de suite. Pas de logo au début. |
| Développement | 2–20 s | La chorégraphie, coupes sur les temps forts de la musique. |
| Chute | dernières 2–3 s | Logo MKD Studio + appel à l'action + infos pratiques. |

Règles :
- **Couper sur le temps** : les changements de plan tombent sur les temps forts de la musique.
- **Texte lisible sans le son** : la plupart des vidéos sont regardées en muet.
- **Respecter les zones de sécurité** en 9:16 : pas de texte important en haut (≈ 250 px) ni en bas (≈ 400 px), où s'affichent les boutons de l'application.
- **Appliquer la DA** (`DA.md`) : couleurs, polices, logo, animations.
- Chaque type de vidéo récurrent devient un **modèle réutilisable** dans `src/`.

→ Statut ✂️ En montage.

## 5. La validation

- Je fournis une version de relecture.
- Retours précis, de préférence avec le minutage : « à 0:08, couper plus tôt », « remplacer le texte par… ».
- Deux allers-retours maximum par vidéo, idéalement.

→ Statut 👀 À valider puis ✅ Validée.

## 6. L'export et la publication

| Plateforme | Format | Résolution | Durée conseillée |
|------------|--------|------------|------------------|
| Instagram Reels | 9:16 | 1080×1920 | 15–30 s |
| TikTok | 9:16 | 1080×1920 | 15–45 s |
| YouTube Shorts | 9:16 | 1080×1920 | < 60 s |
| Post Instagram / Facebook | 4:5 | 1080×1350 | 15–60 s |
| YouTube / site web | 16:9 | 1920×1080 | 1–5 min |

- Export en MP4 (H.264, AAC), 30 images/seconde.
- **Musique** : pour Instagram et TikTok, ajouter la musique directement dans l'application pour éviter les blocages de droits d'auteur. Exporter alors une version sans musique ou avec le son d'ambiance.
- Prévoir une **miniature** (image de couverture) et le **texte de publication** (légende + hashtags).

→ Statut 📢 Publiée : renseigner la date et le lien dans `SUIVI.md`.

## 7. Le bilan

Quelques jours après la publication, noter dans `SUIVI.md` les vues et les retours, pour voir ce qui marche le mieux et ajuster les prochaines vidéos.

---

## Aide-mémoire des commandes

```bash
npm run dev                                    # Prévisualisation (Remotion Studio)
npx remotion render <Composition> out/x.mp4    # Export d'une vidéo
```
