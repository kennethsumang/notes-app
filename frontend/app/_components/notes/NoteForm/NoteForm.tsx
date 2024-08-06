'use client';

import { useState } from 'react';
import classes from './NoteForm.module.css';
import { Button, TextInput } from '@mantine/core';
import Editor from '../Editor/Editor';
import { Note } from '@/app/_types/notes';
import RequestLibrary from '@/app/_libraries/request.library';
import { getCurrentDomain } from '@/app/_utils/http.util';
import useNotification from '@/app/_hooks/useNotification';
import { useRouter } from 'next/navigation';

interface Props {
  note?: Note;
}

const NoteForm: React.FC<Props> = function ({ note = null }) {
  const notify = useNotification();
  const router = useRouter();
  const [title, setTitle] = useState<string>(note?.title || '');
  const [content, setContent] = useState<string>(note?.content || '');
  const parent = null;

  async function handleSaveNote() {
    const result = await requestSave();
    if (result.success === false) {
      notify.error(result.message);
      return;
    }

    const note = result.data as Note;
    router.push(`/app/notes/${note.id}`);
  }

  async function requestSave() {
    try {
      const response = await RequestLibrary.request<{ data: Note }>(
        `${getCurrentDomain()}/api/notes`,
        {
          method: 'POST',
          data: { title, content, parent },
        },
      );

      return {
        success: true,
        message: 'OK',
        data: response.data,
      };
    } catch (e) {
      return {
        success: false,
        message: (e as Error).message,
      };
    }
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
};

export default NoteForm;
