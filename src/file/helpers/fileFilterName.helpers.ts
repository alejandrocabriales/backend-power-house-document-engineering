import { v4 as uuidv4 } from 'uuid';

export const fileFilterName = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  if (!file) return callback(new Error('File is empty'), '');

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${fileExtension}`;

  callback(null, fileName);
};
