import { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder } from "discord.js";
import { Poll } from "../models/poll";
import { Question } from "../models/question";

function durationToString(duration: number): string {
	if (duration < 1) return `${duration * 60} minutes`;
	else if (duration > 24) return `${duration / 24} ${duration / 24} jours`;
	else return `${duration} ${duration === 1 ? "heure" : "heures"}`;
}

export function pollEmbed(poll: Poll): EmbedBuilder {
	const embed = new EmbedBuilder()
		.setTitle(`Titre : ${poll.title}`)
		.setDescription(
			`**Auteur** : <@${poll.uuidAuthor}>` +
			`\n**Anonyme** : ${poll.isAnonymous ? "Oui" : "Non"}` +
			`\n**Durée** : ${durationToString(poll.duration)}`
		)
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

export function pollRows(): ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] {
	return [pollRow1(), pollRow2(), pollRow3()];
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

export function pollRow2(): ActionRowBuilder<ButtonBuilder> {
	// const isAnonymousMenu = new StringSelectMenuBuilder()
	// 	.setCustomId("feedbackAnonymousMenu")
	// 	.setPlaceholder("Anonyme ?")
	// 	.addOptions([
	// 		{ label: "Oui", value: "true" },
	// 		{ label: "Non", value: "false" }
	// 	]);

	// const durationMenu = new StringSelectMenuBuilder()
	// 	.setCustomId("feedbackDurationMenu")
	// 	.setPlaceholder("Durée")
	// 	.addOptions([
	// 		{ label: "1 heure", value: "1" },
	// 		{ label: "2 heures", value: "2" },
	// 		{ label: "4 heures", value: "4" },
	// 		{ label: "8 heures", value: "8" },
	// 		{ label: "24 heures", value: "24" },
	// 	]);
	
	const editTitleButton = new ButtonBuilder()
		.setCustomId("feedbackEditTitleButton")
		.setLabel("Modifier le titre du questionnaire")
		.setStyle(ButtonStyle.Primary);

	const isAnonymousButton = new ButtonBuilder()
		.setCustomId("feedbackAnonymousButton")
		.setLabel("Changer l'anonymat")
		.setStyle(ButtonStyle.Primary);

	const durationButton = new ButtonBuilder()
		.setCustomId("feedbackDurationButton")
		.setLabel("Changer la durée")
		.setStyle(ButtonStyle.Primary);

	return new ActionRowBuilder<ButtonBuilder>().addComponents(editTitleButton, isAnonymousButton, durationButton);
}

export function pollRow3(): ActionRowBuilder<ButtonBuilder> {
	const saveTemplateButton = new ButtonBuilder()
		.setCustomId("saveTemplateButton")
		.setLabel("Enregistrer le modèle")
		.setStyle(ButtonStyle.Success);

	return new ActionRowBuilder<ButtonBuilder>().addComponents(saveTemplateButton);
}