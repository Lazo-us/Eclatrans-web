// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.classList.add('mobile-menu-toggle');
    mobileMenuToggle.setAttribute('aria-label', 'Menu de navigation');
    mobileMenuToggle.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (nav && navMenu) {
        nav.insertBefore(mobileMenuToggle, navMenu);
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
        
        // Toggle menu quand on clique sur le bouton
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
            
            // Ajouter/supprimer l'attribut aria-expanded pour l'accessibilité
            mobileMenuToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            if (!nav.contains(event.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
                mobileMenuToggle.setAttribute('aria-expanded', false);
            }
        });
    }
});
