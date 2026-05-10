// Modal window per date corsi
// 2025-10-27 14:52 <panathos@gmail.com>
(function() {
    if (window.modalManagerInitialized) {
        return;
    }
    window.modalManagerInitialized = true;
class ModalManager {
    constructor() {
        this.modal = null;
        this.modalDates = null;
        this.titleEl = null;
        this.closeBtn = null;
        this.lastOpener = null;
        this.init();
    }
    formatDates(datesStr) {
        if (!datesStr) return '<p>Nessuna data disponibile.</p>';
        const items = datesStr.split(/[,;|]/)
            .map(s => s.trim())
            .filter(Boolean);
        if (items.length === 0) return '<p>Nessuna data disponibile.</p>';
        return `
            <ul style="margin:.5rem 0 0 1.25rem;">
                ${items.map(d => `<li>${this.escapeHtml(d)}</li>`).join('')}
            </ul>
        `;
    }
    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    createModal() {
        const modal = document.createElement('div');
        modal.id = 'corso-avviso-modal';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;
        modal.setAttribute('aria-hidden', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'modal-title');
        modal.innerHTML = `
            <div class="modal-inner">
                <button type="button" class="modal-close" aria-label="Chiudi">&times;</button>
                <h3 class="modal-title" id="modal-title">Date corso</h3>
                <div class="modal-dates" style="margin-top: 1rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }
    init() {
        this.modal = document.getElementById('corso-avviso-modal') || this.createModal();
        this.modalDates = this.modal.querySelector('.modal-dates');
        this.titleEl = this.modal.querySelector('.modal-title');
        this.closeBtn = this.modal.querySelector('.modal-close');
        this.bindEvents();
    }
    bindEvents() {
        document.addEventListener('click', (e) => {
            const opener = e.target.closest?.('.corso-avviso[data-dates]');
            if (!opener) return;

            e.preventDefault();
            const dates = opener.getAttribute('data-dates') || '';
            const title = opener.getAttribute('data-title') || 'Tutte le date';
            this.openModal(title, dates, opener);
        });
        this.closeBtn?.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'flex') {
                this.closeModal();
            }
        });
    }
    openModal(title, dates, opener) {
        if (this.titleEl) {
            this.titleEl.textContent = title || 'Date del corso';
        }
        if (this.modalDates) {
            this.modalDates.innerHTML = this.formatDates(dates);
        }
        this.modal.style.display = 'flex';
        this.modal.setAttribute('aria-hidden', 'false');
        this.lastOpener = opener || null;
        this.closeBtn?.focus();
        document.body.style.overflow = 'hidden';
    }
    closeModal() {
        this.modal.style.display = 'none';
        this.modal.setAttribute('aria-hidden', 'true');

        // Ripristina lo scroll del body
        document.body.style.overflow = '';
        if (this.lastOpener?.focus) {
            this.lastOpener.focus();
        }
    }
}
function initModal() {
    new ModalManager();
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModal);
} else {
    initModal();
}
})();