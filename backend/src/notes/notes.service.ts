import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateNoteDto from './dto/create-note.dto';
import { getCurrentUtc } from 'src/common/libraries/date.library';
import UpdateNoteDto from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private prismaService: PrismaService) {}

  async createNote(notesDto: CreateNoteDto, userId: number) {
    const newNote = await this.prismaService.note.create({
      data: {
        ...notesDto,
        user: { connect: { id: userId } },
        createdOn: getCurrentUtc(),
      },
    });
    return { data: newNote };
  }

  async getNotes(userId: number) {
    return await this.prismaService.note.findMany({
      where: { userId },
    });
  }

  async updateNote(noteId: string, notesDto: UpdateNoteDto, userId: number) {
    return await this.prismaService.note.update({
      where: { id: noteId, userId: userId },
      data: { ...notesDto },
    });
  }

  async deleteNote(noteId: string, userId: number) {
    return await this.prismaService.note.delete({
      where: { id: noteId, userId: userId },
    });
  }
}
