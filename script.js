const GITHUB_USERNAME = 'teo1809'; 

let toateProiectele = [];      
let proiecteFiltrate = [];    
let proiecteAfisate = 0;      
const limita_proiecte = 6;    

async function fetchGitHubRepos() {
    const container = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const spinner = document.querySelector('.loading-spinner-container');
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        
        if (!response.ok) {
            throw new Error('Nu am putut încărca proiectele momentan.');
        }

        const repos = await response.json();

        toateProiectele = repos
            .filter(repo => repo.fork === false)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        proiecteFiltrate = [...toateProiectele]; 
        searchInput.disabled = false;

        proiecteAfisate = 0;
        container.innerHTML = ''; 
        if (spinner) {
            spinner.style.display = 'none';
        }
        afiseazaUrmatoareleProiecte();

    } catch (error) {
        console.error(error);
        if (spinner) {
            spinner.style.display = 'none';
        }
        container.innerHTML = `
            <div class="error-message">
                <p>Nu am putut încărca proiectele momentan.</p>
            </div>
        `;
    }
}

function afiseazaUrmatoareleProiecte() {
    const container = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    const urmatorulLimita = proiecteAfisate + limita_proiecte;
    const transaCurenta = proiecteFiltrate.slice(proiecteAfisate, urmatorulLimita);

    if (proiecteFiltrate.length === 0 && proiecteAfisate === 0) {
        container.innerHTML = '<p class="no-results">Nu s-a găsit niciun proiect care să corespundă căutării.</p>';
        loadMoreBtn.style.display = 'none';
        return;
    }

    transaCurenta.forEach(repo => {
        const description = repo.description ? repo.description : 'Fără descriere disponibilă.';
        const language = repo.language ? repo.language : 'Nespecificat';

        const cardHTML = `
            <div class="repo-card">
                <h3 class="repo-title">${repo.name}</h3>
                <p class="repo-description">${description}</p>
                <div class="repo-details">
                    <span class="repo-language">Language: ${language}</span>
                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                </div>
                <a href="${repo.html_url}" target="_blank" class="repo-btn">Vezi Codul Sursă →</a>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
    proiecteAfisate = Math.min(urmatorulLimita, proiecteFiltrate.length);

    if (proiecteAfisate < proiecteFiltrate.length) {
        loadMoreBtn.style.display = 'block';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

document.getElementById('load-more-btn').addEventListener('click', afiseazaUrmatoareleProiecte);

document.getElementById('search-input').addEventListener('input', function(e) {
    const textCautat = e.target.value.toLowerCase();

    proiecteFiltrate = toateProiectele.filter(repo => {
        const numeSePotriveste = repo.name.toLowerCase().includes(textCautat);
        const limbajSePotriveste = repo.language && repo.language.toLowerCase().includes(textCautat);
        return numeSePotriveste || limbajSePotriveste;
    });
    proiecteAfisate = 0;
    document.getElementById('projects-container').innerHTML = '';
    afiseazaUrmatoareleProiecte();
});

fetchGitHubRepos();