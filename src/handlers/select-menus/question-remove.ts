import { StringSelectMenuInteraction, MessageFlags } from "discord.js";

// Variable globale pour stocker les questions sélectionnées pour la suppression
declare global {
    var selectedQuestionsToRemove: string[] | undefined;
}

export async function questionRemove(interaction: StringSelectMenuInteraction) {
    try {
        // Récupérer les valeurs sélectionnées
        const selectedValues = interaction.values;
        
        // Stocker les questions sélectionnées dans la variable globale
        global.selectedQuestionsToRemove = selectedValues;
        
        console.log(`Questions sélectionnées pour la suppression: ${selectedValues.join(", ")}`);
        
        // Répondre à l'interaction
        await interaction.update({
            content: `${selectedValues.length} question(s) sélectionnée(s) pour la suppression. Cliquez sur "Confirmer la suppression" pour continuer ou "Annuler" pour annuler.`
        });
    } catch (error) {
        console.error("Erreur lors de la sélection des questions à supprimer:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de la sélection des questions. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 