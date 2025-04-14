// Script pour gérer le formulaire de contact avec EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation d'EmailJS
    emailjs.init("JnQz9ck-HqLVYVHFP");
    
    // Récupération du formulaire
    const contactForm = document.getElementById('contactForm');
    
    // Récupération des éléments de notification
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    
    if (contactForm) {
        // Ajout d'un écouteur d'événement pour la soumission du formulaire
        contactForm.addEventListener('submit', function(event) {
            // Empêcher le comportement par défaut du formulaire
            event.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Préparation des paramètres pour EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone,
                subject: subject,
                message: message,
                to_email: 'contact@eclatrans.fr'
            };
            
            // Affichage d'un message de chargement
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.disabled = true;
            
            // Envoi de l'email via EmailJS
            emailjs.send('default_service', 'template_contact', templateParams)
                .then(function(response) {
                    // Succès
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Affichage du message de succès
                    successMessage.textContent = 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.';
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    
                    // Réinitialisation du formulaire
                    contactForm.reset();
                    
                    // Réinitialisation du bouton
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    // Masquer le message de succès après 5 secondes
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                })
                .catch(function(error) {
                    // Erreur
                    console.log('FAILED...', error);
                    
                    // Affichage du message d'erreur
                    errorMessage.textContent = 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone.';
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                    
                    // Réinitialisation du bouton
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
