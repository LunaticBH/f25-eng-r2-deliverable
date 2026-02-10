export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          display_name: string;
          biography: string | null;
        };
        Insert: {
          id: string;
          email: string;
          display_name: string;
          biography?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          display_name?: string;
          biography?: string | null;
        };
      };
      species: {
        Row: {
          id: number;
          scientific_name: string;
          common_name: string | null;
          total_population: number | null;
          kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
          description: string | null;
          image: string | null;
          author: string;
          endangered: boolean;
        };
        Insert: {
          id?: number;
          scientific_name: string;
          common_name?: string | null;
          total_population?: number | null;
          kingdom: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
          description?: string | null;
          image?: string | null;
          author: string;
          endangered?: boolean;
        };
        Update: {
          id?: number;
          scientific_name?: string;
          common_name?: string | null;
          total_population?: number | null;
          kingdom?: "Animalia" | "Plantae" | "Fungi" | "Protista" | "Archaea" | "Bacteria";
          description?: string | null;
          image?: string | null;
          author?: string;
          endangered?: boolean;
        };
      };
    };
  };
}
