import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";
import { pollEmbed, pollRows } from "../../utils/components";

export async function editPollTitle(interaction: ModalSubmitInteraction) {
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

    poll.title = interaction.fields.getTextInputValue("pollTitle");
    await interaction.deferUpdate();
    await interaction.editReply({
        embeds: [pollEmbed(poll)],
        components: pollRows(),
    });
}