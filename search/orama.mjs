import {
  create,
  search,
  insert,
} from "https://unpkg.com/@orama/orama@latest/dist/index.js";

//let isInitialSearch = true; // Variabile per tenere traccia se la ricerca iniziale è stata eseguita

const performSearch = async (searchEngine, searchTerm) => {
  const searchResponse = await search(searchEngine, {
    term: searchTerm,
    properties: "*",
  });
  //isInitialSearch = false; // Imposta la variabile a true per evitare ulteriori ricerche iniziali
  document.getElementById("search-results").innerHTML = searchResponse.hits
    .map(
      (i) =>
        `<li><a href="${i.document.url}" class="list-group-item list-group-item-action">${i.document.title}</a></li>`
    )
    .join("");
};

const init = async () => {
  const searchEngine = await create({
    schema: {
      title: "string",
      content: "string",
      url: "string",
    },
    defaultLanguage: "italian",
  });

  const indexResponse = await fetch("index.json");
  const index = await indexResponse.json();

  for (const item of index) {
    await insert(searchEngine, item);
  }

  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchTerm = urlSearchParams.get("q");

  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", async (event) => {
    const searchTerm = event.target.value;
    await performSearch(searchEngine, searchTerm);
  });

  if (searchTerm) {
    // Se c'è una query string nell'URL e la ricerca iniziale non è ancora stata eseguita
    searchInput.value = decodeURIComponent(searchTerm); // Imposta il valore del campo search-input con il termine cercato
    await performSearch(searchEngine, searchTerm);

  }
};

init();
