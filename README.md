# Global Education Institute — Official Website

**Live website for Global Education Institute (GEI)**, a secondary education institution providing world-class, bilingual (English & Burmese) education for Myanmar students in Grades 10–12.

## 🌐 Pages

| Page | Description |
|------|-------------|
| **Home** | Hero, key stats, features, program previews, CTA |
| **Academic Programs** | Full Grade 10–12 subject breakdowns with topics |
| **About Us** | Mission, values, founder profile |
| **Content Hub** | Downloadable PDFs, textbook chapters, study guides |

## 🎨 Brand

- **Primary:** `#0e4c90` (Pantone 293 C)
- **Secondary:** `#59cdf7`
- **Accent:** `#fcfcfc`
- **Font:** Poppins (English) / W28Art House (Burmese)

## 🚀 Deployment (GitHub Pages)

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Set source: **Deploy from a branch → `main` → `/ (root)`**
4. Your site will be live at `https://<username>.github.io/<repo-name>/`

## 📁 File Structure

```
gei-website/
├── index.html       # Main site (single-page, all 4 sections)
├── style.css        # Full stylesheet
├── app.js           # Navigation, animations, filter logic
├── assets/
│   └── logo.svg     # GEI shield crest logo
└── README.md
```

## ✏️ How to Update

- **Add content:** Edit sections directly in `index.html`
- **New resources:** Add `.content-card` divs in the Content Hub section with appropriate `data-category` (`grade10`, `grade11`, `grade12`, or `guide`)
- **Style changes:** All design tokens are CSS variables in `:root` inside `style.css`
- **Logo:** Replace `assets/logo.svg` with the official vector file

## 📌 Future Improvements

- [ ] Add real downloadable PDF links in Content Hub
- [ ] Myanmar/Burmese language toggle
- [ ] Student portal / login
- [ ] Online enrollment form
- [ ] News & announcements section
- [ ] Gallery / events section

---

*Built for Global Education Institute · Myanmar*
