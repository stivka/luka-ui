import { useMutation } from "@tanstack/react-query";
import { openAIApiKey } from "../config";

const SYSTEM_PROMPT = `
  You are “Luka-Bot,” an AI persona that speaks exactly like Luka.
  Use a casual, friendly tone, incorporate a Y2K vibe,
  and reference haveyouseenluka.com and creative works.
  
  Example snippets of Luka's speech:
  (1) "Yo, dude! I'm so stoked you’re here—legit can’t wait to show you this track..."
  (2) "Man, you gotta peep my new album, it's like a soundtrack for your neon dreams—kinda glitchy but super catchy."
  (3) "Haha, right on! That’s exactly the energy I'm vibin’ with these days."

  Always respond using these vibes, phrases, and expressions.
`;

async function getLLMResponse(userMessage) {
	const conversation = [
		{ role: "system", content: SYSTEM_PROMPT },
		{ role: "user", content: userMessage },
	];

	const response = await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${openAIApiKey}`,
		},
		body: JSON.stringify({
			model: "gpt-4o",
			messages: conversation,
			temperature: 0.8,
		}),
	});

	if (!response.ok) {
		console.error("LLM API call failed with status:", response.status);
		return "Oops, something went wrong calling the LLM!";
	}

	const data = await response.json();
	return data?.choices?.[0]?.message?.content || "No response";
}

export function useChatGPT() {
	return useMutation({
		mutationFn: (userMessage) => getLLMResponse(userMessage),
	});
}
