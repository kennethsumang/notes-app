import { create } from "zustand";

interface NotesState {
    notesListUpdateKey: number;
}

const useNotesStore = create<NotesState>((set) => ({
    notesListUpdateKey: 0,
    incrementNotesListUpdateKey: () => set((state) => ({ notesListUpdateKey: state.notesListUpdateKey + 1 })),
}));

export { useNotesStore };