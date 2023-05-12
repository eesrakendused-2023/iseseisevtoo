// võtan localstorage-st "watchlist" seriaalid
function getSeries(){
    const notseen = localStorage.getItem('Not seen');
    return notseen ? JSON.parse(notseen) : [];
}
// näitan valitud seriaale lehel
function displaySeries() {
    const notseen = getSeries();
  // fetchin vaadatud seriaalide nime ja postrit
    notseen.forEach(imdbId => {
      fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=fb40ced1`)
        .then(response => response.json())
        .then(data => {
          const tvShow = `
            <li>
              <img src="${data.Poster}" alt="${data.Title} poster">
              <h2>${data.Title}</h2>
              <div>
              <button class="btn" id="remove-${imdbId}">Add to "Watched"</button>
              </div>
            </li>
          `;
          document.querySelector('.notseen').insertAdjacentHTML('beforeend', tvShow);
          // seriaali eemaldamise nupp
          const removeBtn = document.getElementById(`remove-${imdbId}`);
            removeBtn.setAttribute("data-imdb-id", imdbId);
            removeBtn.addEventListener("click", () => { addToSeen(imdbId); });
        })
        .catch(error => console.error(error));
    });
  }
  
  displaySeries();
  // seriaali lisamine "vaadatud" seriaalide listi ja watchlistist eemaldamine
  function addToSeen(imdbId){
    const notseen = getSeries();
    const updatedNotSeen = notseen.filter(id => id !== imdbId);
    localStorage.setItem('Not seen', JSON.stringify(updatedNotSeen));
    
    const notSeenList = document.querySelector('.notseen');
    const itemToRemove = notSeenList.querySelector(`[data-imdb-id="${imdbId}"]`);
    itemToRemove.remove();
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
