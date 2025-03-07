import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";
import { createPoll } from "./buttons/create-poll";
import { addQuestion } from "./buttons/add-question";
import { editQuestion } from "./buttons/edit-question";
import { removeQuestion } from "./buttons/remove-question";
import { editPollTitle } from "./buttons/edit-poll-title";
import { editPollAnonymous } from "./buttons/edit-poll-anonymous";
import { createPollTemplate } from "./buttons/create-poll-template";
import { saveTemplate } from "./buttons/save-template";
import { editPollDuration } from "./buttons/edit-poll-duration";
import { editQuestionText } from "./buttons/edit-question-text";
import { addAnswer } from "./buttons/add-answer";
import { backToQuestionList } from "./buttons/back-to-question-list";
import { backToMainMenu } from "./buttons/back-to-main-menu";

export async function handleButton(interaction: ButtonInteraction) {
	if (interaction.customId === "feedbackCreateButton") {
		await createPoll(interaction);
	} else if (interaction.customId === "feedbackTemplateCreateButton") {
		await createPollTemplate(interaction);
	} else if (interaction.customId === "feedbackQuestionAddButton") {
		await addQuestion(interaction);
	} else if (interaction.customId === "feedbackQuestionEditButton") {
		await editQuestion(interaction);
	} else if (interaction.customId === "feedbackQuestionRemoveButton") {
		await removeQuestion(interaction);
	} else if (interaction.customId === "feedbackEditTitleButton") {
		await editPollTitle(interaction);
	} else if (interaction.customId === "feedbackAnonymousButton") {
		await editPollAnonymous(interaction);
	} else if (interaction.customId === "feedbackDurationButton") {
		await editPollDuration(interaction);
	} else if (interaction.customId === "saveTemplateButton") {
		await saveTemplate(interaction);
	} else if (interaction.customId === "backToMainMenu") {
		await backToQuestionList(interaction);
	} else if (interaction.customId === "backToMainMenuButton") {
		await backToMainMenu(interaction);
	} else if (interaction.customId.startsWith("editQuestionText_")) {
		await editQuestionText(interaction);
	} else if (interaction.customId.startsWith("addAnswer_")) {
		await addAnswer(interaction);
	} else if (interaction.customId.startsWith("editAnswer_")) {
		// Gérer la modification d'une réponse (sera implémenté plus tard)
		await interaction.reply({
			content: "Fonctionnalité de modification de réponse en cours d'implémentation",
			flags: MessageFlags.Ephemeral
		});
	} else if (interaction.customId.startsWith("deleteAnswer_")) {
		// Gérer la suppression d'une réponse (sera implémenté plus tard)
		await interaction.reply({
			content: "Fonctionnalité de suppression de réponse en cours d'implémentation",
			flags: MessageFlags.Ephemeral
		});
	}
}