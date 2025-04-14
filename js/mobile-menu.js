document.addEventListener('DOMContentLoaded', function() {
    // Forcer l'affichage du bouton de menu mobile
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.style.display = 'block';
        mobileMenuToggle.style.visibility = 'visible';
        mobileMenuToggle.style.opacity = '1';
        mobileMenuToggle.style.position = 'absolute';
        mobileMenuToggle.style.right = '20px';
        mobileMenuToggle.style.top = '20px';
        mobileMenuToggle.style.zIndex = '1000';
        
        // Configurer le menu nav
        const nav = document.querySelector('nav');
        if (nav) {
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.right = '-100%';
            nav.style.width = '80%';
            nav.style.maxWidth = '300px';
            nav.style.height = '100vh';
            nav.style.backgroundColor = '#fff';
            nav.style.boxShadow = '-5px 0 15px rgba(0, 0, 0, 0.1)';
            nav.style.transition = 'right 0.3s ease';
            nav.style.zIndex = '150';
            nav.style.padding = '5rem 2rem 2rem';
            nav.style.overflowY = 'auto';
            
            // Configurer les éléments du menu
            const navMenu = nav.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.style.flexDirection = 'column';
                navMenu.style.alignItems = 'flex-start';
                navMenu.style.paddingLeft = '0';
                
                const navLinks = navMenu.querySelectorAll('li');
                navLinks.forEach(link => {
                    link.style.margin = '0.5rem 0';
                    link.style.width = '100%';
                    link.style.listStyle = 'none';
                });
                
                const navAnchors = navMenu.querySelectorAll('a');
                navAnchors.forEach(anchor => {
                    anchor.style.display = 'block';
                    anchor.style.padding = '0.5rem 0';
                    anchor.style.width = '100%';
                    anchor.style.textDecoration = 'none';
                    anchor.style.color = '#333';
                });
            }
        }
        
        // Gérer le clic sur le bouton de menu
        mobileMenuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            event.preventDefault();
            
            if (nav) {
                if (nav.classList.contains('active')) {
                    nav.style.right = '-100%';
                    nav.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                } else {
                    nav.style.right = '0';
                    nav.classList.add('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
                }
            }
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(event) {
            if (nav && nav.classList.contains('active')) {
                const isClickInsideMenu = nav.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideMenu && !isClickOnToggle) {
                    nav.style.right = '-100%';
                    nav.classList.remove('active');
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    }
});
