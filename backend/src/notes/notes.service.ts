import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import CreateNoteDto from './dto/create-note.dto';
import { getCurrentUtc } from 'src/common/libraries/date.library';

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
}
