import { Client, Events, Interaction } from "discord.js";
import { handleCommand } from "../handlers/command-handler";
import { handleButton } from "../handlers/button-handler";
import { handleModal } from "../handlers/modal-handler";

export function registerInteractionEvent(client: Client) {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			await handleCommand(interaction);
		} else if (interaction.isButton()) {
			await handleButton(interaction);
		} else if (interaction.isModalSubmit()) {
			await handleModal(interaction);
		}
	});
}