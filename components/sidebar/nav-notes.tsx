"use client";

import { RiAddLine, RiFileTextLine } from "@remixicon/react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useNoteId, useNotes, useCreateNote, type Note } from "@/hooks";

export default function NavNotes() {
  const { noteId, setNoteId } = useNoteId();
  const { data: notesData, isPending } = useNotes();
  const { mutate: createNote, isPending: isCreating } = useCreateNote();

  const notes = notesData?.data ?? [];

  const handleCreateNote = () => {
    if (isCreating) return;

    createNote(
      { title: "Untitled", content: "" },
      {
        onSuccess: (newNote: Note) => {
          setNoteId(newNote.id);
        },
      }
    );
  };

  return (
    <SidebarGroup className="py-2">
      <SidebarGroupLabel className="flex items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Notes
        <SidebarGroupAction
          title="New note"
          onClick={handleCreateNote}
          disabled={isCreating}
          className={cn(
            "rounded-sm p-1 opacity-70 transition-all",
            "hover:opacity-100 hover:bg-accent/80 hover:text-accent-foreground",
            isCreating && "opacity-40 cursor-wait"
          )}
        >
          {isCreating ? (
            <RiAddLine className="h-4 w-4 animate-spin" />
          ) : (
            <RiAddLine className="h-4 w-4" />
          )}
          <span className="sr-only">New note</span>
        </SidebarGroupAction>
      </SidebarGroupLabel>

      <SidebarGroupContent className="mt-1">
        <SidebarMenu className="px-1">
          {isPending ? (
            <div className="space-y-1.5 py-2">
              {[70, 85, 60, 75, 80].map((width, i) => (
                <div key={i} className="flex h-9 items-center gap-2 rounded-md px-2">
                  <div className="h-4 w-4 rounded bg-accent animate-pulse" />
                  <div 
                    className="h-4 rounded bg-accent animate-pulse" 
                    style={{ width: `${width}%` }}
                  />
                </div>
              ))}
            </div>
          ) : notes.length === 0 ? (
            <div className="py-8 text-center">
              <RiFileTextLine className="mx-auto h-8 w-8 text-muted-foreground/40" />
              <p className="mt-3 text-sm font-medium text-muted-foreground">No notes yet</p>
              <p className="mt-1 text-xs text-muted-foreground/70">Click + to create your first note</p>
            </div>
          ) : (
            notes.map((note: Note) => {
              const isActive = noteId === note.id;

              return (
                <SidebarMenuItem key={note.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={note.title || "Untitled"}
                    className={cn(
                      "group relative h-9 w-full justify-start gap-2.5 rounded-md px-2 text-sm font-medium transition-all",
                      "data-[active=true]:bg-accent/90 data-[active=true]:text-accent-foreground",
                      "data-[active=true]:font-semibold",
                      "hover:bg-accent/70"
                    )}
                  >
                    <a href={`?noteId=${note.id}`} onClick={(e) => {
                      e.preventDefault();
                      setNoteId(note.id);
                    }}>
                      <div className="flex items-center gap-2.5">
                        <RiFileTextLine className={cn(
                          "h-4 w-4 shrink-0 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground/70"
                        )} />
                        <span className="truncate">{note.title || "Untitled"}</span>
                      </div>

                      {/* Active indicator bar (Palantir style) */}
                      {isActive && (
                        <div
                          className="absolute inset-y-2 left-0 w-0.5 bg-primary rounded-r-full"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}