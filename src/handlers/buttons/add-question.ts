import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle, MessageFlags } from "discord.js";

// Déclarer le type pour la variable globale
declare global {
    var lastMessageId: string | undefined;
}

export async function addQuestion(interaction: ButtonInteraction) {
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
        
        // Stocker l'ID du message dans une variable globale temporaire
        global.lastMessageId = message.id;
        console.log(`ID du message stocké: ${message.id}`);
        
        // Créer un champ de texte pour la question
        const questionInput = new TextInputBuilder()
            .setCustomId("questionContent")
            .setLabel("Question")
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder("Entrez votre question ici")
            .setRequired(true)
            .setMaxLength(100);
        
        // Créer une ligne pour le champ de question
        const questionRow = new ActionRowBuilder<TextInputBuilder>()
            .addComponents(questionInput);
        
        // Créer la modale avec un customId simple
        const modal = new ModalBuilder()
            .setCustomId("addQuestionModal")
            .setTitle("Ajouter une question")
            .addComponents(questionRow);
        
        // Afficher la modale
        await interaction.showModal(modal);
    } catch (error) {
        console.error("Erreur lors de l'affichage du modal d'ajout de question:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de l'ouverture du formulaire d'ajout de question. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 