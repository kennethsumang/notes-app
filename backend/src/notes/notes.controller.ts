import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotesService } from './notes.service';
import CreateNoteDto from './dto/create-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Body() notesDto: CreateNoteDto) {

  }
}
