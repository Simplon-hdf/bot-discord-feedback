import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction, SelectMenuBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export async function addQuestion(interaction: ModalSubmitInteraction) {
    // Récupérer le contenu de la question depuis le modal
    const questionContent = interaction.fields.getTextInputValue("questionContent");
    
    // Récupérer le message original
    const message = interaction.message;
    if (!message) {
        await interaction.reply({ content: "Erreur: Message introuvable", ephemeral: true });
        return;
    }
    
    // Récupérer l'embed existant et mettre à jour la description
    const embed = EmbedBuilder.from(message.embeds[0]);
    const currentDescription = embed.data.description || "Aucune question";
    
    // Ajouter la nouvelle question à la description
    const updatedDescription = `${currentDescription}\n\n**Question:** ${questionContent}`;
    embed.setDescription(updatedDescription);
    
    // Créer les boutons pour gérer les propositions
    const addProposalButton = new ButtonBuilder()
        .setCustomId("addProposalButton")
        .setLabel("Ajouter une proposition")
        .setStyle(ButtonStyle.Primary);
    
    const editProposalButton = new ButtonBuilder()
        .setCustomId("editProposalButton")
        .setLabel("Modifier une proposition")
        .setStyle(ButtonStyle.Primary);
    
    const deleteProposalButton = new ButtonBuilder()
        .setCustomId("deleteProposalButton")
        .setLabel("Supprimer une proposition")
        .setStyle(ButtonStyle.Danger);
    
    // Créer un menu déroulant pour le choix multiple
    const multipleChoiceSelect = new StringSelectMenuBuilder()
        .setCustomId("multipleChoiceSelect")
        .setPlaceholder("Choix multiple")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("Oui")
                .setValue("true")
                .setDescription("Permettre plusieurs réponses"),
            new StringSelectMenuOptionBuilder()
                .setLabel("Non")
                .setValue("false")
                .setDescription("Une seule réponse possible")
        );
    
    // Créer les boutons pour enregistrer ou annuler
    const saveButton = new ButtonBuilder()
        .setCustomId("saveQuestionButton")
        .setLabel("Enregistrer")
        .setStyle(ButtonStyle.Success);
    
    const cancelButton = new ButtonBuilder()
        .setCustomId("cancelQuestionButton")
        .setLabel("Annuler")
        .setStyle(ButtonStyle.Secondary);
    
    // Créer les lignes d'action
    const proposalRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(addProposalButton, editProposalButton, deleteProposalButton);
    
    const multipleChoiceRow = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(multipleChoiceSelect);
    
    const actionRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(saveButton, cancelButton);
    
    // Mettre à jour le message
    await interaction.reply({
        embeds: [embed],
        components: [proposalRow, multipleChoiceRow, actionRow],
        ephemeral: true
    });
} 