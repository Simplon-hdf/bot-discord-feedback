import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction, MessageFlags } from "discord.js";

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
            await interaction.reply({ 
                content: "Erreur: ID du message introuvable. Veuillez réessayer en cliquant à nouveau sur le bouton d'ajout de question.", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Récupérer le canal
        const channel = interaction.channel;
        
        if (!channel) {
            await interaction.reply({ 
                content: "Erreur: Canal introuvable", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Récupérer le message original
        let message;
        try {
            message = await channel.messages.fetch(messageId);
            console.log(`Message trouvé avec l'ID: ${messageId}`);
        } catch (fetchError: any) {
            console.error(`Erreur lors de la récupération du message avec l'ID ${messageId}:`, fetchError);
            await interaction.reply({ 
                content: "Erreur: Le message original n'a pas pu être trouvé. Il a peut-être été supprimé ou déplacé.", 
                flags: MessageFlags.Ephemeral 
            });
            // Réinitialiser la variable globale
            global.lastMessageId = undefined;
            return;
        }
        
        // Vérifier si le message a des embeds
        if (!message || !message.embeds || message.embeds.length === 0) {
            await interaction.reply({ 
                content: "Erreur: Le message n'a pas d'embeds", 
                flags: MessageFlags.Ephemeral 
            });
            // Réinitialiser la variable globale
            global.lastMessageId = undefined;
            return;
        }
        
        // Récupérer l'embed existant et mettre à jour la description
        const embed = EmbedBuilder.from(message.embeds[0]);
        const currentDescription = embed.data.description || "Aucune question";
        
        // Ajouter la nouvelle question à la description
        let updatedDescription;
        if (currentDescription === "Les questions" || currentDescription === "Aucune question" || currentDescription === "Aucune question n'a encore été ajoutée à ce sondage.") {
            updatedDescription = `**Question 1:** ${questionContent}`;
        } else {
            // Compter le nombre de questions existantes
            const questionMatches = currentDescription.match(/\*\*Question \d+:\*\*/g);
            const questionCount = questionMatches ? questionMatches.length : 0;
            updatedDescription = `${currentDescription}\n\n**Question ${questionCount + 1}:** ${questionContent}`;
        }
        
        embed.setDescription(updatedDescription);
        
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
        
        try {
            // Mettre à jour le message existant avec un message de confirmation temporaire
            await message.edit({
                content: `✅ Question ajoutée avec succès !`,
                embeds: [embed],
                components: [row]
            });
            
            // Répondre à l'interaction de manière éphémère pour la fermer
            await interaction.deferUpdate();
            
            console.log(`Message mis à jour avec succès, ID: ${message.id}`);
            
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
        } catch (editError: any) {
            console.error("Erreur lors de la mise à jour du message:", editError);
            
            // Si nous ne pouvons pas modifier le message, créons-en un nouveau
            if ('send' in channel && message.author.id === interaction.client.user?.id) {
                try {
                    // Supprimer l'ancien message
                    await message.delete();
                    
                    // Créer un nouveau message
                    const newMessage = await channel.send({
                        embeds: [embed],
                        components: [row]
                    });
                    
                    console.log(`Nouveau message créé avec l'ID: ${newMessage.id}`);
                    
                    // Répondre à l'interaction de manière éphémère
                    await interaction.reply({
                        content: `Question ajoutée avec succès !`,
                        flags: MessageFlags.Ephemeral
                    });
                } catch (sendError) {
                    console.error("Erreur lors de la création d'un nouveau message:", sendError);
                    await interaction.reply({
                        content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.",
                        flags: MessageFlags.Ephemeral
                    });
                }
            } else {
                await interaction.reply({
                    content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.",
                    flags: MessageFlags.Ephemeral
                });
            }
        }
        
        // Réinitialiser la variable globale
        global.lastMessageId = undefined;
    } catch (error) {
        console.error("Erreur lors de l'ajout de question:", error);
        
        // Vérifier si l'interaction a déjà été répondue
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ 
                content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.", 
                flags: MessageFlags.Ephemeral 
            });
        } else {
            try {
                await interaction.followUp({ 
                    content: "Une erreur est survenue lors de l'ajout de la question. Veuillez réessayer.", 
                    flags: MessageFlags.Ephemeral 
                });
            } catch (followUpError) {
                console.error("Erreur lors de l'envoi du followUp:", followUpError);
            }
        }
        
        // Réinitialiser la variable globale
        global.lastMessageId = undefined;
    }
} 