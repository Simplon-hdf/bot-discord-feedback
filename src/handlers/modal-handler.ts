import { ModalSubmitInteraction } from "discord.js";
import { createPoll } from "./modals/create-poll";
import { addQuestion } from "./modals/add-question";
import { editPollTitle } from "./modals/edit-poll-title";

export async function handleModal(interaction: ModalSubmitInteraction) {
    console.log(`Modal soumis avec customId: ${interaction.customId}`);
    
    if (interaction.customId === "createPollTitleModal") {
        console.log("Traitement du modal de création de sondage");
        await createPoll(interaction);
    } else if (interaction.customId === "addQuestionModal") {
        console.log("Traitement du modal d'ajout de question");
        await addQuestion(interaction);
    } else if (interaction.customId === "editPollTitleModal"){
        await editPollTitle(interaction);
    } else {
        console.log(`Modal non reconnu: ${interaction.customId}`);
    }
}