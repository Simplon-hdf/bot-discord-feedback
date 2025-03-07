import { MessageFlags, ModalSubmitInteraction } from "discord.js";
import { pollEmbed, pollRows } from "../../utils/components";
import { createPollObject } from "../../utils/poll-store";

export async function createPollTemplate(interaction: ModalSubmitInteraction) {
    // Utiliser le même objet Poll que pour un questionnaire normal
    const poll = createPollObject(
        interaction.user.id, 
        interaction.fields.getTextInputValue('pollTemplateTitle')
    );

    // Ajouter une propriété pour indiquer qu'il s'agit d'un modèle
    (poll as any).isTemplate = true;

    // Envoyer le modèle de questionnaire comme un message éphémère dans le canal
    await interaction.reply({
        embeds: [pollEmbed(poll)],
        components: pollRows(),
        flags: MessageFlags.Ephemeral
    });
} 