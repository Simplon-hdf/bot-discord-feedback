import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, ModalSubmitInteraction } from "discord.js";

export async function createPoll(interaction: ModalSubmitInteraction) {
    const embed = new EmbedBuilder()
        .setTitle(`Titre : ${interaction.fields.getTextInputValue('pollTitle')}`)
        .setDescription(
            "Les questions"
        );

    const button1 = new ButtonBuilder()
        .setCustomId("feedbackQuestionAddButton")
        .setLabel("Ajouter une question")
        .setStyle(ButtonStyle.Primary);

    const button2 = new ButtonBuilder()
        .setCustomId("feedbackQuestionEditButton")
        .setLabel("Modifier une question")
        .setStyle(ButtonStyle.Primary);

    const button3 = new ButtonBuilder()
        .setCustomId("feedbackQuestionRemoveButton")
        .setLabel("Supprimer une ou plusieurs questions")
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button1, button2, button3);

    await interaction.reply({
        embeds: [embed],
        components: [row],
        flags: MessageFlags.Ephemeral,
    });
}