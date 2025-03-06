import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, ModalSubmitInteraction } from "discord.js";
import { pollRow1 } from "../../utils/components";

export async function createPoll(interaction: ModalSubmitInteraction) {
	const embed = new EmbedBuilder()
		.setTitle(`Titre : ${interaction.fields.getTextInputValue('pollTitle')}`)
		.setDescription(
			"Aucune question n'a encore été ajoutée à ce sondage."
		)
		.setFooter({
			text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
		});

	// Envoyer le sondage comme un message éphémère dans le canal
	await interaction.reply({
		embeds: [embed],
		components: [pollRow1()],
		flags: MessageFlags.Ephemeral
	});
}