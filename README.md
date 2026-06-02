# Portofoliu Web Dinamic - Integrare GitHub API

Proiectul constă într-o pagină web personală de tip CV/Portofoliu. Aceasta se integrează dinamic cu API-ul oficial GitHub pentru a prelua și afișa repository-urile personale într-un mod organizat și estetic.

## Tehnologii Utilizate

* **HTML5:** Structura semantică a paginii web.
* **CSS3:** Stilul personalizat și layout responsiv.
* **JavaScript:** Manipularea asincronă a DOM-ului și preluarea datelor.
* **GitHub API:** Endpoint-ul public utilizat pentru interogarea proiectelor.

## Funcționalități Implementate

* **Profil și Date Academice:** Afișare nume, fotografie, descriere, medii de studiu (Anul I și Semestrul I din Anul II), secțiuni dedicate pentru Educație, Experiență (Atestat baze de date SQL) și Activități Extracurriculare (IEEE, Clubul de Electronică).
* **Preluare Dinamică Date (GitHub API):** Conectare asincronă la endpoint-ul GitHub pentru extragerea repository-urilor utilizatorului `teo1809`.
* **Indicator de Încărcare (Spinner):** Element grafic animat care rulează pe ecran în timpul preluării datelor și se ascunde automat după încărcarea acestora.
* **Gestionare Erori (Error Handling):** Prinderea erorilor de rețea sau de limitare API și afișarea unui mesaj de alertă în UI (*"Nu am putut încărca proiectele momentan."*).
* **Filtrare și Sortare Automată:** * Ascunderea proiectelor care sunt doar copii/preluate de la alții (`fork === false`).
    * Ordonarea automată a listei începând cu cel mai recent modificat proiect (`updated_at`).
* **Căutare în Timp Real:** Casetă de text (*Search Input*) care filtrează instant proiectele pe ecran după nume sau după limbajul de programare, pe măsură ce utilizatorul tastați.
* **Buton „Load More”:** Afișarea inițială a maximum 6 proiecte sub formă de carduri și încărcarea următoarelor tranșe de câte 6 la fiecare click pe buton.

## Cum se rulează local

Proiectul nu necesită server local sau instalarea unor dependențe complicate (Node.js/npm), fiind compus exclusiv din fișiere statice.

1. Clonează repository-ul sau descarcă arhiva ZIP:
   ```bash
   git clone https://github.com/teo1809/CV_Project.git

2. Aplicația este configurată și publicată live prin intermediul GitHub Pages.
Puteți accesa portofoliul funcțional aici: [https://teo1809.github.io/CV_Project/](https://teo1809.github.io/CV_Project/)