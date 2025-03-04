import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder } from "discord.js";

export async function cancelEditQuestion(interaction: ButtonInteraction) {
    // Récupérer le message original
    const message = interaction.message;
    if (!message) {
        await interaction.reply({ content: "Erreur: Message introuvable", ephemeral: true });
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
    
    // Mettre à jour le message
    await interaction.update({ 
        content: "Modification annulée.", 
        embeds: [embed],
        components: [row]
    });
} 