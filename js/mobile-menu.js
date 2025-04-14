// Mobile menu toggle functionality - Version corrigée
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments du menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle && nav) {
        console.log('Menu mobile initialisé');
        
        // S'assurer que le menu est correctement initialisé
        nav.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Toggle menu quand on clique sur le bouton
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            
            console.log('Bouton menu mobile cliqué');
            nav.classList.toggle('active');
            
            // Change icon based on menu state
            if (nav.classList.contains('active')) {
                console.log('Menu activé');
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                console.log('Menu désactivé');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = nav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Add active class to current page link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    } else {
        console.error('Éléments du menu mobile non trouvés:', {
            mobileMenuToggle: !!mobileMenuToggle,
            nav: !!nav
        });
    }
});
