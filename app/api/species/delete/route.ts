/* eslint-disable */
import { createServerSupabaseClient } from "@/lib/server-utils";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json() as unknown;

    // Validate input
    if (!body || typeof (body as { speciesId?: unknown }).speciesId !== "number") {
      return new Response(JSON.stringify({ error: "Invalid or missing speciesId" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const speciesId = (body as { speciesId: number }).speciesId;

    // Get current user session
    const supabase = createServerSupabaseClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the species to check if current user is the author
    const { data: species, error: fetchError } = await supabase
      .from("species")
      .select("author")
      .eq("id", speciesId)
      .single();

    if (fetchError || !species) {
      return new Response(JSON.stringify({ error: "Species not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Check if current user is the author
    if (species.author !== session.user.id) {
      return new Response(JSON.stringify({ error: "You can only delete your own species" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete the species
    const { error: deleteError } = await supabase
      .from("species")
      .delete()
      .eq("id", speciesId);

    if (deleteError) {
      return new Response(JSON.stringify({ error: deleteError.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in delete species route:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
