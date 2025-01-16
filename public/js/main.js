// Fonction pour récupérer et afficher les derniers articles
async function fetchLatestNews() {
    try {
        const response = await fetch('http://localhost:3000/news');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("La réponse n'est pas au format JSON !");
        }

        const data = await response.json();
        console.log('Données reçues :', data);
        displayNews(data); // Appelle votre fonction pour afficher les articles
    } catch (error) {
        console.error('Erreur:', error.message);
        showError('Impossible de charger les articles');
    }
}



function displayNews(news) {
    const newsContainer = document.getElementById('news-container'); 
    newsContainer.innerHTML = ''; 

    if (!news || news.length === 0) {
        newsContainer.innerHTML = '<p>Aucun article disponible.</p>';
        return;
    }

    news.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article'); 

        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.image}" alt="${article.title}" />
            <p>${article.summary}</p>
            <p><strong>Date :</strong> ${article.date}</p>
            <a href="${article.url}" target="_blank">Lire l'article</a>
        `;

        newsContainer.appendChild(articleElement);
    });
}


// TODO: Question 2 - Créer une fonction pour gérer les erreurs
function showError(message) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = `
        <div class="alert alert-danger" role="alert">
            ${message}
        </div>
    `;
}



// Initialisation
document.addEventListener('DOMContentLoaded', fetchLatestNews);


