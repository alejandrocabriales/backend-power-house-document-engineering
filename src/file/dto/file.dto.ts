import { IsString, IsNumber } from 'class-validator';

export class FileDto {
  @IsString()
  fileName: string;

  @IsNumber()
  fileSize: number;

  @IsString()
  mimeType: string;

  @IsString()
  dataUri: string;
}
