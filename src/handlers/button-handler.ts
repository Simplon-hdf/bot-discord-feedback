import { ButtonInteraction } from "discord.js";
import { createPoll } from "./buttons/create-poll";

export async function handleButton(interaction: ButtonInteraction) {
	if (interaction.customId === "feedbackCreateButton") {
		await createPoll(interaction);
	}
}