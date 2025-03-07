import { ButtonInteraction, MessageFlags } from "discord.js";
import { pollEmbed, initRow, pollRows } from "../../utils/components";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";

export async function editPollAnonymous(interaction: ButtonInteraction) {
    // Récupérer le sondage en cours d'édition
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

    // Inverser le statut d'anonymat du sondage
    poll.isAnonymous = !poll.isAnonymous;

    // Mettre à jour le message
    await interaction.update({
        embeds: [pollEmbed(poll)],
        components: pollRows()
    });
}