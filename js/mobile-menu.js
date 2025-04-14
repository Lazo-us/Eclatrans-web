// Mobile menu toggle functionality - Version unifiée (dropdown uniquement)
document.addEventListener('DOMContentLoaded', function() {
    // Utiliser le bouton de menu mobile existant
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Supprimer tout menu latéral qui pourrait exister
    const sideMenus = document.querySelectorAll('.side-menu, .sidebar-menu, .offcanvas-menu');
    sideMenus.forEach(menu => {
        if (menu) {
            menu.remove();
        }
    });
    
    if (mobileMenuToggle && navMenu) {
        // S'assurer que le menu est correctement initialisé
        navMenu.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        
        // Fermer le menu quand on clique sur un lien
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Toggle menu quand on clique sur le bouton
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
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
    }
});
