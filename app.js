async function getSynonyms(word){
    let url = 'https://www.openthesaurus.de/synonyme/search?q=' + word +  '&format=application/json'
    let response = await fetch(url);
    let responseAsJson = await response.json()
    let synSets = responseAsJson ['synsets']
    renderSynsets(synSets)
    
}

function renderSynsets(synSets){
 let container = document.getElementById('output')
 container.innerHTML = ` <div>Es wurden <b>${synSets.length}</b> synsets geladen</div><br>`

 for (let i = 0; i < synSets.length; i++) {
  const synset = synSets[i];
  let terms = synset['terms']

    for (let j = 0; j < terms.length; j++) {
    const term  = terms[j];
      container.innerHTML += `
      
      <div>${term['term']}
      </div>`

    }
 }
}

document.addEventListener("DOMContentLoaded", function() {
    let wordInput = document.getElementById('word-input');
    let searchBtn = document.getElementById('search-btn');
    searchBtn.addEventListener('click', function () {
      getSynonyms(wordInput.value);
      wordInput.value = '';
    });
  });

document.addEventListener('keydown', function (event) {
  let wordInput = document.getElementById('word-input');  
  if (event.key === 'Enter') {
      // Code, der ausgeführt wird, wenn die Enter-Taste gedrückt wird
      getSynonyms(wordInput.value);
      wordInput.value = '';
    }
});
  