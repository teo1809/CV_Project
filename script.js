const GITHUB_USERNAME = 'teo1809'; 

let toateProiectele = [];      
let proiecteFiltrate = [];    
let proiecteAfisate = 0;      
const limita_proiecte = 6;    


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

async function fetchGitHubRepos() {
    const container = document.getElementById('projects-container');
    const searchInput = document.getElementById('search-input');
    const spinner = document.querySelector('.loading-spinner-container');

    if (!container) return;

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
        
        if (searchInput) {
            searchInput.disabled = false;
        }

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
    
    if (!container) return;

    const urmatorulLimita = proiecteAfisate + limita_proiecte;
    const transaCurenta = proiecteFiltrate.slice(proiecteAfisate, urmatorulLimita);

    if (proiecteFiltrate.length === 0 && proiecteAfisate === 0) {
        container.innerHTML = '<p class="no-results">Nu s-a găsit niciun proiect care să corespundă căutării.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }

    transaCurenta.forEach(repo => {
        const description = repo.description ? repo.description : 'Fără descriere disponibilă.';
        const language = repo.language ? repo.language : 'Nespecificat';

        const cardHTML = `
            <div class="repo-card">
                <div>
                    <h3 class="repo-title">${repo.name}</h3>
                    <p class="repo-description">${description}</p>
                </div>
                <div class="repo-details">
                    <span class="repo-language">Limbaj: ${language}</span>
                    <div class="repo-stats">
                        <span>⭐ ${repo.stargazers_count}</span>
                        <span>🍴 ${repo.forks_count}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-btn" style="margin-top: 10px; display: inline-block;">Vezi Codul Sursă →</a>
                </div>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
    
    proiecteAfisate = Math.min(urmatorulLimita, proiecteFiltrate.length);

    if (loadMoreBtn) {
        if (proiecteAfisate < proiecteFiltrate.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

//incarca m multe
const loadMoreBtn = document.getElementById('load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', afiseazaUrmatoareleProiecte);
}

//pt cautare ev
const searchInput = document.getElementById('search-input');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const textCautat = e.target.value.toLowerCase();

        proiecteFiltrate = toateProiectele.filter(repo => {
            const numeSePotriveste = repo.name.toLowerCase().includes(textCautat);
            const limbajSePotriveste = repo.language && repo.language.toLowerCase().includes(textCautat);
            return numeSePotriveste || limbajSePotriveste;
        });
        proiecteAfisate = 0;
        const container = document.getElementById('projects-container');
        if (container) container.innerHTML = '';
        afiseazaUrmatoareleProiecte();
    });
}

if (document.getElementById('projects-container')) {
    fetchGitHubRepos();
}


const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const statusDiv = document.getElementById('form-status');
        
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        if (statusDiv) {
            statusDiv.textContent = '';
            statusDiv.className = 'form-status';
        }

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const subject = subjectInput ? subjectInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        if (name === '') {
            const err = document.getElementById('name-error');
            if (err) err.textContent = 'Numele este obligatoriu.';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            const err = document.getElementById('email-error');
            if (err) err.textContent = 'Introduceți o adresă de email validă.';
            isValid = false;
        }

        if (subject === '') {
            const err = document.getElementById('subject-error');
            if (err) err.textContent = 'Subiectul este obligatoriu.';
            isValid = false;
        }

        if (message.length < 10) {
            const err = document.getElementById('message-error');
            if (err) err.textContent = 'Mesajul trebuie să aibă cel puțin 10 caractere.';
            isValid = false;
        }

        if (message.length > 10000) {
        const err = document.getElementById('message-error');
        if (err) err.textContent = 'Mesajul trebuie să aibă cel mult 10000 caractere.';
        isValid = false;
        }

        if (isValid && statusDiv) {
            statusDiv.textContent = 'Mesajul a fost trimis cu succes!';
            statusDiv.classList.add('success');
            contactForm.reset();
        }
    });
}