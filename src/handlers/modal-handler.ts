import { ModalSubmitInteraction } from "discord.js";
import { createPoll } from "./modals/create-poll";
import { addQuestion } from "./modals/add-question";
import { editPollTitle } from "./modals/edit-poll-title";
import { createPollTemplate } from "./modals/create-poll-template";
import { editQuestionText } from "./modals/edit-question-text";
import { addAnswer } from "./modals/add-answer";

export async function handleModal(interaction: ModalSubmitInteraction) {
    console.log(`Modal soumis avec customId: ${interaction.customId}`);
    
    if (interaction.customId === "createPollTitleModal") {
        console.log("Traitement du modal de création de sondage");
        await createPoll(interaction);
    } else if (interaction.customId === "createPollTemplateModal") {
        console.log("Traitement du modal de création de template de sondage");
        await createPollTemplate(interaction);
    } else if (interaction.customId === "addQuestionModal") {
        console.log("Traitement du modal d'ajout de question");
        await addQuestion(interaction);
    } else if (interaction.customId === "editPollTitleModal"){
        await editPollTitle(interaction);
    } else if (interaction.customId.startsWith("editQuestionTextModal_")) {
        console.log("Traitement du modal de modification de texte de question");
        await editQuestionText(interaction);
    } else if (interaction.customId.startsWith("addAnswerModal_")) {
        console.log("Traitement du modal d'ajout de réponse");
        await addAnswer(interaction);
    } else {
        console.log(`Modal non reconnu: ${interaction.customId}`);
    }
}