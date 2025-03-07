import { StringSelectMenuInteraction, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";
import { pollEmbed, pollRows } from "../../utils/components";

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
        
        // Trier les indices en ordre décroissant pour éviter les problèmes lors de la suppression
        selectedValues.sort((a, b) => b - a);
        
        // Supprimer les questions sélectionnées
        for (const index of selectedValues) {
            if (index >= 0 && index < poll.questions.length) {
                poll.questions.splice(index, 1);
            }
        }
        
        console.log(`Questions supprimées: ${selectedValues.join(", ")}`);
        
        // Mettre à jour le message avec le sondage mis à jour
        await interaction.update({
            content: `${selectedValues.length} question(s) supprimée(s) avec succès.`,
            embeds: [pollEmbed(poll)],
            components: pollRows()
        });
        
        // Envoyer un message de confirmation qui sera supprimé après un certain temps
        const followUp = await interaction.followUp({
            content: `${selectedValues.length} question(s) supprimée(s) avec succès.`,
            flags: MessageFlags.Ephemeral
        });
        
        setTimeout(async () => {
            await interaction.deleteReply(followUp);
        }, logMessageTimer);
    } catch (error) {
        console.error("Erreur lors de la suppression des questions:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors de la suppression des questions. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 