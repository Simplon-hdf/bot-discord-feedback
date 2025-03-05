import { ModalSubmitInteraction } from "discord.js";
import { createPoll } from "./modals/create-poll";
import { addQuestion } from "./modals/add-question";

export async function handleModal(interaction: ModalSubmitInteraction) {
    console.log(`Modal soumis avec customId: ${interaction.customId}`);
    
    if (interaction.customId === "pollTitleModal") {
        console.log("Traitement du modal de création de sondage");
        await createPoll(interaction);
    } else if (interaction.customId === "addQuestionModal") {
        console.log("Traitement du modal d'ajout de question");
        console.log(`ID du message stocké: ${global.lastMessageId}`);
        await addQuestion(interaction);
    } else {
        console.log(`Modal non reconnu: ${interaction.customId}`);
    }
}