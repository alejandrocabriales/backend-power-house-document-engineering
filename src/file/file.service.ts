import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  getStaticProfileImage(imageName: string) {
    const path = join(__dirname, '../../static/uploads', imageName);

    if (!existsSync(path)) {
      throw new BadRequestException('No profile image found');
    }

    return path;
  }
}
