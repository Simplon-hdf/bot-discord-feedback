import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";

// Déclarer le type pour les variables globales
declare global {
    var lastMessageId: string | undefined;
}

export async function removeQuestion(interaction: ButtonInteraction) {
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
        const description = embed.data.description || "";
        
        // Extraire les questions du message
        const sections = description.split("\n\n");
        const questions = sections.filter(q => q.includes("**Question"));
        
        console.log(`Questions trouvées pour la suppression: ${questions.length}`);
        
        // Vérifier s'il y a des questions à supprimer
        if (questions.length === 0) {
            await interaction.reply({ 
                content: "Aucune question à supprimer. Ajoutez d'abord des questions au sondage.", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Créer les options du menu de sélection pour chaque question
        const options = questions.map((question, index) => {
            // Extraire le texte de la question (sans le numéro et le préfixe)
            const questionText = question.replace(/\*\*Question \d+\*\*: /, "").trim();
            // Limiter la longueur du texte pour l'option
            const shortText = questionText.length > 90 ? questionText.substring(0, 87) + "..." : questionText;
            
            return new StringSelectMenuOptionBuilder()
                .setLabel(`Question ${index + 1}`)
                .setDescription(shortText)
                .setValue(`question_${index}`);
        });
        
        // Créer le menu de sélection
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId("questionRemoveMenu")
            .setPlaceholder("Sélectionnez les questions à supprimer")
            .setMinValues(1)
            .setMaxValues(questions.length)
            .addOptions(options);
        
        // Créer les boutons de confirmation et d'annulation
        const confirmButton = new ButtonBuilder()
            .setCustomId("confirmRemoveQuestions")
            .setLabel("Confirmer la suppression")
            .setStyle(ButtonStyle.Danger);
        
        const cancelButton = new ButtonBuilder()
            .setCustomId("cancelRemoveQuestions")
            .setLabel("Annuler")
            .setStyle(ButtonStyle.Secondary);
        
        // Créer les lignes pour les composants
        const actionRow1 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(selectMenu);
        
        const actionRow2 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(confirmButton, cancelButton);
        
        // Stocker l'ID du message original dans une variable globale
        global.lastMessageId = message.id;
        console.log(`ID du message stocké pour suppression: ${message.id}`);
        
        // Mettre à jour le message avec les options de suppression
        await interaction.update({
            content: "Sélectionnez les questions à supprimer, puis cliquez sur 'Confirmer la suppression'",
            embeds: [embed],
            components: [actionRow1, actionRow2]
        });
    } catch (error) {
        console.error("Erreur lors de la préparation de la suppression de questions:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de la préparation de la suppression de questions. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 