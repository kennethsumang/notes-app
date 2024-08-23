import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import CreateNoteDto from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import UpdateNoteDto from './dto/update-note.dto';

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

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Put(':noteId')
  async update(
    @Body() notesDto: UpdateNoteDto,
    @Req() request,
    @Param() params,
  ) {
    return this.notesService.updateNote(
      params.noteId,
      notesDto,
      request.user.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':noteId')
  async del(@Param() params, @Req() request) {
    return this.notesService.deleteNote(params.noteId, request.user.userId);
  }
}
