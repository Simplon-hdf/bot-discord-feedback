import { ActionRowBuilder, ButtonInteraction, MessageFlags, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { logMessageTimer } from "../../utils/timer";

export async function editPollTitle(interaction: ButtonInteraction) {

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

    const titleInput = new TextInputBuilder()
        .setLabel("Nouveau titre du questionnaire")
        .setCustomId("pollTitle")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50)
        .setValue(poll.title);

    const modalRow = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(titleInput);

    const modal = new ModalBuilder()
        .setCustomId("editPollTitleModal")
        .setTitle('Modifier le questionnaire')
        .addComponents(modalRow);

    await interaction.showModal(modal);
}