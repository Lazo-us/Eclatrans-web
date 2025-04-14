// Script pour améliorer le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Créer l'élément de notification toast
        const toastContainer = document.createElement('div');
        toastContainer.className = 'toast-notification';
        toastContainer.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span class="toast-message"></span>
            <span class="close-toast"><i class="fas fa-times"></i></span>
        `;
        document.body.appendChild(toastContainer);
        
        const toastMessage = toastContainer.querySelector('.toast-message');
        const closeToast = toastContainer.querySelector('.close-toast');
        
        // Fermer le toast en cliquant sur le bouton de fermeture
        closeToast.addEventListener('click', function() {
            toastContainer.classList.remove('show');
        });
        
        // Validation côté client
        function validateForm() {
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            // Réinitialiser les styles d'erreur
            [name, email, subject, message].forEach(field => {
                field.style.borderColor = '';
            });
            
            // Valider le nom
            if (!name.value.trim()) {
                name.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            // Valider l'email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
                email.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            // Valider le sujet
            if (!subject.value.trim()) {
                subject.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            // Valider le message
            if (!message.value.trim()) {
                message.style.borderColor = 'var(--error-color)';
                isValid = false;
            }
            
            return isValid;
        }
        
        // Afficher le toast de notification
        function showToast(message, type) {
            toastMessage.textContent = message;
            toastContainer.className = 'toast-notification ' + type + ' show';
            
            // Masquer le toast après 5 secondes
            setTimeout(function() {
                toastContainer.classList.remove('show');
            }, 5000);
        }
        
        // Gérer la soumission du formulaire
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Valider le formulaire
            if (!validateForm()) {
                showToast('Veuillez remplir correctement tous les champs obligatoires.', 'error');
                return;
            }
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value || 'Demande de contact';
            const message = document.getElementById('message').value;
            
            // Afficher un indicateur de chargement
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitButton.disabled = true;
            
            // Configuration pour EmailJS
            const serviceID = 'default_service';
            const templateID = 'template_ywk2ixj';
            
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
                    showToast('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.', 'success');
                })
                .catch(function(error) {
                    console.error('FAILED...', error);
                    
                    // Restaurer le bouton
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    // Afficher un message d'erreur
                    showToast('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.', 'error');
                });
        });
    }
});
