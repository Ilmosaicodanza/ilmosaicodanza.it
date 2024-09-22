/*
* @Author: Fabrizio Conti <panathos@gmail.com>
* @Date:   2023-07-17 18:03:35
* @Last Modified by:   Fabrizio Conti <panathos@gmail.com>
* @Last Modified time: 2023-07-27 09:05:16
*/
const aperto = {
  'LU': {
    'Sabina': '11:00-16:30',
    'Segreteria': '16:30-22:30',
  },
  'MA': {
    'Sabina': '11:00-16:30',
    'Segreteria': '18:30-22:30',
  },
  'ME': {
    'Sabina': '10:00-11:30',
    'Segreteria': '17:30-22:30',
  },
  'GI': {
    'Sabina': '11:00-16:30',
    'Segreteria': '16:30-22:30',
  },
  'VE': {
    'Sabina': '17:00-20:00',
    'Segreteria': null
  },
  'SA': {
    'Sabina': '11:00-16:15',
    'Segreteria': null,
  },
  'DO': {
    'Sabina': null,
    'Segreteria': null,
  },
};

const chiuso = [
  '01/01',
  '02/01',
  '03/01',
  '04/01',
  '05/01',
  '06/01',
  '25/04',
  '01/05',
  '02/06',
  '15/08',
  '01/11',
  '07/12',
  '08/12',
  '23/12',
  '24/12',
  '25/12',
  '26/12',
  '27/12',
  '28/12',
  '29/12',
  '30/12',
  '31/12',
];

const entity = {
    'Sabina':{
      'num':'+393396173388',
    },
    'Segreteria':{
      'num': '+393519459036',
    }
  };
let recipient = {
  'name': 'Segreteria',
  'num': entity['Sabina'].num,
  'greet': '',
  'msg': '',
  'currentHours': '',
  'nextHours': ''
}
let now = new Date();
// now = new Date(2023, 11, 21, 16, 58, 0); // Thu 21/12/2023 16:58 => Fri 11:30
// now = new Date(2023, 11, 22, 16, 58, 0); // Fri 21/12/2023 16:58 => aperta => Wed 27/12/2023 17:30
//now = new Date(2023, 6, 27, 1, 20, 0);
//now = new Date(2023, 6, 27, 23, 15, 0);

const request = document.querySelector('textarea[name="request"]');
const sender = document.querySelector('input[name="name"]');
const submitButton = document.querySelector('button[type="submit"]');
const avviso = document.querySelector(".avviso");
const error = document.querySelector(".error-message");

document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();

  if (sender.value.trim() === '' || request.value.trim() === '') {
    showErrorMessage();
  } else {
    hideErrorMessage();
    // Esegui altre azioni, ad esempio inviare i dati via WhatsApp
  }
});
function setAvviso() {
  let open = getIsEntityOpen('Segreteria');
  let greet = getGreeting();
  if(open){
    const [dalle, alle] = open.split('-');
    var lnk = "<a href='/regolamento-di-iscrizione/' class='link'>Prenota le tue lezioni di prova e scarica i moduli di iscrizione</a>";
    msg = greet + "La segreteria è disponibile oggi fino alle #ALLE1#. Poi #NEXT# dalle #ALLE2#.<br>" + lnk;
    nextDay = new Date(now.getDate()+1);
    nextOpen = getNextOpening(nextDay, 'Segreteria');
    nextDayName = getDayDescription(nextOpen);
    alle2 = formatDate(nextOpen, 'HH:mm');
    msg = msg.replace("#ALLE1#", alle);
    msg = msg.replace("#NEXT#", nextDayName);
    msg = msg.replace("#ALLE2#", alle2);
    avviso.innerHTML = msg;
  }else{
    next = getNextOpening(now, 'Segreteria');
    recipient.nextHours = next;
    giorno = getDayDescription(next);
    msg = greet + "La segreteria sarà disponibile " + giorno + " dalle " + formatDate(next, 'HH:mm') + ".<br>🤓 Però a volte lavoriamo anche quando siamo chiusi.  Mandaci un messaggio e ti risponderemo appena possibile!";
    avviso.innerHTML = msg;
  }
}

