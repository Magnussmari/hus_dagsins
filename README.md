# Hús dagsins - Kort af húsum sem Arnór Bliki hefur skrifað um

Þetta forrit birtir kort með húsum sem Arnór Bliki hefur skrifað um. Forritið notar OpenStreetMap og Leaflet til að sýna staðsetningar húsanna.

## Uppsetning

### Skref 1: Hlaða niður og setja upp Node.js

Node.js er nauðsynlegt til að keyra forritið. Til að setja upp Node.js:

1. Fara á [Node.js vefsíðuna](https://nodejs.org/)
2. Hlaða niður LTS útgáfunni (Long Term Support)
3. Fylgja leiðbeiningum til að setja upp Node.js á tölvunni

### Skref 2: Hlaða niður og setja upp forritið

1. Hlaða niður forritinu af GitHub:
   - Fara á GitHub síðuna fyrir forritið
   - Smella á "Code" takkann og velja "Download ZIP"
   - Ráða úr ZIP skránni á tölvunni

2. Opna skipanalínu (Command Prompt eða Terminal) og fara í möppuna þar sem forritið var ráðið úr ZIP skránni.

### Skref 3: Setja upp notendaforritið

1. Fara í `open_map` möppuna með því að slá inn eftirfarandi skipun í skipanalínu:
   ```bash
   cd open_map

2. Setja upp nauðsynlegar einingar með því að slá inn eftirfarandi skipun
   ```bash
   npm install
   
#### Skref 4: Keyra notendaforritið

1. Keyra forritið með því að slá inn eftirfarandi skipun í skipanalínu:
    ```bash
   npm start

2. Opna vafra (t.d. Chrome, Firefox) og fara á slóðina:
   ```bash
   http://localhost:3002
   
Nú ætti kortið með húsunum að birtast í vafranum.

## Setja upp stjórnandaforrit

### Skref 1: Vinna í gagnagrunni
1. Fara í admin_app möppuna með því að slá inn eftirfarandi skipun í skipanalínu:
   ```bash
   cd admin_app

2. Setja upp nauðsynlegar einingar með því að slá inn eftirfarandi skipun:
   ```bash
   npm install

Skref 2: Keyra gagnagrunn

3. Keyra forritið með því að slá inn eftirfarandi skipun í skipanalínu:
   ```bash
   npm start

4. Opna vafra (t.d. Chrome, Firefox) og fara á slóðina:
   ```bash
   http://localhost:3001

Nú ætti kortið með stjórnendaaðgerðum að birtast í vafranum.


## Afrita gagnagrunninn

Mælt með fyrir alla vinnslu með gagnagrunninn!

keyrðu skránna afrita_gagnagrunn.bat í möppunni.

Forritið mun afrita houses.db gagnagrunninn í backup möppuna með dagsetningu. Það mun einnig prenta staðfestingu um að afritið hafi verið vistað.


Ef eitthvað fer úrskeiðis, getur þú prófað eftirfarandi:

Athugaðu að Node.js sé rétt uppsett með því að slá inn node -v í skipanalínu og sjá útgáfunúmerið.
Gakktu úr skugga um að vera í réttri möppu (open_map eða admin_app) þegar þú slærð inn skipanirnar.
Lestu villuboðin í skipanalínu fyrir frekari upplýsingar um hvað gæti hafa farið úrskeiðis.
Athugaðu að Python sé rétt uppsett með því að slá inn python --version í skipanalínu og sjá útgáfunúmerið.
