"use client";

import { useState } from "react";
import classes from "./NoteForm.module.css";
import { Button, TextInput } from "@mantine/core";
import Editor from "../Editor/Editor";
import { Note } from "@/app/_types/notes";

interface Props {
  note?: Note;
}

const NoteForm: React.FC<Props> = function ({ note = null}) {
  const [title, setTitle] = useState<string>(note?.title || '');
  const [content, setContent] = useState<string>(note?.content || '');

  function handleSaveNote() {

  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <TextInput
          className={classes.title_input}
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={handleSaveNote}>Save</Button>
      </div>
      <div className={classes.editor_container}>
        <Editor
          value={content}
          onChange={(newContent) => setContent(newContent)}
        />
      </div>
    </div>
  );
}

export default NoteForm;