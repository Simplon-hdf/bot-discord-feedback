import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuInteraction, StringSelectMenuOptionBuilder, MessageFlags } from "discord.js";

export async function questionSelect(interaction: StringSelectMenuInteraction) {
    try {
        // Récupérer l'index de la question sélectionnée
        const selectedValue = interaction.values[0];
        const questionIndex = parseInt(selectedValue.replace("question_", ""));
        
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
        
        console.log(`Questions trouvées pour la sélection: ${questions.length}, index sélectionné: ${questionIndex}`);
        
        // Vérifier que l'index est valide
        if (questionIndex < 0 || questionIndex >= questions.length) {
            await interaction.reply({ 
                content: "Erreur: Question introuvable", 
                flags: MessageFlags.Ephemeral 
            });
            return;
        }
        
        // Récupérer la question sélectionnée
        const selectedQuestion = questions[questionIndex];
        const questionText = selectedQuestion.replace(/\*\*Question \d+:\*\*/, "").trim();
        
        console.log(`Question sélectionnée: ${questionText}`);
        
        // Créer les boutons pour les actions sur la question
        const editQuestionButton = new ButtonBuilder()
            .setCustomId(`editQuestionText_${questionIndex}`)
            .setLabel("Modifier la question")
            .setStyle(ButtonStyle.Primary);
        
        const addProposalButton = new ButtonBuilder()
            .setCustomId(`addProposal_${questionIndex}`)
            .setLabel("Ajouter une proposition")
            .setStyle(ButtonStyle.Primary);
        
        const editProposalButton = new ButtonBuilder()
            .setCustomId(`editProposal_${questionIndex}`)
            .setLabel("Modifier une proposition")
            .setStyle(ButtonStyle.Primary);
        
        const deleteProposalButton = new ButtonBuilder()
            .setCustomId(`deleteProposal_${questionIndex}`)
            .setLabel("Supprimer une proposition")
            .setStyle(ButtonStyle.Danger);
        
        // Créer le menu pour le choix multiple
        const multipleChoiceMenu = new StringSelectMenuBuilder()
            .setCustomId(`multipleChoice_${questionIndex}`)
            .setPlaceholder("Choix multiple")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Oui")
                    .setValue(`multipleChoice_yes_${questionIndex}`)
                    .setDescription("Permettre la sélection de plusieurs réponses"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("Non")
                    .setValue(`multipleChoice_no_${questionIndex}`)
                    .setDescription("Limiter à une seule réponse")
            );
        
        // Créer les boutons pour enregistrer ou annuler
        const saveButton = new ButtonBuilder()
            .setCustomId(`saveQuestion_${questionIndex}`)
            .setLabel("Enregistrer la question")
            .setStyle(ButtonStyle.Success);
        
        const cancelButton = new ButtonBuilder()
            .setCustomId("cancelEditQuestion")
            .setLabel("Annuler")
            .setStyle(ButtonStyle.Secondary);
        
        // Créer les lignes pour les composants
        const actionRow1 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(editQuestionButton, addProposalButton, editProposalButton, deleteProposalButton);
        
        const actionRow2 = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(multipleChoiceMenu);
        
        const actionRow3 = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(saveButton, cancelButton);
        
        // Mettre à jour le message avec les options de modification
        await interaction.update({
            content: `Modification de la question ${questionIndex + 1} : ${questionText}`,
            embeds: [embed],
            components: [actionRow1, actionRow2, actionRow3]
        });
    } catch (error) {
        console.error("Erreur lors de la sélection de question:", error);
        await interaction.reply({ 
            content: "Une erreur est survenue lors de la sélection de la question. Veuillez réessayer.", 
            flags: MessageFlags.Ephemeral 
        });
    }
} 