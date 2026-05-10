function initCountdown() {
    document.querySelectorAll('.timerevent').forEach(el => {
        const dataInizio = el.getAttribute('data-inizio');
        if (!dataInizio) return;

        const oggi = new Date();
        oggi.setHours(0, 0, 0, 0);

        const evento = new Date(dataInizio);
        evento.setHours(0, 0, 0, 0);

        const diffGiorni = Math.ceil((evento - oggi) / (1000 * 60 * 60 * 24));

        if (diffGiorni >= 0) {
            let messaggio = '';
            let classe = '';

            if (diffGiorni === 0) {
                messaggio = '🎉 OGGI! Ultimi posti disponibili!';
                classe = 'oggi';
            } else if (diffGiorni === 1) {
                messaggio = '⏰ DOMANI! Preparati!';
                classe = 'urgente';
            } else if (diffGiorni <= 3) {
                messaggio = `🔥 SOLO ${diffGiorni} GIORNI! Non aspettare!`;
                classe = 'urgente';
            } else if (diffGiorni <= 7) {
                messaggio = `✨ Tra ${diffGiorni} giorni - Posti limitati`;
                classe = 'presto';
            } else if (diffGiorni <= 15) {
                messaggio = `📅 Mancano ${diffGiorni} giorni - Iscriviti ora`;
                classe = 'normale';
            } else {
                messaggio = `🗓️ tra ${diffGiorni} giorni<br>📢 Iscrizioni aperte`;
                classe = 'futuro';
            }

            el.innerHTML = `<span class="countdown-${classe}">${messaggio}</span>`;
        } else {
            el.style.display = 'none';
        }
    });
}

// 🔥 questo è il punto chiave
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountdown);
} else {
    initCountdown();
}