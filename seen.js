// võtan localstorage-st "vaadatud" seriaalid
function getSeries(){
    const seen = localStorage.getItem('Seen');
    return seen ? JSON.parse(seen) : [];
}
// näitan valitud seriaale lehel
function displaySeries() {
    const seen = getSeries();
    const ranked = [];
  
    // võtan localstorage-st seriaalide hinnangud
    const savedRankings = localStorage.getItem('Rankings');
    const rankings = savedRankings ? JSON.parse(savedRankings) : [];
  
    // lisan hinnangute listi
    seen.forEach(imdbId => {
      const rank = rankings[imdbId] || null;
      if (rank !== null) {
        ranked.push({ imdbId, rank });
      }
    });
  
    // sorteerin seriaalid hinnangute järgi
    ranked.sort((a, b) => b.rank - a.rank);
    // fetchin vaadatud seriaalide nime ja postrit
    seen.forEach(imdbId => {
      fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=fb40ced1`)
        .then(response => response.json())
        .then(data => {
          const tvShow = `
            <li>
              <img src="${data.Poster}" alt="${data.Title} poster">
              <h2>${data.Title}</h2>
              <div>
                <select class="ranking" id="rank-${imdbId}">
                  <option value="">Rank</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <span class="rank-display" id="rank-${imdbId}-display"></span>
                <button class="btn" id="remove-${imdbId}">Remove</button>
              </div>
            </li>
          `;
          document.querySelector('.seen').insertAdjacentHTML('beforeend', tvShow);
          const removeBtn = document.getElementById(`remove-${imdbId}`);
          const rankingSelect = document.getElementById(`rank-${imdbId}`);
          // seriaali eemaldamise nupp
          removeBtn.setAttribute("data-imdb-id", imdbId);
          removeBtn.addEventListener("click", () => { removeFromSeen(imdbId); });
  
          rankingSelect.addEventListener("change", () => {
            const selectedRank = rankingSelect.value;
            saveRank(imdbId, selectedRank);
            updateRankDisplay(imdbId, selectedRank);
          });
  
          const storedRank = rankings[imdbId] || null;
          if (storedRank !== null) {
            updateRankDisplay(imdbId, storedRank);
            rankingSelect.value = storedRank;
          }
        })
        .catch(error => console.error(error));
    });
  
    ranked.forEach(({ imdbId }) => {
      const listItem = document.querySelector(`#rank-${imdbId}`);
      document.querySelector('.seen').prepend(listItem);
    });
  }
  
displaySeries();
// eemaldan seriaali vaadatud seriaalide listist
function removeFromSeen(imdbId){
    const seen = getSeries();
    const updatedSeen = seen.filter(id => id !== imdbId);
    localStorage.setItem('Seen', JSON.stringify(updatedSeen));
    
    const seenList = document.querySelector('.seen');
    const itemToRemove = seenList.querySelector(`[data-imdb-id="${imdbId}"]`);
    itemToRemove.remove();
}
// salvestan antud hinnangu
function saveRank(imdbId, rank) {
    const rankings = localStorage.getItem('Rankings') ? JSON.parse(localStorage.getItem('Rankings')) : [];
    const updatedRankings = [...rankings, { imdbId, rank }]; // add a new object to the array
    localStorage.setItem('Rankings', JSON.stringify(updatedRankings));
}
// võtan hinnangu 
function getRank(imdbId) {
    const ranked = localStorage.getItem('Rankings');
    return ranked ? JSON.parse(ranked)[imdbId] : null; 
}
// uuendan hinnangut lehel
function updateRankDisplay(imdbId, selectedRank) {
    const rankDisplay = document.getElementById(`rank-${imdbId}-display`);
    rankDisplay.textContent = "Rank: " + selectedRank;
    const rankingSelect = document.getElementById(`rank-${imdbId}`);
    rankingSelect.remove(); 
}
