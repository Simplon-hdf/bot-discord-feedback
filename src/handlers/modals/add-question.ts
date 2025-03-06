import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollRow1 } from "../../utils/components";

export async function addQuestion(interaction: ModalSubmitInteraction) {
	try {
		// Récupérer le contenu de la question depuis le modal
		const questionContent = interaction.fields.getTextInputValue("questionContent");

		// Récupérer le message original
		let message = interaction.message;
		if (!message) {
			await interaction.reply({
				content: "Erreur: Message introuvable. Recommencez le questionnaire depuis le début.",
				flags: MessageFlags.Ephemeral
			});
			return;
		}
		// Récupérer l'embed existant et mettre à jour la description
		const embed = EmbedBuilder.from(message.embeds[0]);
		const currentDescription = embed.data.description || "Aucune question";

		// Ajouter la nouvelle question à la description
		let updatedDescription;
		if (currentDescription === "Les questions" || currentDescription === "Aucune question" || currentDescription === "Aucune question n'a encore été ajoutée à ce sondage.") {
			updatedDescription = `**Question 1:** ${questionContent}`;
		} else {
			// Compter le nombre de questions existantes
			const questionMatches = currentDescription.match(/\*\*Question \d+:\*\*/g);
			const questionCount = questionMatches ? questionMatches.length : 0;
			updatedDescription = `${currentDescription}\n\n**Question ${questionCount + 1}:** ${questionContent}`;
		}

		embed.setDescription(updatedDescription);

		// S'assurer que le footer est présent
		if (!embed.data.footer) {
			embed.setFooter({
				text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
			});
		}

		// Mettre à jour le message existant
		await interaction.deferUpdate();
		await interaction.editReply({
			embeds: [embed],
			components: [pollRow1()],
		});

		const followUp = await interaction.followUp({
			content: "Question ajoutée avec succès !",
			flags: MessageFlags.Ephemeral
		})

		// Mettre à jour l'interaction avec un message de confirmation et les boutons originaux
		setTimeout(async () => {
			await interaction.deleteReply(followUp);
		}, logMessageTimer);

	} catch (error) {
		console.error("Erreur lors de l'ajout de question:", error);

		// Vérifier si l'interaction a déjà été répondue
		if (!interaction.replied && !interaction.deferred) {
			await interaction.reply({
				content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.",
				flags: MessageFlags.Ephemeral
			});
		} else {
			try {
				await interaction.followUp({
					content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.",
					flags: MessageFlags.Ephemeral
				});
			} catch (followUpError) {
				console.error("Erreur lors de l'envoi du followUp:", followUpError);
			}
		}
	}
} 