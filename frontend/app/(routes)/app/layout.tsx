import AppLayout from '@/app/_components/layout/AppLayout/AppLayout';
import HttpException from '@/app/_exceptions/http.exception';
import UnauthorizedException from '@/app/_exceptions/unauthorized.exception';
import RequestLibrary from '@/app/_libraries/request.library';
import { NoteWithChildren } from '@/app/_types/notes';
import { getCurrentDomain } from '@/app/_utils/http.util';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = async function ({ children }) {
  const notes = await fetchNotes();

  return <AppLayout notes={notes || []}>{children}</AppLayout>;
};

async function fetchNotes(): Promise<NoteWithChildren[] | null> {
  try {
    const url = new URL(`${getCurrentDomain()}/api/notes`);
    const response = await RequestLibrary.request<{
      data: NoteWithChildren[];
    }>(url.toString(), { method: 'GET' });
    return response.data as NoteWithChildren[];
  } catch (e) {
    if (
      e instanceof UnauthorizedException ||
      (e instanceof HttpException && e.code === 401)
    ) {
      redirect('/');
    } else {
      return null;
    }
  }
}

export default Layout;
