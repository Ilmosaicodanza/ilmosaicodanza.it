import {create,search,insertMultiple} from "https://cdn.jsdelivr.net/npm/@orama/orama@latest/dist/index.js";
let showSpinner;
let hideSpinner;
const heading = document.getElementsByClassName('lh-copy')[0];
if (heading) {heading.scrollIntoView();}
const performSearch = async (searchEngine, searchTerm) => {
  const searchResponse = await search(searchEngine, {
    term: searchTerm,
    properties: "*",
  });
  document.getElementById("search-results").innerHTML = searchResponse.hits
    .map(
      (i) =>
        `<li><a href="${i.document.url}" class="list-group-item list-group-item-action">${i.document.title}</a></li>`
    )
    .join("");
    hideSpinner();
};
const init = async () => {
  showSpinner = () => {
    const overlay = document.getElementById("loading-overlay");
    overlay.style.display = "block";
  };
  hideSpinner = () => {
    const overlay = document.getElementById("loading-overlay");
    const kitt = document.getElementById("kittLoader");
    const inp = document.getElementById("search-input");
    const cf = document.getElementsByClassName("cf")[0];
    overlay.style.display = kitt.style.display = "none";
    inp.placeholder = "Scrivi qui per cercare";
    cf.style.display = "block"
  };
  showSpinner();
  const searchEngine = await create({
    schema: {
      title: "string",
      content: "string",
      url: "string",
      //description: "string",
    },
    defaultLanguage: "italian",
  });
  const indexResponse = await fetch("/index.json");
  const index = await indexResponse.json();
  await insertMultiple(searchEngine, index);
  hideSpinner();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const searchTerm = urlSearchParams.get("q");
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", async (event) => {
    const searchTerm = event.target.value;
    await performSearch(searchEngine, searchTerm);
  });
  if (searchTerm) {
    showSpinner();
    searchInput.value = decodeURIComponent(searchTerm);
    await performSearch(searchEngine, searchTerm);
  }
};
init();
