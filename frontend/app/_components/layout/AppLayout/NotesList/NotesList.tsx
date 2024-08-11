import useNotification from '@/app/_hooks/useNotification';
import RequestLibrary from '@/app/_libraries/request.library';
import { useAuthStore } from '@/app/_store/auth.store';
import { useNotesStore } from '@/app/_store/notes.store';
import { NoteWithChildren } from '@/app/_types/notes';
import { getCurrentDomain } from '@/app/_utils/http.util';
import { Accordion, Center, NavLink } from '@mantine/core';
import { IconFile } from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import classes from './NotesList.module.css';
import useToken from '@/app/_hooks/useToken';
import HttpException from '@/app/_exceptions/http.exception';

interface Props {
  onNoteClick: (href: string) => void;
}

const NotesList: React.FC<Props> = function (props) {
  const notesListUpdateKey = useNotesStore((state) => state.notesListUpdateKey);
  const userId = useAuthStore((state) => state.user?.id);
  const pathname = usePathname();
  const router = useRouter();
  const [notes, setNotes] = useState<NoteWithChildren[]>([]);
  const { error } = useNotification();

  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [notesListUpdateKey, userId]);

  async function fetchNotes() {
    try {
      const url = new URL(`${getCurrentDomain()}/api/notes`);
      const response = await RequestLibrary.request<{
        data: NoteWithChildren[];
      }>(url.toString(), { method: 'GET' });
      setNotes(response.data);
    } catch (e) {
      if (e instanceof HttpException && e.code === 401) {
        error('You need to login to continue.');
        router.push('/');
      } else {
        error((e as Error).message);
      }
    }
  }

  function renderNote(note: NoteWithChildren): React.ReactNode {
    if (note.children) {
      return (
        <NavLink
          key={note.id}
          active={pathname === `/app/notes/${note.id}`}
          href=""
          label={note.title}
          leftSection={<IconFile size={20} />}
          onClick={(e) => handleNavClick(e, `/app/notes/${note.id}`)}
        >
          {note.children.map((child) => renderNote(child))}
        </NavLink>
      );
    }

    return (
      <NavLink
        key={note.id}
        active={pathname === `/app/notes/${note.id}`}
        href=""
        label={note.title}
        leftSection={<IconFile size={20} />}
        onClick={(e) => handleNavClick(e, `/app/notes/${note.id}`)}
      />
    );
  }

  function handleNavClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    props.onNoteClick(href);
  }

  return (
    <>
      {notes.map((value: NoteWithChildren) => {
        return renderNote(value);
      })}
    </>
  );
};

export default NotesList;
