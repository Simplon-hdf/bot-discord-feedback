import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction } from "discord.js";

// Déclarer le type pour la variable globale
declare global {
    var lastMessageId: string | undefined;
}

export async function addQuestion(interaction: ModalSubmitInteraction) {
    try {
        // Récupérer le contenu de la question depuis le modal
        const questionContent = interaction.fields.getTextInputValue("questionContent");
        
        // Récupérer l'ID du message depuis la variable globale
        const messageId = global.lastMessageId;
        
        if (!messageId) {
            await interaction.reply({ content: "Erreur: ID du message introuvable", ephemeral: true });
            return;
        }
        
        // Récupérer le canal
        const channel = interaction.channel;
        
        if (!channel) {
            await interaction.reply({ content: "Erreur: Canal introuvable", ephemeral: true });
            return;
        }
        
        // Récupérer le message original
        let message;
        try {
            message = await channel.messages.fetch(messageId);
        } catch (fetchError: any) {
            await interaction.reply({ 
                content: "Erreur lors de la récupération du message. Veuillez réessayer.", 
                ephemeral: true 
            });
            return;
        }
        
        // Vérifier si le message a des embeds
        if (!message || !message.embeds || message.embeds.length === 0) {
            await interaction.reply({ content: "Erreur: Le message n'a pas d'embeds", ephemeral: true });
            return;
        }
        
        // Récupérer l'embed existant et mettre à jour la description
        const embed = EmbedBuilder.from(message.embeds[0]);
        const currentDescription = embed.data.description || "Aucune question";
        
        // Ajouter la nouvelle question à la description
        const updatedDescription = `${currentDescription}\n\n**Question:** ${questionContent}`;
        embed.setDescription(updatedDescription);
        
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
        
        // Répondre à l'interaction et mettre à jour le message original
        try {
            // Répondre à l'interaction de manière éphémère
            await interaction.reply({
                content: `Question ajoutée : ${questionContent}`,
                ephemeral: true
            });
            
            // Supprimer le message original et en créer un nouveau au même endroit
            await message.delete();
            
            // Envoyer un nouveau message dans le même canal
            if ('send' in channel) {
                await channel.send({
                    embeds: [embed],
                    components: [row]
                });
            } else {
                // Fallback si le canal ne supporte pas la méthode send
                await interaction.followUp({
                    embeds: [embed],
                    components: [row],
                    ephemeral: false
                });
            }
        } catch (error: any) {
            await interaction.reply({ 
                content: "Erreur lors de la mise à jour du message. Veuillez réessayer.", 
                ephemeral: true 
            });
            return;
        }
        
        // Réinitialiser la variable globale
        global.lastMessageId = undefined;
    } catch (error: any) {
        await interaction.reply({ 
            content: "Une erreur est survenue. Veuillez réessayer.", 
            ephemeral: true 
        });
        
        // Réinitialiser la variable globale en cas d'erreur
        global.lastMessageId = undefined;
    }
} 