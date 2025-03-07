import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from "discord.js";
import { initRow } from "../utils/components";

export const data = new SlashCommandBuilder()
	.setName("feedback-init")
	.setDescription("Envoie le message permettant la création d'un questionnaire.");

export async function execute(interaction: CommandInteraction) {
	// Répond à l'intéraction, et supprime aussitot la réponse
	// (on ne peut pas ne rien faire lors d'une intéraction, c'est une sorte de "hack")
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });
	await interaction.deleteReply();

	// Création de l'embed
	const embed = new EmbedBuilder()
		.setTitle("💬  Questionnaire")
		.setDescription(
			  "- **Créer un questionnaire**\n"
			+ "  Démarre la création d'un questionnaire\n\n"
			+ "- **Créer un modèle de questionnaire**\n"
			+ "  Démarre la création d'un modèle de questionnaire\n\n"
			+ "- **Modifier un modèle de questionnaire**\n"
			+ "  Démarre la modification d'un modèle de questionnaire"
		);

	

	// Envoi du message avec le bouton (sans la mention de la commande, en utilisant channel.send directement)
	const channel = interaction.channel;
	if (channel?.isSendable()) {
		await channel.send({ embeds: [embed], components: [initRow()] });
	}
}
