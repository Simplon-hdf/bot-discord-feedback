import { StringSelectMenuInteraction, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";

export async function questionRemove(interaction: StringSelectMenuInteraction) {
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

        // Récupérer les valeurs sélectionnées
        const selectedValues = interaction.values.map(value => parseInt(value.replace("question_", "")));

        // Stocker les questions sélectionnées dans la variable globale
        poll.selectedQuestions = selectedValues;
        interaction.deferUpdate();
        console.log(`Questions sélectionnées pour la suppression: ${selectedValues.join(", ")}`);

    } catch (error) {
        console.error("Erreur lors de la sélection des questions à supprimer:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la sélection des questions. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 