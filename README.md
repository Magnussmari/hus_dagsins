# Húsakortasjá

Þetta verkefni inniheldur þrjú forrit: Húsakortasjá, Stjórnendaforrit og Birtingarforrit. Öll forritin nota OpenStreetMap og Leaflet til að birta staðsetningar húsa á korti.

## Skráarskipulag

house_app/
├── admin_app/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   ├── scripts.js
│   │   └── styles.css
│   ├── routes/
│   │   └── houseRoutes.js
│   ├── app.js
│   ├── db.js
│   └── package.json
├── open_map/
│   ├── node_modules/
│   ├── public/
│   │   ├── index.html
│   │   ├── scripts.js
│   │   └── styles.css
│   ├── routes/
│   │   └── houseRoutes.js
│   ├── app.js
│   ├── db.js
│   └── package.json
├── public/
│   ├── index.html
│   ├── scripts.js
│   └── styles.css
├── routes/
│   └── houseRoutes.js
├── app.js
├── db.js
├── houses.db
├── package.json
└── corrected_houses.csv



## Forsendur

- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 

## Klónaðu geymsluna

1. **Klónaðu geymsluna:**
   ```bash
   git clone https://github.com/yourusername/house-mapping-project.git
   cd house-mapping-project
