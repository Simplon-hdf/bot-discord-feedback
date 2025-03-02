import { REST, Routes } from "discord.js";
import { config } from "dotenv";
import { data as feedbackInitCommand } from "./feedback-init";

config();

const commands = [feedbackInitCommand.toJSON()];
const rest = new REST({ version: "10" }).setToken(process.env.TOKEN as string);

(async () => {
	try {
		console.log("Déploiement des commandes...");
		await rest.put(
			Routes.applicationCommands(process.env.BOT_ID!),
			{ body: commands }
		);
		console.log("Commandes enregistrées !");
	} catch (error) {
		console.error(error);
	}
})();
