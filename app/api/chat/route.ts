/* eslint-disable */
import { generateResponse } from "@/lib/services/species-chat";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json() as unknown;

    // Validate input
    if (!body || typeof (body as { message?: unknown }).message !== "string") {
      return new Response(JSON.stringify({ error: "Invalid or missing body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const message = ((body as { message: string }).message).trim();

    // Check if message is empty after trimming
    if (!message) {
      return new Response(JSON.stringify({ error: "Message cannot be empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate response from the chatbot service
    const response = await generateResponse(message);

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in chat route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
