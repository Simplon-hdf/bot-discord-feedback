import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";

export async function editQuestionText(interaction: ButtonInteraction) {
    try {
        // Récupérer l'index de la question à partir de l'ID du bouton
        const questionIndex = parseInt(interaction.customId.replace("editQuestionText_", ""));
        
        const poll = getPollObject(interaction.user.id);
        if (!poll) {
            await interaction.reply({
                content: "Impossible de trouver le sondage. Veuillez réessayer.",
                flags: MessageFlags.Ephemeral
            });
            return;
        }
        
        // Vérifier que l'index est valide
        if (questionIndex < 0 || questionIndex >= poll.questions.length) {
            await interaction.reply({
                content: "Erreur: Question introuvable",
                flags: MessageFlags.Ephemeral
            });
            return;
        }
        
        // Récupérer la question
        const question = poll.questions[questionIndex];
        
        // Créer un input pour le texte de la question
        const questionInput = new TextInputBuilder()
            .setCustomId(`questionText_${questionIndex}`)
            .setLabel("Texte de la question")
            .setStyle(TextInputStyle.Short)
            .setValue(question.content)
            .setRequired(true)
            .setMaxLength(100);
            
        // Créer la ligne pour l'input
        const actionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(questionInput);
            
        // Créer le modal
        const modal = new ModalBuilder()
            .setCustomId(`editQuestionTextModal_${questionIndex}`)
            .setTitle("Modifier le texte de la question")
            .addComponents(actionRow);
            
        // Afficher le modal
        await interaction.showModal(modal);
    } catch (error) {
        console.error("Erreur lors de la modification du texte de la question:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la modification du texte de la question. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 