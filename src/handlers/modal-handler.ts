import { ModalSubmitInteraction } from "discord.js";
import { createPoll } from "./modals/create-poll";
import { addQuestion } from "./modals/add-question";

export async function handleModal(interaction: ModalSubmitInteraction) {
    if (interaction.customId === "pollTitleModal") {
        await createPoll(interaction);
    } else if (interaction.customId === "addQuestionModal") {
        await addQuestion(interaction);
    }
}