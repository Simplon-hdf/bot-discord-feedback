import { ButtonInteraction, EmbedBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollEmbed, pollRows } from "../../utils/components";
import { getPollObject, removePollQuestion } from "../../utils/poll-store";

export async function confirmRemoveQuestions(interaction: ButtonInteraction) {
	try {
		const poll = getPollObject(interaction.user.id);
		if (!poll) {
			await interaction.reply({
				content: "Impossible de trouver le sondage. Veuillez réessayer.",
				flags: MessageFlags.Ephemeral
			});
			setTimeout(async () => {
				await interaction.deleteReply();
			}, logMessageTimer);
			return;
		}
		
		// Vérifier si des questions ont été sélectionnées
		if (poll.selectedQuestions.length === 0) {
			await interaction.reply({
				content: "Aucune question n'a été sélectionnée pour la suppression. Veuillez d'abord sélectionner des questions.",
				flags: MessageFlags.Ephemeral
			});

			setTimeout(async () => {
				await interaction.deleteReply();
			}, logMessageTimer);

			return;
		}

		console.log(`Indices des questions à supprimer: ${poll.selectedQuestions.join(", ")}`);

		// Créer un message temporaire pour confirmer la suppression
		const confirmationMessage = `${poll.selectedQuestions.length} question(s) supprimée(s) avec succès.`;

		// Supprimer les questions sélectionnées
		removePollQuestion(poll);

		// Mettre à jour le message original
		await interaction.update({
			content: null,
			embeds: [pollEmbed(poll)],
			components: pollRows()
		});

		const followUp = await interaction.followUp({
			content: confirmationMessage,
			flags: MessageFlags.Ephemeral,
		})

		setTimeout(async () => {
			try {
				await interaction.deleteReply(followUp);
			}
			catch (error) {
				console.error("Erreur lors de la suppression du message de confirmation:", error);
			}
		}, logMessageTimer);
	} catch (error) {
		console.error("Erreur lors de la suppression des questions:", error);
		await interaction.reply({
			content: "Une erreur est survenue lors de la suppression des questions. Veuillez réessayer.",
			flags: MessageFlags.Ephemeral
		});
	}
} 