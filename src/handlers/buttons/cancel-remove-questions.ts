import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollRow1 } from "../../utils/components";

// Déclarer le type pour les variables globales
declare global {
	var selectedQuestionsToRemove: string[] | undefined;
}

export async function cancelRemoveQuestions(interaction: ButtonInteraction) {
	try {
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

		// Réinitialiser les variables globales
		global.selectedQuestionsToRemove = undefined;

		// Mettre à jour le message pour restaurer l'interface principale
		await interaction.update({
			content: null,
			embeds: [embed],
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