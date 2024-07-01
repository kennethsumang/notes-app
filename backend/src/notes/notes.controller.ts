import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import CreateNoteDto from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Body() notesDto: CreateNoteDto) {}
}
