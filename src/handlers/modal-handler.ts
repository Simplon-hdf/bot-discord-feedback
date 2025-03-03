import { ModalSubmitInteraction } from "discord.js";
import { createPoll } from "./modals/create-poll";

export async function handleModal(interaction: ModalSubmitInteraction) {
    if (interaction.customId === "pollTitleModal") {
        createPoll(interaction);
    }
}