import NoteForm from '@/app/_components/notes/NoteForm/NoteForm';
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
    console.log(e);
    redirect('/app');
  }
};

export default Page;
