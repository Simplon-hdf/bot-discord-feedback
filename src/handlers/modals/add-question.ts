import { ModalSubmitInteraction, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollEmbed, pollRows } from "../../utils/components";
import { addPollQuestion, getPollObject } from "../../utils/poll-store";

export async function addQuestion(interaction: ModalSubmitInteraction) {
	try {
		// Récupérer le contenu de la question depuis le modal
		const questionContent = interaction.fields.getTextInputValue("questionContent");

		const poll = getPollObject(interaction.user.id);
		if (poll) {
			addPollQuestion(poll, questionContent);
		} else {
			await interaction.reply({
				content: "Impossible de trouver le sondage. Veuillez réessayer.",
				flags: MessageFlags.Ephemeral
			});
			setTimeout(async () => {
				await interaction.deleteReply();
			}, logMessageTimer);
			return;
		}

		// Mettre à jour le message existant
		await interaction.deferUpdate();
		await interaction.editReply({
			embeds: [pollEmbed(poll)],
			components: pollRows(),
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