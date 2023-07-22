import {
  create,
  search,
  insert,
  //insertBatch,
//} from "https://cdn.jsdelivr.net/npm/@lyrasearch/lyra@0.4.12/dist/index.js";
} from "https://unpkg.com/@orama/orama@latest/dist/index.js";
//import { stemmer } from "https://cdn.jsdelivr.net/npm/@lyrasearch/lyra@0.4.12/dist/stemmer/fr.min.js";
const indexResponse = await fetch("index.json");
const index = await indexResponse.json();

const searchEngine = await create({
  schema: {
    title: "string",
    content: "string",
    url: "string",
  },
  defaultLanguage: "italian",
  //components: {
  //  tokenizer: {
  //    stemmingFn: stemmer,
  //  },
  //},
});

// await insert(searchEngine, index);

for (const item of index) {
  await insert(searchEngine, item);
}
//await insertBatch(searchEngine, index);

const searchInput = document.getElementById("search-input");
["change", "cut", "focus", "input", "paste", "search"].forEach((type) =>
  searchInput.addEventListener(type, query)
);

async function query(event) {
  const searchResponse = await search(searchEngine, {
    term: event.target.value,
    properties: "*",
  });
  document.getElementById("search-results").innerHTML = searchResponse.hits
    .map(
      (i) =>
        `<li><a href="${i.document.url}" class="list-group-item list-group-item-action">${i.document.title}</a></li>`
    )
    .join("");
}