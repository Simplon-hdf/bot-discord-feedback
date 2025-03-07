import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { pollEmbed, pollRows, pollRow2 } from "../../utils/components";
import { createPollObject } from "../../utils/poll-store";

export async function createPoll(interaction: ModalSubmitInteraction) {

	const poll = createPollObject(interaction.user.id, interaction.fields.getTextInputValue('pollTitle'));

	// Envoyer le sondage comme un message éphémère dans le canal
	await interaction.reply({
		embeds: [pollEmbed(poll)],
		components: pollRows(),
		flags: MessageFlags.Ephemeral
	});
}