// Fonctionnalité d'envoi d'email pour le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value || 'Demande de contact';
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !message) {
                showError('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            
            // Afficher un indicateur de chargement
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            // Configuration pour EmailJS - IDs mis à jour et vérifiés
            const serviceID = 'default_service'; // Utilisation du service par défaut
            const templateID = 'template_ywk2ixj'; // ID du template EmailJS public
            
            // Préparer les données pour l'envoi
            const templateParams = {
                from_name: name,
                from_email: email,
                from_phone: phone || 'Non fourni',
                subject: subject,
                message: message,
                to_email: 'contact@eclatrans.fr',
                reply_to: email
            };
            
            console.log('Envoi en cours avec les paramètres:', templateParams);
            
            // Envoyer l'email via EmailJS
            emailjs.send(serviceID, templateID, templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Réinitialiser le formulaire
                    contactForm.reset();
                    
                    // Restaurer le bouton
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Afficher un message de succès
                    showSuccess('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.');
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // Restaurer le bouton
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Afficher un message d'erreur
                    showError('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer ou nous contacter directement par téléphone.');
                });
        });
    }
    
    // Fonction pour afficher un message de succès
    function showSuccess(message) {
        // Masquer le message d'erreur s'il est affiché
        if (errorMessage) errorMessage.style.display = 'none';
        
        // Afficher le message de succès
        if (successMessage) {
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> ' + message;
            successMessage.style.display = 'block';
            
            // Faire disparaître le message après 5 secondes
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Fonction pour afficher un message d'erreur
    function showError(message) {
        // Masquer le message de succès s'il est affiché
        if (successMessage) successMessage.style.display = 'none';
        
        // Afficher le message d'erreur
        if (errorMessage) {
            errorMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;
            errorMessage.style.display = 'block';
            
            // Faire disparaître le message après 5 secondes
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }
});
