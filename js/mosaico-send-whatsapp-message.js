/*
* @Author: Fabrizio Conti <panathos@gmail.com>
* @Date:   2023-07-17 18:03:35
* @Last Modified by:   Fabrizio Conti <panathos@gmail.com>
* @Last Modified time: 2026-10-03
*/

(function () {
  'use strict';

  const aperto = {
    'LU': { 'Sabina': '11:00-16:30', 'Segreteria': '16:30-22:30' },
    'MA': { 'Sabina': '11:00-16:30', 'Segreteria': '18:30-22:30' },
    'ME': { 'Sabina': '10:00-11:30', 'Segreteria': '17:30-22:30' },
    'GI': { 'Sabina': '11:00-16:30', 'Segreteria': '16:30-22:30' },
    'VE': { 'Sabina': '17:00-20:00', 'Segreteria': null },
    'SA': { 'Sabina': '11:00-16:15', 'Segreteria': null },
    'DO': { 'Sabina': null, 'Segreteria': null }
  };

  const chiuso = [
    '01/01', '02/01', '03/01', '04/01', '05/01', '06/01',
    '25/04', '01/05', '02/06', '15/08', '01/11', '07/12',
    '08/12', '23/12', '24/12', '25/12', '26/12', '27/12',
    '28/12', '29/12', '30/12', '31/12'
  ];

  const entity = {
    'Sabina': { 'num': '+393396173388' },
    'Segreteria': { 'num': '+393519459036' }
  };

  let recipient = {
    'name': 'Segreteria',
    'num': entity['Sabina'].num,
    'greet': '',
    'msg': '',
    'currentHours': '',
    'nextHours': ''
  };

  let now = new Date();

  let request, sender, avviso, error;

  function initDOM() {
    request = document.querySelector('textarea[name="request"]');
    sender = document.querySelector('input[name="name"]');
    avviso = document.querySelector(".avviso");
    error = document.querySelector(".error-message");

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        composeWhatsAppMessage();
      });
    }
  }

  function getGreeting() {
    recipient.greet = "Ciao. ";
    return recipient.greet;
  }

  function composeWhatsAppMessage() {
    const nomeVuoto = !sender || sender.value.trim() === '';
    const richiestaVuota = !request || request.value.trim() === '';

    if (nomeVuoto && richiestaVuota) {
      showError('Inserisci sia il tuo nome che la richiesta');
      if (sender) sender.focus();
      return false;
    } else if (nomeVuoto) {
      showError('Inserisci il tuo nome per inviare il messaggio');
      if (sender) sender.focus();
      return false;
    } else if (richiestaVuota) {
      showError('Scrivi la tua richiesta prima di inviare');
      if (request) request.focus();
      return false;
    }

    hideError();

    let isFlamenco = false;
    recipient.greet = getGreeting();

    const value = request.value.toLowerCase();
    const words = ['flamenco', 'baile', 'compas', 'dance workout'];
    if (words.some(word => value.includes(word))) {
      isFlamenco = true;
      recipient.name = 'Sabina';
      recipient.num = entity['Sabina'].num;
    }

    if (getIsEntityOpen('Sabina') || (isFlamenco && getIsEntityOpen('Segreteria'))) {
      recipient.num = entity['Sabina'].num;
    } else if (getIsEntityOpen('Segreteria')) {
      recipient.num = entity['Segreteria'].num;
    } else {
      let next1 = getNextOpening(now, 'Segreteria');
      let next2 = getNextOpening(now, 'Sabina');
      if (next2 && next1 && next2.getTime() < next1.getTime()) {
        recipient.num = entity['Sabina'].num;
      } else {
        recipient.num = entity['Segreteria'].num;
      }

      let nextOpening = getNextOpening(now, "Segreteria");
      if (nextOpening) {
        recipient.nextHours = nextOpening;
      }
    }

    composeMessage();
    return true;
  }

  function getSlug() {
    const segments = window.location.pathname.split('/').filter(segment => segment !== '');
    return segments.length === 0 ? "Home" : segments[segments.length - 1];
  }

  function composeMessage() {
    try {
      let incipit = '';
      if (recipient.nextHours) {
        let day = getDayDescription(recipient.nextHours);
        let hours = formatDate(recipient.nextHours, "HH:mm");
        incipit = `[Segreteria disponibile ${day} dalle ${hours}] `;
      }
      const slug = `Pagina: ${getSlug()} `;
      const senderName = sender && sender.value ? sender.value.trim().toUpperCase() : '';
      const requestText = request && request.value ? request.value.trim() : '';

      let msg = slug + incipit + "[DA " + senderName + "] " + requestText;
      const whatsappLink = `https://wa.me/${recipient.num}?text=${encodeURIComponent(msg)}`;

      window.open(whatsappLink, '_blank', 'noopener,noreferrer');

      if (typeof window.hideWhatsappMessage === 'function') {
        setTimeout(() => {
          window.hideWhatsappMessage();
          if (request) request.value = '';
        }, 200);
      }
    } catch (err) {
      console.error("Errore nell'invio WhatsApp:", err);
    }

    return true;
  }

  function setAvviso() {
    let open = getIsEntityOpen('Segreteria');
    let greet = getGreeting();
    if (open) {
      const [dalle, alle] = open.split('-');
      let lnk = "<a href='/regolamento-di-iscrizione/' class='link'>Prenota le tue lezioni di prova e scarica i moduli di iscrizione</a>";
      let msg = greet + "La segreteria è disponibile oggi fino alle #ALLE1#. Poi #NEXT# dalle #ALLE2#.<br>" + lnk;
      let nextDay = new Date(now);
      nextDay.setDate(nextDay.getDate() + 1);
      let nextOpen = getNextOpening(nextDay, 'Segreteria');
      let nextDayName = getDayDescription(nextOpen);
      let alle2 = formatDate(nextOpen, 'HH:mm');
      msg = msg.replace("#ALLE1#", alle).replace("#NEXT#", nextDayName).replace("#ALLE2#", alle2);
      if (avviso) avviso.innerHTML = msg;
    } else {
      let next = getNextOpening(now, 'Segreteria');
      recipient.nextHours = next;
      let giorno = getDayDescription(next);
      let msg = greet + "La segreteria sarà disponibile " + giorno + " dalle " + formatDate(next, 'HH:mm') + ".<br>🤓 Però a volte lavoriamo anche quando siamo chiusi. Mandaci un messaggio e ti risponderemo appena possibile!";
      if (avviso) avviso.innerHTML = msg;
    }
  }

  function getDayDescription(next) {
    if (!next) return "";
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (now.getMonth() === next.getMonth() && now.getDate() === next.getDate()) {
      return "oggi";
    } else if (tomorrow.getMonth() === next.getMonth() && tomorrow.getDate() === next.getDate()) {
      return "domani";
    } else {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffInDays = Math.floor((next - now) / oneDay);
      if (diffInDays > 3) {
        if (next.getMonth() === now.getMonth()) {
          return getDayOfWeek(next);
        } else {
          return `${getDayOfWeek(next)} ${next.getDate()} ${getMonthName(next.getMonth())}`;
        }
      }
      return getDayOfWeek(next);
    }
  }

  function getIsEntityOpen(entityName) {
    let date = new Date(now);
    const dayOfWeek = date.getDay();
    const openingHours = aperto[getDayAbbreviation(dayOfWeek)][entityName];
    const chiusoGiorno = isDayClosed(date);

    if (!openingHours || chiusoGiorno) return null;

    const [opening, closing] = openingHours.split('-');
    const currentTime = date.getHours().toString().padStart(2, '0') + ":" + date.getMinutes().toString().padStart(2, '0');

    return (currentTime >= opening && currentTime <= closing) ? openingHours : null;
  }

  function getNextOpening(dataTest, entityName) {
    let currentDay = new Date(dataTest);
    let find = false;

    while (!find) {
      let dayNum = currentDay.getDay();
      let dayOfWeek = getDayAbbreviation(dayNum);
      let openingHours = aperto[dayOfWeek][entityName];
      let chiusoGiorno = isDayClosed(currentDay);

      if (openingHours && !chiusoGiorno) {
        let orario = openingHours.split('-')[0];
        let parts = orario.split(':');
        let nextOpening = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);

        if (nextOpening.getTime() > now.getTime()) {
          if (!isDayClosed(nextOpening)) {
            return nextOpening;
          }
        }
      }
      currentDay.setDate(currentDay.getDate() + 1);
      currentDay.setHours(0, 0, 0, 0);
    }
    return null;
  }

  function isDayClosed(currentDay) {
    const dayOfWeek = getDayAbbreviation(currentDay.getDay());
    const day = String(currentDay.getDate()).padStart(2, '0');
    const month = String(currentDay.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${day}/${month}`;

    return chiuso.includes(formattedDate) || aperto[dayOfWeek] === 'Chiuso';
  }

  function getMonthName(i) {
    const months = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    return months[i];
  }

  function getDayAbbreviation(dayOfWeek) {
    return ['DO', 'LU', 'MA', 'ME', 'GI', 'VE', 'SA'][dayOfWeek];
  }

  function getDayOfWeek(date) {
    return ["Domenica", "lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"][date.getDay()];
  }

  function formatDate(date, format) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return format.replace('HH', hours).replace('mm', minutes);
  }

  function showError(msg) {
    if (error) {
      error.innerText = msg;
      error.style.display = 'block';
    }
  }

  function hideError() {
    if (error) {
      error.innerText = '';
      error.style.display = 'none';
    }
  }

  // Esponiamo hideError a window in modo che l'event listener in footer.html possa invocarlo
  window.hideError = hideError;

  function addEaster() {
    const year = now.getFullYear();
    const pasqua = getEasterDate(year);
    const offsets = [-2, -1, 0, 1];
    offsets.forEach(offset => {
      let relativeDate = new Date(pasqua.getFullYear(), pasqua.getMonth(), pasqua.getDate() + offset);
      let day = String(relativeDate.getDate()).padStart(2, '0');
      let month = String(relativeDate.getMonth() + 1).padStart(2, '0');
      chiuso.push(`${day}/${month}`);
    });
  }

  function getEasterDate(year) {
    var a = year % 19, b = Math.floor(year / 100), c = year % 100;
    var d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
    var g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
    var i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
    var m = Math.floor((a + 11 * h + 22 * l) / 451);
    var month = Math.floor((h + l - 7 * m + 114) / 31);
    var day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(year, month - 1, day);
  }

  document.addEventListener('DOMContentLoaded', function() {
    addEaster();
    initDOM();
    setAvviso();
  });
})();