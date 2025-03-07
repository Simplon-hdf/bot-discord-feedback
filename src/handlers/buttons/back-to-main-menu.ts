import { ButtonInteraction, MessageFlags } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed, pollRows } from "../../utils/components";
import { logMessageTimer } from "../../utils/timer";

export async function backToMainMenu(interaction: ButtonInteraction) {
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

        // Mettre à jour le message avec le menu principal
        await interaction.update({
            content: "Menu principal",
            embeds: [pollEmbed(poll)],
            components: pollRows()
        });
        
        // Envoyer un message de confirmation qui sera supprimé après un certain temps
        const followUp = await interaction.followUp({
            content: "Vous êtes revenu au menu principal.",
            flags: MessageFlags.Ephemeral
        });
        
        setTimeout(async () => {
            await interaction.deleteReply(followUp);
        }, logMessageTimer);
    } catch (error) {
        console.error("Erreur lors du retour au menu principal:", error);
        await interaction.reply({
            content: "Une erreur est survenue lors du retour au menu principal. Veuillez réessayer.",
            flags: MessageFlags.Ephemeral
        });
    }
} 