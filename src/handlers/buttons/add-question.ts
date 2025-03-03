import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export async function addQuestion(interaction: ButtonInteraction) {
    // Créer un champ de texte pour la question
    const questionInput = new TextInputBuilder()
        .setCustomId("questionContent")
        .setLabel("Question")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Entrez votre question ici")
        .setRequired(true)
        .setMaxLength(100);
    
    // Créer une ligne pour le champ de question
    const questionRow = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(questionInput);
    
    // Créer la modale
    const modal = new ModalBuilder()
        .setCustomId("addQuestionModal")
        .setTitle("Ajouter une question")
        .addComponents(questionRow);
    
    // Afficher la modale
    await interaction.showModal(modal);
} 