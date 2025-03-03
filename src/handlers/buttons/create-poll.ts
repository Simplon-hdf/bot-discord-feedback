import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export async function createPoll(interaction: ButtonInteraction) {
    const titleInput = new TextInputBuilder()
        .setLabel("Titre du sondage")
        .setCustomId("pollTitle")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50);

    const modalRow = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(titleInput);

    const modal = new ModalBuilder()
        .setCustomId("pollTitleModal")
        .setTitle('Titre du questionnaire')
        .addComponents(modalRow);

    await interaction.showModal(modal);
}