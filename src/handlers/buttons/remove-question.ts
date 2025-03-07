import { ActionRowBuilder, ButtonInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed } from "../../utils/components";

export async function removeQuestion(interaction: ButtonInteraction) {
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

        console.log(`Questions trouvées pour la suppression: ${questions.length}`);

        // Vérifier s'il y a des questions à supprimer
        if (questions.length === 0) {
            await interaction.reply({
                content: "Aucune question à supprimer. Ajoutez d'abord des questions au sondage.",
                flags: MessageFlags.Ephemeral
            });
            setTimeout(async () => {
                await interaction.deleteReply();
            }, logMessageTimer);
            return;
        }

        // Créer les options du menu de sélection pour chaque question
        const options = questions.map((question, index) => {
            // Extraire le texte de la question (sans le numéro et le préfixe)
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
            .setCustomId("questionRemoveMenu")
            .setPlaceholder("Sélectionnez les questions à supprimer")
            .setMinValues(1)
            .setMaxValues(questions.length)
            .addOptions(options);

        // Créer la ligne pour le menu de sélection
        const actionRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(selectMenu);

        // Mettre à jour le message avec le menu de sélection
        await interaction.update({
            content: "Sélectionnez les questions à supprimer. La suppression sera effectuée immédiatement.",
            embeds: [pollEmbed(poll)],
            components: [actionRow]
        });
    } catch (error) {
        console.error("Erreur lors de la préparation de la suppression de questions:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la préparation de la suppression de questions. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 