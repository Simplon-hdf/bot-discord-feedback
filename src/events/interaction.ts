import { Client, Events, Interaction, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { handleCommand } from "../handlers/command-handler";

export function registerInteractionEvent(client: Client) {
	client.on(Events.InteractionCreate, async (interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			await handleCommand(interaction);
		} else if (interaction.isButton()) {
			if (interaction.customId === "feedback_button") {
				
			}
		}
	});
}
