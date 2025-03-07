import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export async function createPollTemplate(interaction: ButtonInteraction) {
    const titleInput = new TextInputBuilder()
        .setLabel("Titre du modèle de questionnaire")
        .setCustomId("pollTemplateTitle")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(50);

    const modalRow = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(titleInput);

    const modal = new ModalBuilder()
        .setCustomId("createPollTemplateModal")
        .setTitle('Créer un modèle de questionnaire')
        .addComponents(modalRow);

    await interaction.showModal(modal);
} 