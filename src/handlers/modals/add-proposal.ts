import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { questionEmbed, pollEmbed, pollRows } from "../../utils/components";
import { logMessageTimer } from "../../utils/timer";

export async function addProposal(interaction: ModalSubmitInteraction) {
    try {
        // Récupérer l'index de la question à partir de l'ID du modal
        const questionIndex = parseInt(interaction.customId.replace("addProposalModal_", ""));
        
        const poll = getPollObject(interaction.user.id);
        if (!poll) {
            await interaction.reply({
                content: "Impossible de trouver le sondage. Veuillez réessayer.",
                flags: MessageFlags.Ephemeral
            });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, logMessageTimer);
            return;
        }
        
        // Vérifier que l'index est valide
        if (questionIndex < 0 || questionIndex >= poll.questions.length) {
            await interaction.reply({
                content: "Erreur: Question introuvable",
                flags: MessageFlags.Ephemeral
            });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, logMessageTimer);
            return;
        }
        
        // Récupérer la question
        const question = poll.questions[questionIndex];
        
        // Récupérer le texte de la proposition
        const proposalText = interaction.fields.getTextInputValue("proposalText");
        
        // Ajouter la proposition à la question
        question.answers.push({
            content: proposalText
        });
        
        // Créer les boutons pour les actions sur la question
        const editQuestionButton = new ButtonBuilder()
            .setCustomId(`editQuestionText_${questionIndex}`)
            .setLabel("Modifier le titre de la question")
            .setStyle(ButtonStyle.Primary);

        const addProposalButton = new ButtonBuilder()
            .setCustomId(`addProposal_${questionIndex}`)
            .setLabel("Ajouter une proposition")
            .setStyle(ButtonStyle.Primary);

        const editProposalButton = new ButtonBuilder()
            .setCustomId(`editProposal_${questionIndex}`)
            .setLabel("Modifier une proposition")
            .setStyle(ButtonStyle.Primary);

        const deleteProposalButton = new ButtonBuilder()
            .setCustomId(`deleteProposal_${questionIndex}`)
            .setLabel("Supprimer une proposition")
            .setStyle(ButtonStyle.Danger);

        // Créer le bouton de retour
        const backButton = new ButtonBuilder()
            .setCustomId("backToMainMenu")
            .setLabel("Retour à la liste des questions")
            .setStyle(ButtonStyle.Secondary);

        // Créer le menu pour le choix multiple
        const multipleChoiceMenu = new StringSelectMenuBuilder()
            .setCustomId('questionMultipleChoiceMenu')
            .setPlaceholder("Choix multiple")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Oui")
                    .setValue('questionMultipleChoiceMenuYes')
                    .setDescription("Permettre la sélection de plusieurs réponses"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Non")
                    .setValue('questionMultipleChoiceMenuNo')
                    .setDescription("Limiter à une seule réponse")
            );

        // Créer les lignes pour les composants
        const actionRow1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(editQuestionButton, addProposalButton, editProposalButton, deleteProposalButton);

        const actionRow2 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(multipleChoiceMenu);

        const actionRow3 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(backButton);
            
        // Mettre à jour le message existant
        await interaction.deferUpdate();
        await interaction.editReply({
            content: `Question ${questionIndex + 1} avec proposition ajoutée`,
            embeds: [questionEmbed(question)],
            components: [actionRow1, actionRow2, actionRow3]
        });
        
        // Envoyer un message de confirmation qui sera supprimé après un certain temps
        const followUp = await interaction.followUp({
            content: `La proposition "${proposalText}" a été ajoutée avec succès !`,
            flags: MessageFlags.Ephemeral
        });
        
        setTimeout(async () => {
            await interaction.deleteReply(followUp);
        }, logMessageTimer);
    } catch (error) {
        console.error("Erreur lors de l'ajout d'une proposition:", error);
        
        // Vérifier si l'interaction a déjà été répondue
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: "Une erreur est survenue lors de l'ajout d'une proposition. Veuillez réessayer.",
                flags: MessageFlags.Ephemeral
            });
        } else {
            try {
                await interaction.followUp({
                    content: "Une erreur est survenue lors de l'ajout d'une proposition. Veuillez réessayer.",
                    flags: MessageFlags.Ephemeral
                });
            } catch (followUpError) {
                console.error("Erreur lors de l'envoi du followUp:", followUpError);
            }
        }
    }
} 