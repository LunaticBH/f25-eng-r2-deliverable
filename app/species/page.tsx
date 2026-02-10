import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography";
import { createServerSupabaseClient } from "@/lib/server-utils";
import type { Database } from "@/lib/schema";
import { redirect } from "next/navigation";
import AddSpeciesDialog from "./add-species-dialog";
import SpeciesCard from "./species-card";

export default async function SpeciesList() {
  // Create supabase server component client and obtain user session from stored cookie
  const supabase = createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/");
  }

  // Obtain the ID of the currently signed-in user
  const sessionId = session.user.id;

  const { data: species } = (await supabase
    .from("species")
    .select("*")
    .order("id", { ascending: false })) as {
    data: Database["public"]["Tables"]["species"]["Row"][] | null;
    error: { message: string } | null;
  };

  // Fetch author profiles for each species
  const authorIds = species?.map((s) => s.author) ?? [];
  const { data: profiles } = (await supabase
    .from("profiles")
    .select("*")
    .in("id", authorIds)) as {
    data: Database["public"]["Tables"]["profiles"]["Row"][] | null;
    error: { message: string } | null;
  };

  // Create a map of author IDs to profiles for easy lookup
  const profileMap = new Map(
    profiles?.map((p) => [p.id, p]) ?? []
  );

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <TypographyH2>Species List</TypographyH2>
        <AddSpeciesDialog userId={sessionId} />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-wrap justify-center">
        {species?.map((s) => (
          <SpeciesCard key={s.id} species={s} userId={sessionId} authorProfile={profileMap.get(s.author)} />
        ))}
      </div>
    </>
  );
}
