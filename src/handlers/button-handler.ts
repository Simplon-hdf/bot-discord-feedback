import { ButtonInteraction, MessageFlags } from "discord.js";
import { createPoll } from "./buttons/create-poll";
import { addQuestion } from "./buttons/add-question";
import { editQuestion } from "./buttons/edit-question";
import { cancelEditQuestion } from "./buttons/cancel-edit-question";

export async function handleButton(interaction: ButtonInteraction) {
	if (interaction.customId === "feedbackCreateButton") {
		await createPoll(interaction);
	} else if (interaction.customId === "feedbackQuestionAddButton") {
		await addQuestion(interaction);
	} else if (interaction.customId === "feedbackQuestionEditButton") {
		await editQuestion(interaction);
	} else if (interaction.customId === "cancelEditQuestion") {
		await cancelEditQuestion(interaction);
	} else if (interaction.customId === "feedbackQuestionRemoveButton") {
		// Gérer la suppression de questions (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité de suppression de questions en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId === "confirmDeleteQuestions") {
		// Gérer la confirmation de suppression (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité de confirmation de suppression en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId === "cancelDeleteQuestions") {
		// Gérer l'annulation de suppression (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité d'annulation de suppression en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("editQuestionText_")) {
		// Gérer la modification du texte de la question (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité de modification du texte en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("addProposal_")) {
		// Gérer l'ajout d'une proposition (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité d'ajout de proposition en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("editProposal_")) {
		// Gérer la modification d'une proposition (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité de modification de proposition en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("deleteProposal_")) {
		// Gérer la suppression d'une proposition (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité de suppression de proposition en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("saveQuestion_")) {
		// Gérer l'enregistrement de la question (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Fonctionnalité d'enregistrement en cours d'implémentation", 
			flags: MessageFlags.Ephemeral 
		});
	} else if (interaction.customId.startsWith("cancelEdit_")) {
		// Gérer l'annulation de la modification (sera implémenté plus tard)
		await interaction.reply({ 
			content: "Modification annulée", 
			flags: MessageFlags.Ephemeral 
		});
	}
}