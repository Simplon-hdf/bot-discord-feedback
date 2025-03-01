import { Interaction } from "discord.js";
import commands from '../get-commands';

export async function handleCommand(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const command = commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "Une erreur est survenue.", ephemeral: true });
  }
}