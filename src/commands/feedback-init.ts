import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, CommandInteraction, EmbedBuilder, MessageFlags, PartialTextBasedChannelFields, SlashCommandBuilder, TextChannel, VoiceChannel } from "discord.js";

export const data = new SlashCommandBuilder()
	.setName("feedback-init")
	.setDescription("Envoie le message permettant la création d'un sondage.");

export async function execute(interaction: CommandInteraction) {
	// Répond à l'intéraction, et supprime aussitot la réponse
	// (on ne peut pas ne rien faire lors d'une intéraction, c'est une sorte de "hack")
	await interaction.deferReply({ flags: MessageFlags.Ephemeral });
	await interaction.deleteReply();

	// Création de l'embed
	const embed = new EmbedBuilder()
		.setTitle("💬 Questionnaire")
		.setDescription("Cliquez sur le bouton ci-dessous pour créer un questionnaire.")

	// Création du bouton
	const button = new ButtonBuilder()
		.setCustomId("feedback_button")
		.setLabel("Donner un feedback")
		.setStyle(ButtonStyle.Primary);

	const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

	// Envoi du message avec le bouton (sans la mention de la commande, en utilisant channel.send directement)
	const channel = interaction.channel as PartialTextBasedChannelFields;
	await channel.send({ embeds: [embed], components: [row]});
}
