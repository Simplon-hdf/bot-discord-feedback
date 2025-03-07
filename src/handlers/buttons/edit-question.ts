import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed } from "../../utils/components";

export async function editQuestion(interaction: ButtonInteraction) {
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

        console.log(`Questions trouvées: ${questions.length}`);

        // Si aucune question n'est trouvée
        if (questions.length === 0) {
            await interaction.reply({
                content: "Aucune question à modifier. Veuillez d'abord ajouter une question au sondage.",
                flags: MessageFlags.Ephemeral
            });

            setTimeout(async () => {
                await interaction.deleteReply();
            }, logMessageTimer);
            return;
        }

        // Créer un menu déroulant pour sélectionner la question à modifier
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("questionSelectMenu")
            .setPlaceholder("Sélectionnez une question à modifier");

        // Ajouter chaque question comme option
        questions.forEach((question, index) => {
            selectMenu.addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel(`Question ${index + 1}`)
                    .setDescription(question.content)
                    .setValue(`question_${index}`)
            );
        });

        // Créer le bouton d'annulation
        const cancelButton = new ButtonBuilder()
            .setCustomId("cancelEditQuestion")
            .setLabel("Annuler")
            .setStyle(ButtonStyle.Secondary);

        // Créer les lignes pour les composants
        const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(selectMenu);

        const buttonRow = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(cancelButton);

        // Mettre à jour le message avec le menu de sélection
        await interaction.update({
            content: "Sélectionnez la question que vous souhaitez modifier :",
            embeds: [pollEmbed(poll)],
            components: [selectRow, buttonRow]
        });
    } catch (error) {
        console.error("Erreur lors de l'édition de question:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la modification de la question. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 