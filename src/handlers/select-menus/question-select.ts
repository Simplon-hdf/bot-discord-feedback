import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";
import { questionEmbed, pollEmbed, pollRows } from "../../utils/components";

export async function questionSelect(interaction: StringSelectMenuInteraction) {
    try {

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

        const questions = poll.questions;

        // Récupérer l'index de la question sélectionnée
        const selectedValue = interaction.values[0];
        const questionIndex = parseInt(selectedValue.replace("question_", ""));

        console.log(`Questions trouvées pour la sélection: ${questions.length}, index sélectionné: ${questionIndex}`);

        // Vérifier que l'index est valide
        if (questionIndex < 0 || questionIndex >= questions.length) {
            await interaction.reply({
                content: "Erreur: Question introuvable",
                flags: MessageFlags.Ephemeral
            });
            return;
        }

        // Récupérer la question sélectionnée
        const selectedQuestion = questions[questionIndex];

        console.log(`Question sélectionnée: ${selectedQuestion.content}`);

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

        // Mettre à jour le message avec les options de modification
        await interaction.update({
            content: `Modification de la question ${questionIndex + 1} : ${selectedQuestion.content}`,
            embeds: [questionEmbed(selectedQuestion)],
            components: [actionRow1, actionRow2, actionRow3]
        });
    } catch (error) {
        console.error("Erreur lors de la sélection de question:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la sélection de la question. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 