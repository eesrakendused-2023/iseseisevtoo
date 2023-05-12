
fetch('https://imdb8.p.rapidapi.com/title/get-top-rated-tv-shows', {
    "method": "GET",
    "headers": {
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
        'X-RapidAPI-Key': '68b80c6c7cmsh84f8e83dd96f9f8p1fbe99jsn43df56f902d2'
    }
})
.then(response => response.json())
.then(data => {
    console.log(data)
    data.forEach(item => {
        const imdbId = item.id.replace('/title/', '').replace('/', '');
        // imdbId-ga fetchin seriaali nime ja postri
        fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=fb40ced1`)
        .then(response => response.json())
        .then(data => {
            const tvShow = `
                <li>
                    <img src="${data.Poster}" alt="${data.Title} poster">
                    <h2>${data.Title}</h2>
                    <div>
                    <button class="btn" id="seen-btn-${imdbId}">Watched</button>
                    <button class="btn" id="not-seen-btn-${imdbId}">Add to watchlist</button>
                    </div>
                </li>
            `;            
            document.querySelector('.toprated').insertAdjacentHTML('beforeend', tvShow);
            // nupud seriaalide sorteerimiseks
            const seenBtn = document.getElementById(`seen-btn-${imdbId}`);
            const notSeenBtn = document.getElementById(`not-seen-btn-${imdbId}`);
            seenBtn.addEventListener("click", () => { addSeen(imdbId); });
            notSeenBtn.addEventListener("click", () => { addNotSeen(imdbId); });
        })
        .catch(error => console.error(error));
    });
})
.catch(error => console.error(error));
// lisa seriaal vaadatud seriaalide hulka
function addSeen(imdbId){
    let entry = localStorage.getItem('Seen');
    if (!entry) {
        entry = [];
    } else {
        entry = JSON.parse(entry);
    }
    if (entry.indexOf(imdbId) === -1) {
        entry.push(imdbId);
        localStorage.setItem('Seen', JSON.stringify(entry));
    }
}
// lisa seriaal watchlisti
function addNotSeen(imdbId){
    let entry = localStorage.getItem('Not seen');
    if (!entry) {
        entry = [];
    } else {
        entry = JSON.parse(entry);
    }
    if (entry.indexOf(imdbId) === -1) {
        entry.push(imdbId);
        localStorage.setItem('Not seen', JSON.stringify(entry));
    }
}

