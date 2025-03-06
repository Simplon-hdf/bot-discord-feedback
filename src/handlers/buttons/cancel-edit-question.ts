import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollRow1 } from "../../utils/components";

export async function cancelEditQuestion(interaction: ButtonInteraction) {
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

		// S'assurer que le footer est présent
		if (!embed.data.footer) {
			embed.setFooter({
				text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
			});
		}

		

		// Mettre à jour le message avec un message de confirmation temporaire
		await interaction.update({
			content: null,
			embeds: [embed],
			components: [pollRow1()]
		});

	} catch (error) {
		console.error("Erreur lors de l'annulation de la modification:", error);
		await interaction.reply({
			content: "Une erreur est survenue lors de l'annulation de la modification. Veuillez réessayer.",
			flags: MessageFlags.Ephemeral
		});
	}
} 