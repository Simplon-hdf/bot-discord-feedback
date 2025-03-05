import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageFlags, ModalSubmitInteraction } from "discord.js";

export async function createPoll(interaction: ModalSubmitInteraction) {
    const embed = new EmbedBuilder()
        .setTitle(`Titre : ${interaction.fields.getTextInputValue('pollTitle')}`)
        .setDescription(
            "Les questions"
        )
        .setFooter({
            text: "Utilisez les boutons ci-dessous pour gérer les questions du sondage"
        });

    const button1 = new ButtonBuilder()
        .setCustomId("feedbackQuestionAddButton")
        .setLabel("Ajouter une question")
        .setStyle(ButtonStyle.Primary);

    const button2 = new ButtonBuilder()
        .setCustomId("feedbackQuestionEditButton")
        .setLabel("Modifier une question")
        .setStyle(ButtonStyle.Primary);

    const button3 = new ButtonBuilder()
        .setCustomId("feedbackQuestionRemoveButton")
        .setLabel("Supprimer une ou plusieurs questions")
        .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button1, button2, button3);

    // Envoyer une réponse éphémère pour indiquer que le sondage a été créé
    await interaction.reply({
        content: "Votre sondage a été créé avec succès !",
        flags: MessageFlags.Ephemeral,
    });
    
    // Envoyer le sondage comme un message normal (non-éphémère) dans le canal
    if (interaction.channel) {
        // Vérifier si le canal supporte la méthode send
        if ('send' in interaction.channel) {
            const message = await interaction.channel.send({
                embeds: [embed],
                components: [row]
            });
            console.log(`Nouveau sondage créé avec l'ID de message: ${message.id}`);
        } else {
            await interaction.followUp({
                content: "Erreur: Ce type de canal ne supporte pas l'envoi de messages.",
                flags: MessageFlags.Ephemeral
            });
        }
    } else {
        await interaction.followUp({
            content: "Erreur: Impossible d'envoyer le sondage dans ce canal.",
            flags: MessageFlags.Ephemeral
        });
    }
}