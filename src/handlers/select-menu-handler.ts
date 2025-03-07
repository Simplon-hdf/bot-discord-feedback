import { StringSelectMenuInteraction } from "discord.js";
import { questionSelect } from "./select-menus/question-select";
import { questionRemove } from "./select-menus/question-remove";

export async function handleSelectMenu(interaction: StringSelectMenuInteraction) {
    if (interaction.customId === "questionSelectMenu") {
        await questionSelect(interaction);
    } else if (interaction.customId === "questionRemoveMenu") {
        await questionRemove(interaction);
    } else if (interaction.customId === "questionMultipleChoiceMenu") {
        await interaction.deferUpdate();
    }
} 