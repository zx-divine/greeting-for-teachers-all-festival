# 🎁 Festival Greeting Cards

A personalized, date-locked 3D greeting card web app — built for teachers, made with love.

> ⚠️ **Before you deploy this: change the greeter's name.**
> Every page currently says **"GREETING VIA MANURAJ PANDEY"** — that's the original author's name, hardcoded as a placeholder. If you're forking or reusing this project, find-and-replace `MANURAJ PANDEY` with your own name in every `.html` file before you make it public, or your visitors will be seeing greetings "from" someone else.
>
> It appears twice per file — once on the card's front cover (`.cover-via`) and once inside on the parchment (`.via-line`).

Type in your name, and watch a golden 3D card open just for you with a handwritten greeting. Each festival has its own theme, its own message, and only unlocks on the actual day.

**Live pages:**
| Page | Occasion |
|---|---|
| `index.html` | Teachers' Day |
| `diwali.html` | Diwali |
| `christmas.html` | Christmas |
| `newyear.html` | New Year |
| `holi.html` | Holi |
| `independence-day.html` | Independence Day |
| `republic-day.html` | Republic Day |

## ✨ Features

- **Real 3D card** — built with CSS `perspective` + `rotateY`, not a fake flip animation
- **Date-locked** — each page checks today's date against the festival date:
  - too early → "you're a little early" message
  - too late → "you missed it this year" message
  - on the day → the actual card unlocks
- **Personalized** — visitor types their name, it's woven into the greeting live (no backend, no database)
- **Mobile + desktop responsive**, keyboard accessible, respects `prefers-reduced-motion`
- **Zero dependencies** — pure HTML, CSS, and vanilla JS. No build step, no framework.

## 🛠️ Tech

- Plain HTML/CSS/JS — works on any static host (GitHub Pages, InfinityFree, Netlify, anywhere)
- Shared `css/festival-base.css` and `js/festival-app.js` power every page — only the greeting text, colors, and target date change per festival
- Fonts: [Cormorant Garamond / Cormorant SC](https://fonts.google.com/specimen/Cormorant+Garamond) + [Poppins](https://fonts.google.com/specimen/Poppins) via Google Fonts

## 📂 Structure

```
.
├── index.html                 # Teachers' Day
├── diwali.html
├── christmas.html
├── newyear.html
├── holi.html
├── independence-day.html
├── republic-day.html
├── css/
│   └── festival-base.css      # shared styling for all pages
└── js/
    └── festival-app.js        # shared logic: date-gate, name capture, 3D card
```

## 🚀 Running locally

No build tools needed — just open `index.html` in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8000
```

## 📅 Changing festival dates

Each page has its target date set at the bottom of the file:

```html
<script>
  window.FEST_CONFIG = { festival: "Diwali", targetDate: "2026-11-08" };
</script>
```

Diwali and Holi follow the lunar calendar, so their dates shift every year — update `targetDate` accordingly before each occasion.

## 🙏 Credit

Greetings written by **Manuraj Pandey**.

## 📄 License

Free to use and adapt for your own school, class, or festival greetings.
