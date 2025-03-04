import { ButtonInteraction } from "discord.js";
import { createPoll } from "./buttons/create-poll";
import { addQuestion } from "./buttons/add-question";
import { editQuestion } from "./buttons/edit-question";

export async function handleButton(interaction: ButtonInteraction) {
	if (interaction.customId === "feedbackCreateButton") {
		await createPoll(interaction);
	} else if (interaction.customId === "feedbackQuestionAddButton") {
		await addQuestion(interaction);
	} else if (interaction.customId === "feedbackQuestionEditButton") {
		await editQuestion(interaction);
	} else if (interaction.customId.startsWith("editQuestionText_")) {
		// Gérer la modification du texte de la question (sera implémenté plus tard)
		await interaction.reply({ content: "Fonctionnalité de modification du texte en cours d'implémentation", ephemeral: true });
	} else if (interaction.customId.startsWith("addProposal_")) {
		// Gérer l'ajout d'une proposition (sera implémenté plus tard)
		await interaction.reply({ content: "Fonctionnalité d'ajout de proposition en cours d'implémentation", ephemeral: true });
	} else if (interaction.customId.startsWith("editProposal_")) {
		// Gérer la modification d'une proposition (sera implémenté plus tard)
		await interaction.reply({ content: "Fonctionnalité de modification de proposition en cours d'implémentation", ephemeral: true });
	} else if (interaction.customId.startsWith("deleteProposal_")) {
		// Gérer la suppression d'une proposition (sera implémenté plus tard)
		await interaction.reply({ content: "Fonctionnalité de suppression de proposition en cours d'implémentation", ephemeral: true });
	} else if (interaction.customId.startsWith("saveQuestion_")) {
		// Gérer l'enregistrement de la question (sera implémenté plus tard)
		await interaction.reply({ content: "Fonctionnalité d'enregistrement en cours d'implémentation", ephemeral: true });
	} else if (interaction.customId.startsWith("cancelEdit_")) {
		// Gérer l'annulation de la modification (sera implémenté plus tard)
		await interaction.reply({ content: "Modification annulée", ephemeral: true });
	}
}