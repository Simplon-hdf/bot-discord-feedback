import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";

// Déclarer le type pour les variables globales
declare global {
    var selectedQuestionsToRemove: string[] | undefined;
    var lastMessageId: string | undefined;
}

export async function cancelRemoveQuestions(interaction: ButtonInteraction) {
    try {
        // Récupérer le message original
        const message = interaction.message;
        if (!message) {
            await interaction.reply({ 
                content: "Erreur: Message introuvable", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Récupérer l'embed existant
        const embed = EmbedBuilder.from(message.embeds[0]);
        
        // Recréer les boutons originaux
        const addButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionAddButton")
            .setLabel("Ajouter une question")
            .setStyle(ButtonStyle.Primary);

        const editButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionEditButton")
            .setLabel("Modifier une question")
            .setStyle(ButtonStyle.Primary);

        const removeButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionRemoveButton")
            .setLabel("Supprimer une ou plusieurs questions")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(addButton, editButton, removeButton);
        
        // Réinitialiser les variables globales
        global.selectedQuestionsToRemove = undefined;
        global.lastMessageId = undefined;
        
        // Mettre à jour le message pour restaurer l'interface principale
        await interaction.update({
            content: null,
            embeds: [embed],
            components: [row]
        });
    } catch (error) {
        console.error("Erreur lors de l'annulation de la suppression de questions:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de l'annulation de la suppression. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 