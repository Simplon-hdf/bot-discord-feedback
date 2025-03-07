import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, MessageFlags, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed, pollRows } from "../../utils/components";
import { logMessageTimer } from "../../utils/timer";

export async function backToQuestionList(interaction: ButtonInteraction) {
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

        // Vérifier s'il y a des questions
        if (questions.length === 0) {
            await interaction.reply({
                content: "Aucune question à modifier. Ajoutez d'abord des questions au sondage.",
                flags: MessageFlags.Ephemeral
            });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, logMessageTimer);
            return;
        }

        // Créer les options du menu de sélection pour chaque question
        const options = questions.map((question, index) => {
            // Extraire le texte de la question
            const questionText = question.content;
            // Limiter la longueur du texte pour l'option
            const shortText = questionText.length > 100 ? questionText.substring(0, 97) + "..." : questionText;

            return new StringSelectMenuOptionBuilder()
                .setLabel(`Question ${index + 1}`)
                .setDescription(shortText)
                .setValue(`question_${index}`);
        });

        // Créer le menu de sélection
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("questionSelectMenu")
            .setPlaceholder("Sélectionnez une question à modifier")
            .addOptions(options);

        // Créer le bouton de retour au menu principal
        const backToMainButton = new ButtonBuilder()
            .setCustomId("backToMainMenuButton")
            .setLabel("Retour au menu principal")
            .setStyle(ButtonStyle.Secondary);

        // Créer les lignes pour les composants
        const actionRow1 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(selectMenu);

        const actionRow2 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(backToMainButton);

        // Mettre à jour le message avec le menu de sélection de questions
        await interaction.update({
            content: "Sélectionnez une question à modifier :",
            embeds: [pollEmbed(poll)],
            components: [actionRow1, actionRow2]
        });
        
        // Envoyer un message de confirmation qui sera supprimé après un certain temps
        const followUp = await interaction.followUp({
            content: "Vous êtes revenu à la liste des questions à modifier.",
            flags: MessageFlags.Ephemeral
        });
        
        setTimeout(async () => {
            await interaction.deleteReply(followUp);
        }, logMessageTimer);
    } catch (error) {
        console.error("Erreur lors du retour à la liste des questions:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors du retour à la liste des questions. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 