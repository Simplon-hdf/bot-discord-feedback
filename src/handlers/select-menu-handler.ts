import { MessageFlags, StringSelectMenuInteraction } from "discord.js";
import { questionSelect } from "./select-menus/question-select";
import { questionRemove } from "./select-menus/question-remove";

export async function handleSelectMenu(interaction: StringSelectMenuInteraction) {
    if (interaction.customId === "questionSelectMenu") {
        await questionSelect(interaction);
    } else if (interaction.customId === "questionRemoveMenu") {
        await questionRemove(interaction);
    } else if (interaction.customId.startsWith("multipleChoice_")) {
        // Gérer le choix multiple (sera implémenté plus tard)
        // Récupérer le message original
        const message = interaction.message;
        if (!message) {
            await interaction.reply({ 
                content: "Erreur: Message introuvable", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Mettre à jour l'interaction avec un message temporaire
        await interaction.update({
            content: "✅ Préférence de choix multiple enregistrée",
            components: message.components
        });
        
        // Supprimer le message de confirmation après 3 secondes
        setTimeout(async () => {
            try {
                await interaction.editReply({
                    content: null,
                    components: message.components
                });
            } catch (error) {
                console.error("Erreur lors de la suppression du message de confirmation:", error);
            }
        }, 3000);
    }
} 