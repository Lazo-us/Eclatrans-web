// Script pour le lazy loading des images
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner toutes les images qui doivent être chargées paresseusement
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  // Options pour l'Intersection Observer
  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% de l'image doit être visible
  };
  
  // Fonction de callback pour l'Intersection Observer
  const lazyLoad = function(entries, observer) {
    entries.forEach(entry => {
      // Si l'élément est visible
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // Remplacer l'attribut src par data-src
        img.src = img.dataset.src;
        
        // Ajouter la classe 'loaded' pour l'animation de fondu
        img.classList.add('loaded');
        
        // Arrêter d'observer l'image une fois qu'elle est chargée
        observer.unobserve(img);
        
        // Journaliser le chargement pour le débogage
        console.log('Image chargée: ' + img.dataset.src);
      }
    });
  };
  
  // Créer un nouvel Intersection Observer
  const observer = new IntersectionObserver(lazyLoad, options);
  
  // Observer chaque image
  lazyImages.forEach(img => {
    // Ajouter la classe pour le style initial (opacité 0)
    img.classList.add('lazy-image');
    
    // Observer l'image
    observer.observe(img);
  });
  
  // Fallback pour les navigateurs qui ne supportent pas Intersection Observer
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.add('loaded');
    });
  }
});
