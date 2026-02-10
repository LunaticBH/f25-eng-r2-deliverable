/* eslint-disable */
import OpenAI from "openai";

// Initialize OpenAI client outside the function for reuse
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful and knowledgeable chatbot specialized in answering questions about animals, species, habitats, conservation status, diet, behavior, and other animal-related topics.

If a user asks a question that is not related to animals or species, politely decline and remind them that you're specifically designed to help with animal and species-related queries.

Provide accurate, engaging, and informative responses. If you're unsure about something, indicate that honestly.`;

export async function generateResponse(message: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      return "I couldn't generate a response. Please try again.";
    }

    return content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I apologize, but I encountered an error while processing your request. Please try again later.";
  }
}
