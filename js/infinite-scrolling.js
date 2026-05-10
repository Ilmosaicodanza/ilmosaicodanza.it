/*
2023-08-02 18:03:07
da mettere in fondo alle pagine in cui attivare lo scrolling
<div id="infinite-scrolling"></div>
<script src="/js/infinite-scrolling.js">
</script>
*/
  window.axiosLoaded = window.axiosLoaded || false;

  // Funzione per caricare Axios se non è già stato caricato
  async function loadAxios() {
    if (!window.axiosLoaded) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js';
      document.body.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
      window.axiosLoaded = true;
    }
  }

  // Array con gli slug delle pagine da caricare
  const pagineDaCaricare = ["roberta-albani","gaia-ceccoli"];
  let currentPageIndex = 0;

  // Funzione per caricare il contenuto di una pagina attraverso una richiesta AJAX
  async function caricaPagina(url) {
    console.log(url);
    try {
      await loadAxios();
      const response = await fetch(url);
      const html = await response.text();
      console.log("Contenuto della risposta:", html); // Stampa il contenuto della risposta nella console
      //const contentElement = document.getElementById('content'); // Sostituisci 'content' con l'ID del contenuto principale della tua pagina
      const contentElement = document.getElementById('#infinite-scrolling'); // Sostituisci 'content' con l'ID del contenuto principale della tua pagina
      const nuovoContenuto = `<div>${html}</div>`;
      contentElement.innerHTML += nuovoContenuto;
    } catch (error) {
      console.error("Errore nel caricamento del contenuto della pagina.", error);
    }
  }

  // Funzione per rilevare quando l'utente raggiunge il footer
  function onFooterVisible(entries) {
    if (entries[0].isIntersecting && currentPageIndex < pagineDaCaricare.length) {
      // L'utente ha raggiunto il footer e ci sono altre pagine da caricare
      const nextPageSlug = pagineDaCaricare[currentPageIndex];
      const nextPageUrl = `/${nextPageSlug}/index.html`;
      caricaPagina(nextPageUrl);
      currentPageIndex++;
    }
  }

  // Opzioni dell'observer per il rilevamento del footer
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0
  };

  // Crea l'observer per rilevare il footer
  const footerElement = document.querySelector('#infinite-scrolling'); // Sostituisci 'footer' con il selettore corretto del tuo footer
  const observer = new IntersectionObserver(onFooterVisible, options);
  observer.observe(footerElement);