function getDayDescription(next) {
  const tomorrow = new Date(next);
  tomorrow.setDate(tomorrow.getDate() - 1);
  if (now.getMonth() === next.getMonth() && now.getDate() === next.getDate()) {
    return "oggi";
  } else if (now.getMonth() === tomorrow.getMonth() && now.getDate() === tomorrow.getDate()) {
    return "domani";
  } else {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const diffInDays = Math.floor((next - now) / oneDayInMilliseconds);
    if (diffInDays > 3)  {
      if (next.getMonth() === now.getMonth()){
        return getDayOfWeek(next);
      }else{
        return `${getDayOfWeek(next)} ${next.getDate()} ${getMonthName(next.getMonth())}`;
      }
    }
    return getDayOfWeek(next);
  }
}
function getGreeting() {
    let currentHour = now.getHours();
  if (currentHour < 14) {
    str = "Buongiorno. ";
  } else if (currentHour >= 14 && currentHour < 18) {
    str = "Buon pomeriggio. ";
  } else {
    str = "Buonasera. ";
  }
  str = "Ciao. "
  recipient.greet = str;
  return recipient.greet;
}

function composeWhatsAppMessage() {
  //ebugger;
  if (request.value.trim() === '' || sender.value.trim() === '') {
    // Mostra un messaggio di errore
    error.innerText = 'Inserisci sia il tuo nome che la richiesta';
    return false;
  }
  let isFlamenco = false;
  recipient.greet = getGreeting();

  const dayOfWeek = now.getDay();
  //onsole.trace("dayOfWeek", dayOfWeek);
  const value = request.value.toLowerCase();
  const words = ['flamenco', 'baile', 'compas', 'dance workout'];
  if (words.some(word => value.includes(word.toLowerCase()))) {
    isFlamenco = true;
    recipient.name = 'Sabina';
    recipient.num = entity['Sabina'].num;
    recipient.msg = entity['Sabina'].msg;
  }
  // se è disponibile Sabina, siamo a posto
  if ( getIsEntityOpen('Sabina') || isFlamenco && getIsEntityOpen('Segreteria') ) {
    recipient.num = entity['Sabina'].num;
    recipient.msg = entity['Sabina'].msgO;
    composeMessage();
    return true;
    // se è aperta segreteria
  } else if (getIsEntityOpen('Segreteria')){
    composeMessage();
    return true;
  };
  // qui sono chiuse entrambe
  let next1 = getNextOpening(now, 'Segreteria');
  let next2 = getNextOpening(now, 'Sabina');
  if (next2.getTime() < next1.getTime()){
    recipient.num = entity['Sabina'].num
  }
  let nextOpening = getNextOpening(now, "Segreteria");
      if (nextOpening) {
      {
        recipient.nextHours = nextOpening;
        composeMessage();
      }

  }
  return true;
}

function getSlug() {
  const segments = window.location.pathname.split('/').filter(segment => segment !== '');
 if (segments.length === 0) {
    return "Home";
  }
  return segments[segments.length - 1];
}
function composeMessage() {
  let incipit = '';
  if (recipient.nextHours){
    incipit = "Segreteria disponibile #DAY# dalle #ORA#";
    day = getDayDescription(recipient.nextHours);
    hours = formatDate(recipient.nextHours, "HH:mm")
    incipit = incipit.replace("#DAY#", day);
    incipit = incipit.replace("#ORA#", hours);
    incipit = "[" + incipit + "]"
  }
  const slug = `Pagina: ${getSlug()} `;
  let msg = slug + incipit + "[DA " + sender.value.trim().toUpperCase() + "] " + request.value;
  const whatsappLink = `https://wa.me/${recipient.num}?text=${encodeURIComponent(msg)}`;
  window.open(whatsappLink);
  hideWhatsappMessage();
  return true;
}
function getIsEntityOpen(entityName) {
  //ebugger;
  let date = new Date(now);
  const dayOfWeek = now.getDay();
  const openingHours = aperto[getDayAbbreviation(dayOfWeek)][entityName];
  const chiusoGiorno = isDayClosed(date);

  if (!openingHours || chiusoGiorno) {
    return null;
  }

  const [opening, closing] = openingHours.split('-');
  const currentTime = date.getHours().toString().padStart(2, '0') + ":" +  date.getMinutes().toString().padStart(2, '0');

  if (currentTime >= opening && currentTime <= closing) {
    return openingHours;
  } else {
    return null;
  }
}
/**
 * @returns {Date}
 */
