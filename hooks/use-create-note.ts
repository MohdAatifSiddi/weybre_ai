import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/hooks/use-notes";

type CreateNoteInput = {
  title: string;
  content: string;
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation<Note, Error, CreateNoteInput>({
    mutationFn: async (input: CreateNoteInput) => {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error("Failed to create note");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
