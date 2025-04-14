// Script pour modifier les attributs des images pour le lazy loading
document.addEventListener('DOMContentLoaded', function() {
  // Sélectionner toutes les images du site
  const images = document.querySelectorAll('img:not([data-src])');
  
  // Convertir chaque image pour utiliser le lazy loading
  images.forEach(img => {
    // Ne pas traiter les images déjà configurées ou le logo
    if (img.classList.contains('lazy-image') || img.parentElement.classList.contains('logo')) {
      return;
    }
    
    // Sauvegarder le src original dans data-src
    const originalSrc = img.src;
    img.setAttribute('data-src', originalSrc);
    
    // Utiliser une image de placeholder très légère
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    
    // Ajouter la classe pour le style
    img.classList.add('lazy-image');
  });
  
  console.log('Images préparées pour le lazy loading');
});
