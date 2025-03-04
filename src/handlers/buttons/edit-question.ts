import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export async function editQuestion(interaction: ButtonInteraction) {
    // Récupérer le message original
    const message = interaction.message;
    if (!message) {
        await interaction.reply({ content: "Erreur: Message introuvable", ephemeral: true });
        return;
    }
    
    // Récupérer l'embed existant
    const embed = EmbedBuilder.from(message.embeds[0]);
    const description = embed.data.description || "";
    
    // Extraire les questions du message
    // Diviser par "\n\n" et filtrer pour trouver les lignes qui contiennent "**Question:**"
    const sections = description.split("\n\n");
    const questions = sections.filter(q => q.includes("**Question:**"));
    
    // Si aucune question n'est trouvée
    if (questions.length === 0) {
        await interaction.reply({ 
            content: "Aucune question à modifier. Veuillez d'abord ajouter une question au sondage.", 
            ephemeral: true 
        });
        return;
    }
    
    // Créer un menu déroulant pour sélectionner la question à modifier
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId("questionSelectMenu")
        .setPlaceholder("Sélectionnez une question à modifier");
    
    // Ajouter chaque question comme option
    questions.forEach((question, index) => {
        // Extraire le texte de la question (sans le préfixe "**Question:**")
        const questionText = question.replace("**Question:**", "").trim();
        // Limiter le texte à 100 caractères pour l'affichage
        const displayText = questionText.length > 95 
            ? questionText.substring(0, 95) + "..." 
            : questionText;
        
        selectMenu.addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel(`Question ${index + 1}`)
                .setDescription(displayText)
                .setValue(`question_${index}`)
        );
    });
    
    // Créer le bouton d'annulation
    const cancelButton = new ButtonBuilder()
        .setCustomId("cancelEditQuestion")
        .setLabel("Annuler")
        .setStyle(ButtonStyle.Secondary);
    
    // Créer les lignes pour les composants
    const selectRow = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(selectMenu);
    
    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(cancelButton);
    
    // Mettre à jour le message avec le menu de sélection
    await interaction.update({
        content: "Sélectionnez la question que vous souhaitez modifier :",
        embeds: [embed],
        components: [selectRow, buttonRow]
    });
} 