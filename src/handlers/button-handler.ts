import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";
import { createPoll } from "./buttons/create-poll";
import { addQuestion } from "./buttons/add-question";
import { editQuestion } from "./buttons/edit-question";
import { cancelEditQuestion } from "./buttons/cancel-edit-question";
import { removeQuestion } from "./buttons/remove-question";
import { confirmRemoveQuestions } from "./buttons/confirm-remove-questions";
import { cancelRemoveQuestions } from "./buttons/cancel-remove-questions";

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
		await removeQuestion(interaction);
	} else if (interaction.customId === "confirmRemoveQuestions") {
		await confirmRemoveQuestions(interaction);
	} else if (interaction.customId === "cancelRemoveQuestions") {
		await cancelRemoveQuestions(interaction);
	} else if (interaction.customId === "confirmDeleteQuestions") {
		// Gérer la confirmation de suppression (sera implémenté plus tard)
		// Récupérer le message original
		const message = interaction.message;
		if (!message) {
			await interaction.reply({ 
				content: "Erreur: Message introuvable", 
				flags: MessageFlags.Ephemeral 
			});
			return;
		}
		
		// Récupérer l'embed existant
		const embed = EmbedBuilder.from(message.embeds[0]);
		
		// Recréer les boutons originaux
		const addButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionAddButton")
			.setLabel("Ajouter une question")
			.setStyle(ButtonStyle.Primary);

		const editButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionEditButton")
			.setLabel("Modifier une question")
			.setStyle(ButtonStyle.Primary);

		const removeButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionRemoveButton")
			.setLabel("Supprimer une ou plusieurs questions")
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(addButton, editButton, removeButton);
		
		// Mettre à jour l'interaction avec un message temporaire
		await interaction.update({
			content: "⚠️ Fonctionnalité de confirmation de suppression en cours d'implémentation",
			embeds: [embed],
			components: [row]
		});
		
		// Supprimer le message de confirmation après 3 secondes
		setTimeout(async () => {
			try {
				await interaction.editReply({
					content: null,
					embeds: [embed],
					components: [row]
				});
			} catch (error) {
				console.error("Erreur lors de la suppression du message de confirmation:", error);
			}
		}, 3000);
	} else if (interaction.customId === "cancelDeleteQuestions") {
		// Gérer l'annulation de suppression (sera implémenté plus tard)
		// Récupérer le message original
		const message = interaction.message;
		if (!message) {
			await interaction.reply({ 
				content: "Erreur: Message introuvable", 
				flags: MessageFlags.Ephemeral 
			});
			return;
		}
		
		// Récupérer l'embed existant
		const embed = EmbedBuilder.from(message.embeds[0]);
		
		// Recréer les boutons originaux
		const addButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionAddButton")
			.setLabel("Ajouter une question")
			.setStyle(ButtonStyle.Primary);

		const editButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionEditButton")
			.setLabel("Modifier une question")
			.setStyle(ButtonStyle.Primary);

		const removeButton = new ButtonBuilder()
			.setCustomId("feedbackQuestionRemoveButton")
			.setLabel("Supprimer une ou plusieurs questions")
			.setStyle(ButtonStyle.Primary);

		const row = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(addButton, editButton, removeButton);
		
		// Mettre à jour l'interaction avec un message temporaire
		await interaction.update({
			content: "⚠️ Fonctionnalité d'annulation de suppression en cours d'implémentation",
			embeds: [embed],
			components: [row]
		});
		
		// Supprimer le message de confirmation après 3 secondes
		setTimeout(async () => {
			try {
				await interaction.editReply({
					content: null,
					embeds: [embed],
					components: [row]
				});
			} catch (error) {
				console.error("Erreur lors de la suppression du message de confirmation:", error);
			}
		}, 3000);
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