import { Collection, SlashCommandBuilder } from "discord.js";
import { data as feedbackInitData, execute as feedbackInitExecute } from "./feedback-init";

interface Command {
    data: SlashCommandBuilder;
    execute: (interaction: any) => Promise<void>;
}

const commands = new Collection<string, Command>();

commands.set(feedbackInitData.name, { data: feedbackInitData, execute: feedbackInitExecute });

export default commands;
