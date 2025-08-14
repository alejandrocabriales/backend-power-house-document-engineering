import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilterName } from './helpers/fileFilterName.helpers';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/uploads',
        filename: fileFilterName,
      }),
    }),
  )
  uploadFileProfile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const fileName = file.filename;
    const serverUrl = `${this.configService.get<string>('HOST_API')}file/upload/${fileName}`;
    return {
      serverUrl,
    };
  }

  @Get('upload/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = this.fileService.getStaticProfileImage(filename);
    return res.sendFile(filePath);
  }
}
