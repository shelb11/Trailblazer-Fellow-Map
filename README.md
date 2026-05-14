# 🔥 Trailblazer Fellowship — Teacher Map

An interactive US heat-map web app showing the geographic distribution of Trailblazer Fellowship teachers. Built with React, react-simple-maps, and Tailwind CSS.

---

## Features

- **Interactive SVG heat map** — all 50 US states, color-coded by teacher density
- **Hover tooltips** — state name, teacher count, and a 3-name preview
- **Click-to-expand side panel** — full teacher details for any selected state
- **Color gradient legend** — blue → sky → amber → orange scale
- **Top-line stats** — total teachers, states represented, and unique schools
- **Admin Edit Mode** — password-protected CRUD (add / edit / delete teachers)
- **Persistent storage** — changes saved to `localStorage`; falls back to bundled JSON
- **Responsive** — works on desktop and tablet; Escape key closes the side panel

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 18 + Vite |
| Map | react-simple-maps + us-atlas (TopoJSON) + topojson-client |
| Styles | Tailwind CSS v3 |
| Data | `/src/data/teachers.json` + `localStorage` |

---

## Quick Start

### Prerequisites

- **Node.js ≥ 18** — download from [nodejs.org](https://nodejs.org)
  (or install via [nvm](https://github.com/nvm-sh/nvm): `nvm install --lts`)

### Install & run

```bash
# 1 — clone / enter the project
cd trailblazer-fellowship

# 2 — install dependencies
npm install

# 3 — start the dev server (hot-reload on http://localhost:5173)
npm run dev
```

Open **http://localhost:5173** in your browser.

### Other scripts

| Script | Description |
|---|---|
| `npm run dev` | Development server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Serve the production build on :4173 |

---

## Project Structure

```
trailblazer-fellowship/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .claude/
│   └── launch.json          # Claude Code dev-server configs
└── src/
    ├── main.jsx
    ├── index.css             # Tailwind + custom component styles
    ├── App.jsx               # Root: layout, admin login modal, data state
    ├── data/
    │   └── teachers.json     # 40 sample teachers across 20 states
    ├── utils/
    │   ├── colorUtils.js     # Heat-map color interpolation
    │   └── stateUtils.js     # State name ↔ abbreviation maps
    └── components/
        ├── USMap.jsx         # ComposableMap + Geography handlers
        ├── Tooltip.jsx       # Cursor-following hover tooltip
        ├── SidePanel.jsx     # Click-to-open teacher detail panel
        ├── TeacherCard.jsx   # Individual teacher card (+ admin controls)
        ├── TeacherForm.jsx   # Add / edit form (validated)
        ├── StatsBar.jsx      # Total teachers / states / schools
        └── Legend.jsx        # Color-scale gradient bar
```

---

## Data Format

Teachers are stored in `src/data/teachers.json`:

```json
[
  {
    "id": 1,
    "name": "Maria Gonzalez",
    "school": "Lincoln High School",
    "city": "Houston",
    "state": "TX",
    "subject": "Biology",
    "grade": "10th Grade"
  }
]
```

The file ships with **40 realistic sample teachers across 20 states**.
Runtime edits are persisted to `localStorage` (key: `trailblazer_teachers_v1`).

---

## Admin Mode

1. Click **Admin Login** in the top-right header
2. Enter the password: **`trailblazer2024`**
3. Click any state → the side panel reveals **Edit** and **Delete** buttons on each teacher card, plus an **+ Add** button to add a new teacher to that state
4. Click **Exit Admin** to return to read-only view

---

## Color Scale

States are colored on a 4-stop gradient normalized to the state with the most teachers:

| Range | Color |
|---|---|
| 0 teachers | Dark navy (muted) |
| Low count | Blue `#1d4ed8` |
| Mid-low | Sky `#38bdf8` |
| Mid-high | Amber `#fbbf24` |
| High count | Deep orange `#c2410c` |

---

## License

MIT
