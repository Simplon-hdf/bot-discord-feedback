import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";

export async function cancelEditQuestion(interaction: ButtonInteraction) {
    try {
        // Récupérer le message original
        const message = interaction.message;
        if (!message) {
            await interaction.reply({ 
                content: "Erreur: Message introuvable", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Récupérer l'embed existant
        const embed = EmbedBuilder.from(message.embeds[0]);
        
        // S'assurer que le footer est présent
        if (!embed.data.footer) {
            embed.setFooter({
                text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
            });
        }
        
        // Recréer les boutons originaux
        const addButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionAddButton")
            .setLabel("Ajouter une question")
            .setStyle(ButtonStyle.Primary);

        const editButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionEditButton")
            .setLabel("Modifier une question")
            .setStyle(ButtonStyle.Primary);

        const removeButton = new ButtonBuilder()
            .setCustomId("feedbackQuestionRemoveButton")
            .setLabel("Supprimer une ou plusieurs questions")
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(addButton, editButton, removeButton);
        
        // Mettre à jour le message avec un message de confirmation temporaire
        await interaction.update({ 
            content: "✅ Modification annulée.", 
            embeds: [embed],
            components: [row]
        });
        
        // Supprimer le message de confirmation après 3 secondes
        setTimeout(async () => {
            try {
                await message.edit({
                    content: null,
                    embeds: [embed],
                    components: [row]
                });
            } catch (error) {
                console.error("Erreur lors de la suppression du message de confirmation:", error);
            }
        }, 3000);
    } catch (error) {
        console.error("Erreur lors de l'annulation de la modification:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de l'annulation de la modification. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 