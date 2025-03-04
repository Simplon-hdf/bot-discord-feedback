import { ActionRowBuilder, ButtonInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export async function editQuestion(interaction: ButtonInteraction) {
    // Récupérer le message original
    const message = interaction.message;
    if (!message) {
        await interaction.reply({ content: "Erreur: Message introuvable", ephemeral: true });
        return;
    }
    
    // Récupérer l'embed existant
    const embed = message.embeds[0];
    const description = embed.description || "";
    
    // Extraire les questions du message
    // Diviser par "\n\n" et filtrer pour trouver les lignes qui contiennent "**Question:**"
    const sections = description.split("\n\n");
    const questions = sections.filter(q => q.includes("**Question:**"));
    
    // Afficher des informations de débogage
    console.log("Description du message:", description);
    console.log("Sections trouvées:", sections);
    console.log("Questions trouvées:", questions);
    
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
    
    // Créer une ligne pour le menu déroulant
    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(selectMenu);
    
    // Répondre avec le menu de sélection
    await interaction.reply({
        content: "Sélectionnez la question que vous souhaitez modifier :",
        components: [row],
        ephemeral: true
    });
} 