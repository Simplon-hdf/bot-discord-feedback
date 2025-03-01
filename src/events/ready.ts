// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.

import { Client, Events } from "discord.js";

// It makes some properties non-nullable.
export function registerReadyEvent(client: Client) {
    client.once(Events.ClientReady, (readyClient) => {
        console.log(`✅ Connecté en tant que ${readyClient.user.tag}`);
    });
}