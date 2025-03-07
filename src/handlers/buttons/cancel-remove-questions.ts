import { ButtonInteraction, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollEmbed, pollRow1 } from "../../utils/components";
import { getPollObject } from "../../utils/poll-store";

export async function cancelRemoveQuestions(interaction: ButtonInteraction) {
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
		// Réinitialiser les variables globales
		poll.selectedQuestions.length = 0;

		// Mettre à jour le message pour restaurer l'interface principale
		await interaction.update({
			content: null,
			embeds: [pollEmbed(poll)],
			components: [pollRow1()]
		});

	} catch (error) {
		console.error("Erreur lors de l'annulation de la suppression de questions:", error);
		await interaction.reply({
			content: "Une erreur est survenue lors de l'annulation de la suppression. Veuillez réessayer.",
			flags: MessageFlags.Ephemeral
		});
	}
} 