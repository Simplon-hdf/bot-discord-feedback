import { ActionRowBuilder, ButtonInteraction, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { getPollObject } from "../../utils/poll-store";
import { pollEmbed } from "../../utils/components";

export async function editPollDuration(interaction: ButtonInteraction) {
    const poll = getPollObject(interaction.user.id);
    
    if (!poll) {
        await interaction.reply({
            content: "Erreur : Questionnaire non trouvé.",
            ephemeral: true
        });
        return;
    }
    
    const durationMenu = new StringSelectMenuBuilder()
        .setCustomId("pollDurationSelect")
        .setPlaceholder("Sélectionnez une durée")
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel("1 heure")
                .setValue("1"),
            new StringSelectMenuOptionBuilder()
                .setLabel("2 heures")
                .setValue("2"),
            new StringSelectMenuOptionBuilder()
                .setLabel("4 heures")
                .setValue("4"),
            new StringSelectMenuOptionBuilder()
                .setLabel("8 heures")
                .setValue("8"),
            new StringSelectMenuOptionBuilder()
                .setLabel("24 heures")
                .setValue("24")
        );

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(durationMenu);

    // Mettre à jour le message existant avec le menu select
    await interaction.update({
        content: "Sélectionnez la durée du questionnaire :",
        embeds: [pollEmbed(poll)],
        components: [row]
    });
} 