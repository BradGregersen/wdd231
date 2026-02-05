document.addEventListener('DOMContentLoaded', () => {
    setTimestamp();
    initModals();
});

function setTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}

function initModals() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                openModal(modal);
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const openModalElement = document.querySelector('.modal.open');
            if (openModalElement) {
                closeModal(openModalElement);
            }
        }
    });
}

function openModal(modal) {
    modal.classList.add('open');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const closeBtn = modal.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.focus();
    }
}

function closeModal(modal) {
    modal.classList.remove('open');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    const modalId = modal.getAttribute('id');
    const trigger = document.querySelector(`[data-modal="${modalId}"]`);
    if (trigger) {
        trigger.focus();
    }
}
