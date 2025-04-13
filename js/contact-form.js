// Fonctionnalité d'envoi d'email pour le formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !email || !subject || !message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            // Simuler l'envoi d'email (dans un environnement réel, ceci serait remplacé par un appel à un service d'email)
            // Afficher un indicateur de chargement
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                // En production, remplacer cette partie par un appel à un service d'email comme EmailJS, Formspree, ou un backend personnalisé
                
                // Préparer les données pour l'envoi (exemple pour un backend)
                const formData = {
                    name: name,
                    email: email,
                    phone: phone || 'Non fourni',
                    subject: subject,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                // Log des données (à des fins de démonstration)
                console.log('Données du formulaire à envoyer:', formData);
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Restaurer le bouton
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                
                // Afficher un message de succès
                showNotification('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.', 'success');
                
                // Dans un environnement réel, vous utiliseriez un code comme celui-ci:
                /*
                fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                .then(response => response.json())
                .then(data => {
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    
                    if (data.success) {
                        contactForm.reset();
                        showNotification('Votre message a été envoyé avec succès! Nous vous contacterons bientôt.', 'success');
                    } else {
                        showNotification('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                    showNotification('Une erreur est survenue. Veuillez réessayer plus tard.', 'error');
                });
                */
                
            }, 1500);
        });
    }
    
    // Fonction pour afficher les notifications
    function showNotification(message, type) {
        // Créer l'élément de notification s'il n'existe pas déjà
        let notification = document.querySelector('.form-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.className = 'form-notification';
            contactForm.appendChild(notification);
        }
        
        // Définir le message et la classe de type
        notification.textContent = message;
        notification.className = 'form-notification ' + type;
        
        // Afficher la notification
        notification.style.display = 'block';
        
        // Faire disparaître la notification après 5 secondes
        setTimeout(function() {
            notification.style.display = 'none';
        }, 5000);
    }
});
