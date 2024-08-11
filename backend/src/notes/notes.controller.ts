import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import CreateNoteDto from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/')
  async get(@Req() request) {
    return this.notesService.getNotes(request.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post('/')
  async create(@Body() notesDto: CreateNoteDto, @Req() request) {
    return this.notesService.createNote(notesDto, request.user.userId);
  }
}
