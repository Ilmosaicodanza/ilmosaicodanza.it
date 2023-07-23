// Utilizzo di require per ottenere i moduli necessari
const { create, search, insert } = window.Orama;
const fetch = require("node-fetch");

const performSearch = (searchEngine, searchTerm) => {
  return search(searchEngine, {
    term: searchTerm,
    properties: "*",
  }).then((searchResponse) => {
    // Nota: document.getElementById non è disponibile in Node.js, quindi considera di gestire l'output in un modo diverso
    // In un ambiente server-side, puoi utilizzare un motore di rendering come Handlebars o EJS per generare l'output HTML
    // In un ambiente client-side (browser), questo codice funzionerà correttamente
    const results = searchResponse.hits
      .map(
        (i) =>
          `<li><a href="${i.document.uri}" class="list-group-item list-group-item-action">${i.document.title}</a></li>`
      )
      .join("");
    console.log(results); // Stampa i risultati della ricerca
  });
};

const init = () => {
  return create({
    schema: {
      title: "string",
      content: "string",
      url: "string",
    },
    defaultLanguage: "italian",
  })
    .then((searchEngine) => {
      return fetch("/index.json")
        .then((indexResponse) => indexResponse.json())
        .then((index) => {
          return Promise.all(index.map((item) => insert(searchEngine, item)));
        })
        .then(() => {
          // Nota: document.getElementById non è disponibile in Node.js, quindi considera di gestire l'output in un modo diverso
          // In un ambiente server-side, puoi utilizzare un motore di rendering come Handlebars o EJS per generare l'output HTML
          // In un ambiente client-side (browser), questo codice funzionerà correttamente
          const urlSearchParams = new URLSearchParams(""); // Modifica le query parameters in base alle tue esigenze
          const searchTerm = urlSearchParams.get("q");

          // ... continua con il resto del codice come da esempio ...
          const searchInput = document.getElementById("search-input");
          searchInput.addEventListener("input", (event) => {
            const searchTerm = event.target.value;
            performSearch(searchEngine, searchTerm);
          });

          if (searchTerm) {
            // Se c'è una query string nell'URL e la ricerca iniziale non è ancora stata eseguita
            searchInput.value = decodeURIComponent(searchTerm); // Imposta il valore del campo search-input con il termine cercato
            performSearch(searchEngine, searchTerm);
          }
        });
    });
};

init().catch(console.error);
