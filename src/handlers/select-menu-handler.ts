import { StringSelectMenuInteraction } from "discord.js";
import { questionSelect } from "./select-menus/question-select";
import { questionRemove } from "./select-menus/question-remove";
import { pollDurationSelect } from "./select-menus/poll-duration-select";

export async function handleSelectMenu(interaction: StringSelectMenuInteraction) {
    console.log(`Select menu soumis avec customId: ${interaction.customId}`);
    
    if (interaction.customId === "questionSelectMenu") {
        await questionSelect(interaction);
    } else if (interaction.customId === "questionRemoveMenu") {
        await questionRemove(interaction);
    } else if (interaction.customId === "questionMultipleChoiceMenu") {
        await interaction.deferUpdate();
    } else if (interaction.customId === "pollDurationSelect") {
        await pollDurationSelect(interaction);
    } else {
        console.log(`Select menu non reconnu: ${interaction.customId}`);
    }
} 