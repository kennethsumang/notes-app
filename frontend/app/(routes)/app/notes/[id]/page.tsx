import NoteForm from '@/app/_components/notes/NoteForm/NoteForm';
import UnauthorizedException from '@/app/_exceptions/unauthorized.exception';
import RequestLibrary from '@/app/_libraries/request.library';
import { Note } from '@/app/_types/notes';
import { getCurrentDomain } from '@/app/_utils/http.util';
import { redirect } from 'next/navigation';

const Page = async function ({ params }: { params: { id: string } }) {
  try {
    const url = new URL(`${getCurrentDomain()}/api/notes/${params.id}`);
    const response = await RequestLibrary.request<{ data: Note }>(
      url.toString(),
      { method: 'GET' },
    );
    const note = response.data;
    return <NoteForm note={note} />;
  } catch (e) {
    console.error(e);
    // if (e instanceof UnauthorizedException) {
    //   redirect('/');
    // } else {
    //   redirect('/app');
    // }
  }
};

export default Page;
