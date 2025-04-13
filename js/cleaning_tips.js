// Astuces de nettoyage pour chaque service
const cleaningTips = {
    hotel: [
        "Utilisez des produits écologiques pour préserver la qualité de l'air dans les chambres",
        "Pour les taches tenaces sur les textiles, appliquez un peu de bicarbonate de soude avant le nettoyage",
        "Nettoyez régulièrement les filtres des climatiseurs pour maintenir une bonne qualité de l'air",
        "Utilisez des chiffons en microfibre pour éviter les rayures sur les surfaces délicates",
        "Désinfectez quotidiennement les points de contact comme les poignées et interrupteurs"
    ],
    blanchisserie: [
        "Triez toujours le linge par couleur et par type de tissu avant le lavage",
        "Traitez les taches rapidement, avant qu'elles ne s'incrustent dans les fibres",
        "Pour les textiles délicats, privilégiez un lavage à froid ou à la main",
        "Utilisez des produits spécifiques pour les tissus de luxe",
        "Séchez les rideaux et voilages à l'air libre pour éviter le rétrécissement"
    ],
    livraison: [
        "Utilisez des contenants adaptés pour protéger les articles pendant le transport",
        "Maintenez une liste de contrôle pour vérifier que tous les articles sont bien livrés",
        "Protégez les objets fragiles avec des matériaux d'emballage appropriés",
        "Formez le personnel aux techniques de manipulation sécuritaire",
        "Utilisez des gants propres lors de la manipulation d'articles destinés aux clients"
    ],
    bureaux: [
        "Nettoyez les claviers et téléphones régulièrement avec des lingettes désinfectantes",
        "Videz les poubelles quotidiennement pour éviter les odeurs",
        "Utilisez des aspirateurs avec filtres HEPA pour améliorer la qualité de l'air",
        "Nettoyez les tapis et moquettes en profondeur au moins une fois par trimestre",
        "Essuyez les écrans d'ordinateur avec des chiffons spéciaux anti-statiques"
    ],
    lustres: [
        "Coupez toujours l'électricité avant de nettoyer un lustre",
        "Utilisez un plumeau à long manche pour dépoussiérer régulièrement",
        "Pour les lustres en cristal, utilisez un mélange d'eau et de vinaigre blanc",
        "Séchez chaque pampille individuellement pour éviter les traces",
        "Photographiez le lustre avant démontage pour faciliter le remontage"
    ],
    vitres: [
        "Nettoyez les vitres par temps couvert pour éviter que le produit ne sèche trop vite",
        "Utilisez une raclette professionnelle pour un résultat sans traces",
        "Pour les vitres très sales, commencez par un nettoyage à l'eau savonneuse",
        "Nettoyez les encadrements avant les vitres pour éviter de salir le verre",
        "Utilisez du papier journal froissé pour faire briller les vitres après nettoyage"
    ]
};

// Fonction pour afficher les astuces de nettoyage
function showCleaningTips(serviceId) {
    const tipsContainer = document.getElementById('cleaning-tips');
    const serviceTips = cleaningTips[serviceId];
    
    if (tipsContainer && serviceTips) {
        let tipsHTML = '<h3>Astuces d\'entretien et de nettoyage</h3><ul>';
        serviceTips.forEach(tip => {
            tipsHTML += `<li>${tip}</li>`;
        });
        tipsHTML += '</ul>';
        
        tipsContainer.innerHTML = tipsHTML;
        tipsContainer.style.display = 'block';
    }
}

// Initialisation des boutons d'astuces
document.addEventListener('DOMContentLoaded', function() {
    const tipButtons = document.querySelectorAll('.tip-button');
    
    tipButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceId = this.getAttribute('data-service');
            showCleaningTips(serviceId);
        });
    });
});
