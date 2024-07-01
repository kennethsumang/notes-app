export interface Note {
  id: string;
  user_id: number;
  title: string;
  content: string;
  parent: string|null;
}

export interface NoteWithChildren extends Note {
  children: NoteWithChildren[];
}