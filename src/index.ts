// Require the necessary discord.js classes
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { registerInteractionEvent } from './events/interaction';
import { registerReadyEvent } from './events/ready';
dotenv.config();
//const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

registerReadyEvent(client);
registerInteractionEvent(client);

// Log in to Discord with your client's token
client.login(process.env.TOKEN);