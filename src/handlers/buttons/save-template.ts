import { ButtonInteraction, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";

export async function saveTemplate(interaction: ButtonInteraction) {
    const poll = getPollObject(interaction.user.id);
    
    if (!poll) {
        await interaction.reply({
            content: "Erreur : Modèle de questionnaire non trouvé.",
            flags: MessageFlags.Ephemeral
        });
        return;
    }
    
    if (poll.questions.length === 0) {
        await interaction.reply({
            content: "Erreur : Vous devez ajouter au moins une question avant d'enregistrer le modèle.",
            flags: MessageFlags.Ephemeral
        });
        return;
    }
    
    // Ici, on simule l'appel à l'API pour sauvegarder le modèle
    console.log("Sauvegarde du modèle de questionnaire:", poll);
    
    // Exemple d'appel API (à implémenter)
    // fetch('/api/poll-templates', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(poll),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => console.error('Error:', error));
    
    await interaction.reply({
        content: `Le modèle de questionnaire "${poll.title}" a été enregistré avec succès !`,
        flags: MessageFlags.Ephemeral
    });
} 