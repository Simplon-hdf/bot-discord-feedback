import { StringSelectMenuInteraction } from "discord.js";
import { questionSelect } from "./select-menus/question-select";

export async function handleSelectMenu(interaction: StringSelectMenuInteraction) {
    if (interaction.customId === "questionSelectMenu") {
        await questionSelect(interaction);
    } else if (interaction.customId.startsWith("multipleChoice_")) {
        // Gérer le choix multiple (sera implémenté plus tard)
        await interaction.reply({ content: "Préférence de choix multiple enregistrée", ephemeral: true });
    }
} 