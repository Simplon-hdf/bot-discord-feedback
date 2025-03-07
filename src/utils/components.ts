import { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } from "discord.js";
import { Poll } from "../models/poll";
import { Question } from "../models/question";

export function pollEmbed(poll: Poll): EmbedBuilder {
	const embed = new EmbedBuilder()
		.setTitle(`Titre : ${poll.title}`)
		.setFooter({
			text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
		});
	if (poll.questions.length === 0) {
		embed.addFields({ name: "⚠️ Aucune question ajoutée", value: "Ajoutez-en avec le bouton ci-dessous !" });
	} else {
		poll.questions.forEach((question, index) => {
			embed.addFields({ name: `Question ${index + 1}`, value: question.content, inline: false });
		});
	}
	return embed;
}

export function questionEmbed(question: Question): EmbedBuilder {
	const embed = new EmbedBuilder()
		.setTitle(`Question : ${question.content}`)
		.setFooter({
			text: "Utilisez les boutons ci-dessous pour gérer les propositions de la question"
		});
	if (question.answers.length === 0) {
		embed.addFields({ name: "⚠️ Aucune proposition ajoutée", value: "Ajoutez-en avec le bouton ci-dessous !" });
	} else {
		question.answers.forEach((answer, index) => {
			embed.addFields({ name: `Proposition ${index + 1}`, value: answer.content, inline: false });
		});
	}
	return embed;

}

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
	const editTitleButton = new ButtonBuilder()
		.setCustomId("feedbackEditTitleButton")
		.setLabel("Modifier le titre du questionnaire")
		.setStyle(ButtonStyle.Primary);

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

	return new ActionRowBuilder<ButtonBuilder>().addComponents(editTitleButton, addQuestionButton, editQuestionButton, removeQuestionButton);
}