import { useQuery } from "@tanstack/react-query";

export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type NotesResponse = {
  data: Note[];
};

export const useNotes = () => {
  return useQuery<NotesResponse>({
    queryKey: ["notes"],
    queryFn: async () => {
      const response = await fetch("/api/notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      return response.json();
    },
  });
};
