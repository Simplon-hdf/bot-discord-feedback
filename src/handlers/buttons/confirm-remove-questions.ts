import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, EmbedBuilder, MessageFlags } from "discord.js";
import { logMessageTimer } from "../../utils/timer";
import { pollRow1 } from "../../utils/components";

// Variable globale pour stocker les questions sélectionnées pour la suppression
declare global {
	var selectedQuestionsToRemove: string[] | undefined;
}

export async function confirmRemoveQuestions(interaction: ButtonInteraction) {
	try {
		// Vérifier si des questions ont été sélectionnées
		if (!global.selectedQuestionsToRemove || global.selectedQuestionsToRemove.length === 0) {
			await interaction.reply({
				content: "Aucune question n'a été sélectionnée pour la suppression. Veuillez d'abord sélectionner des questions.",
				flags: MessageFlags.Ephemeral
			});

			setTimeout(async () => {
				await interaction.deleteReply();
			}, logMessageTimer);

			return;
		}

		// Récupérer l'embed existant
		const message = interaction.message;
		if (!message) {
			await interaction.reply({
				content: "Erreur: Message introuvable",
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		const embed = EmbedBuilder.from(message.embeds[0]);
		const description = embed.data.description || "";

		// Extraire les sections du message
		const sections = description.split("\n\n");

		// Identifier les questions et les autres sections
		const questionSections = sections.filter(q => q.includes("**Question"));
		const nonQuestionSections = sections.filter(q => !q.includes("**Question"));

		// Convertir les indices de questions sélectionnées en nombres
		const selectedIndices = global.selectedQuestionsToRemove.map(id =>
			parseInt(id.replace("question_", ""))
		);

		console.log(`Indices des questions à supprimer: ${selectedIndices.join(", ")}`);

		// Filtrer les questions pour ne garder que celles qui ne sont pas sélectionnées pour la suppression
		const remainingQuestions = questionSections.filter((_, index) =>
			!selectedIndices.includes(index)
		);

		// Renuméroter les questions restantes
		const renumberedQuestions = remainingQuestions.map((question, index) => {
			return question.replace(/\*\*Question \d+\*\*/, `**Question ${index + 1}**`);
		});

		// Reconstruire la description avec les sections non-questions et les questions restantes
		let newDescription = "";

		// Ajouter les sections non-questions au début
		if (nonQuestionSections.length > 0) {
			newDescription = nonQuestionSections.join("\n\n") + "\n\n";
		}

		// Ajouter les questions restantes
		if (renumberedQuestions.length > 0) {
			newDescription += renumberedQuestions.join("\n\n");
		} else {
			// S'il n'y a plus de questions, ajouter un message
			newDescription += "Aucune question n'a encore été ajoutée à ce sondage.";
		}

		// Mettre à jour l'embed avec la nouvelle description
		embed.setDescription(newDescription);

		// Réinitialiser les variables globales
		global.selectedQuestionsToRemove = undefined;

		// Créer un message temporaire pour confirmer la suppression
		const confirmationMessage = `${selectedIndices.length} question(s) supprimée(s) avec succès.`;

		// Mettre à jour le message original
		await interaction.update({
			content: null,
			embeds: [embed],
			components: [pollRow1()]
		});

		const followUp = await interaction.followUp({
			content: confirmationMessage,
			flags: MessageFlags.Ephemeral,
		})

		setTimeout(async () => {
			try {
				await interaction.deleteReply(followUp);
			}
			catch (error) {
				console.error("Erreur lors de la suppression du message de confirmation:", error);
			}
		}, logMessageTimer);
	} catch (error) {
		console.error("Erreur lors de la suppression des questions:", error);
		await interaction.reply({
			content: "Une erreur est survenue lors de la suppression des questions. Veuillez réessayer.",
			flags: MessageFlags.Ephemeral
		});
	}
} 