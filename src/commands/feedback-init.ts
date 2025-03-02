import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, CommandInteraction, EmbedBuilder, MessageFlags, PartialTextBasedChannelFields, SlashCommandBuilder, TextChannel, VoiceChannel } from "discord.js";

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

	// Création des bouton
	const button1 = new ButtonBuilder()
		.setCustomId("feedbackCreateButton")
		.setLabel("Créer un questionnaire")
		.setStyle(ButtonStyle.Primary);
	
	const button2 = new ButtonBuilder()
		.setCustomId("feedbackTemplateCreateButton")
		.setLabel("Créer un modèle de questionnaire")
		.setStyle(ButtonStyle.Primary);

	const button3 = new ButtonBuilder()
		.setCustomId("feedbackTemplateEditButton")
		.setLabel("Modifier un modèle de questionnaire")
		.setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button1, button2, button3);

	// Envoi du message avec le bouton (sans la mention de la commande, en utilisant channel.send directement)
	const channel = interaction.channel;
	if (channel?.isSendable()) {
		await channel.send({ embeds: [embed], components: [row] });
	}
}
