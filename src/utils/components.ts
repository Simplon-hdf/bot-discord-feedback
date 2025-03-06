import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export function initRow(): ActionRowBuilder<ButtonBuilder> {
	const createPollButton = new ButtonBuilder()
		.setCustomId("feedbackCreateButton")
		.setLabel("Créer un questionnaire")
		.setStyle(ButtonStyle.Primary);

	const createPollTemplateButton = new ButtonBuilder()
		.setCustomId("feedbackTemplateCreateButton")
		.setLabel("Créer un modèle de questionnaire")
		.setStyle(ButtonStyle.Primary);

	const editPollTemplateButton = new ButtonBuilder()
		.setCustomId("feedbackTemplateEditButton")
		.setLabel("Modifier un modèle de questionnaire")
		.setStyle(ButtonStyle.Primary);
	return new ActionRowBuilder<ButtonBuilder>().addComponents(createPollButton, createPollTemplateButton, editPollTemplateButton);;
}

export function pollRow1(): ActionRowBuilder<ButtonBuilder> {
	const addQuestionButton = new ButtonBuilder()
		.setCustomId("feedbackQuestionAddButton")
		.setLabel("Ajouter une question")
		.setStyle(ButtonStyle.Primary);

	const editQuestionButton = new ButtonBuilder()
		.setCustomId("feedbackQuestionEditButton")
		.setLabel("Modifier une question")
		.setStyle(ButtonStyle.Primary);

	const removeQuestionButton = new ButtonBuilder()
		.setCustomId("feedbackQuestionRemoveButton")
		.setLabel("Supprimer une ou plusieurs questions")
		.setStyle(ButtonStyle.Primary);
	return new ActionRowBuilder<ButtonBuilder>().addComponents(addQuestionButton, editQuestionButton, removeQuestionButton);
}