import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";

export async function addProposal(interaction: ButtonInteraction) {
    try {
        // Récupérer l'index de la question à partir de l'ID du bouton
        const questionIndex = parseInt(interaction.customId.replace("addProposal_", ""));
        
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
        
        // Créer un input pour le texte de la proposition
        const proposalInput = new TextInputBuilder()
            .setCustomId(`proposalText`)
            .setLabel("Texte de la proposition")
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
            .setMaxLength(100);
            
        // Créer la ligne pour l'input
        const actionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(proposalInput);
            
        // Créer le modal
        const modal = new ModalBuilder()
            .setCustomId(`addProposalModal_${questionIndex}`)
            .setTitle("Ajouter une proposition")
            .addComponents(actionRow);
            
        // Afficher le modal
        await interaction.showModal(modal);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une proposition:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de l'ajout d'une proposition. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 