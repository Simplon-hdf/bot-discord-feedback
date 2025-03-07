import { StringSelectMenuInteraction } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed, pollRows } from "../../utils/components";

export async function pollDurationSelect(interaction: StringSelectMenuInteraction) {
    const poll = getPollObject(interaction.user.id);
    
    if (!poll) {
        await interaction.reply({
            content: "Erreur : Questionnaire non trouvé.",
            ephemeral: true
        });
        return;
    }
    
    // Mettre à jour la durée
    const duration = parseInt(interaction.values[0]);
    poll.duration = duration;
    
    // Mettre à jour le message avec les boutons originaux
    await interaction.update({
        content: `La durée du questionnaire a été définie sur : ${duration} ${duration === 1 ? "heure" : "heures"}`,
        embeds: [pollEmbed(poll)],
        components: pollRows()
    });
} 