function getNextOpening(dataTest, entityName) {
  //ebugger;
  let currentDay = new Date(dataTest);
  let nextOpening = null;
  find = false;
  while (!find) {
    dayNum        = currentDay.getDay();
    dayOfWeek     = getDayAbbreviation(dayNum);
    orari         = aperto[dayOfWeek][entityName];
    openingHours  = (entityName == "Sabina")? aperto[dayOfWeek].Sabina : aperto[dayOfWeek].Segreteria;
    chiusoGiorno  = isDayClosed(currentDay);
    if (openingHours && !chiusoGiorno) {
      // imposta oggetto data per confronto rispetto a now
      orario = openingHours.split('-')[0];
      nextOpening = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), orario.split(':')[0], orario.split(':')[1], 0, 0);
      if (nextOpening.getTime() > now.getTime()) {
        if (!isDayClosed(nextOpening)){
          find = true;
          return nextOpening;
        }
      }
      //orario = openingHours.split('-')[0];
      //nextOpening = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), orario.split(':')[0], orario.split(':')[1], 0, 0);
    }
    currentDay.setDate(currentDay.getDate() + 1);
    currentDay.setHours(0, 0, 0, 0);
  }

  return nextOpening;
}

function isDayClosed(currentDay) {
  //onsole.info("126 currentDay", currentDay);
  const dayOfWeek   = getDayAbbreviation(currentDay);
  const currentDate = currentDay;
  const day         = currentDate.getDate();
  const month       = currentDate.getMonth() + 1;
  const formattedDate = `${day}/${month}`;

  return chiuso.includes(formattedDate) || aperto[dayOfWeek] === 'Chiuso';
}

function getDayName(dayIndex) {
  const daysOfWeek = ['Domenica', 'lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  return daysOfWeek[dayIndex];
}
function getMonthName(I) {
  const months = [
    "gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno",
    "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"
  ];
  return months[I];
}
function getDayAbbreviation(dayOfWeek) {
  const abbreviations = ['DO', 'LU', 'MA', 'ME', 'GI', 'VE', 'SA'];
  return abbreviations[dayOfWeek];
}

function getCurrentDate() {
  const now = new Date();
  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  return `${day}/${month}`;
}

function getDayOfWeek(date) {
  const daysOfWeek = ["Domenica", "lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"];
  return daysOfWeek[date.getDay()];
}

function formatDate(date, format) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedDate = format
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'));

  return formattedDate;
}

function addEaster() {
  const year = now.getFullYear();
  const pasqua = getEasterDate(year);
  const date = [-2, -1, 0, +1];
  date.forEach(offset => {
    let relativeDate = new Date(pasqua.getFullYear(), pasqua.getMonth(), pasqua.getDate() + offset);
    let day = relativeDate.getDate();
    let month = relativeDate.getMonth() + 1;
    let formatted = day > 9 ? day : '0' + day;
    formatted += '/' + (month > 9 ? month : '0' + month);
    chiuso.push(formatted);
  })
}
function getEasterDate(year) {
  // Formula di Butcher basata sulle regole di Gregory
  var a = year % 19;
  var b = Math.floor(year / 100);
  var c = year % 100;
  var d = Math.floor(b / 4);
  var e = b % 4;
  var f = Math.floor((b + 8) / 25);
  var g = Math.floor((b - f + 1) / 3);
  var h = (19 * a + b - d - g + 15) % 30;
  var i = Math.floor(c / 4);
  var k = c % 4;
  var l = (32 + 2 * e + 2 * i - h - k) % 7;
  var m = Math.floor((a + 11 * h + 22 * l) / 451);
  var month = Math.floor((h + l - 7 * m + 114) / 31);
  var day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month-1, day);
}

// Attende che il pulsante sia caricato
  // Aggiungi l'evento click al pulsante
  addEaster();
  setAvviso();
  submitButton.addEventListener('click', () => {
    //inviaMessaggioWhatsapp();
    composeWhatsAppMessage();
  });

