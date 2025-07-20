document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.hamburger').addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');
        this.classList.toggle('open');
    });
});