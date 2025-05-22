import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { randomUUID } from 'crypto';

export const imageStorage = () => {
  return {
    storage: diskStorage({
      destination: (req, _file, cb) => {
        let imagePath = '/';

        if (req.path === '/artists') {
          imagePath = 'photos';
        }

        if (req.baseUrl === '/albums') {
          imagePath = 'covers';
        }
        const destDir = path.join('public', imagePath);
        fs.mkdirSync(destDir, { recursive: true });
        cb(null, destDir);
      },
      filename: (_req, file, cb) => {
        const extension = path.extname(file.originalname);
        cb(null, randomUUID() + extension);
      },
    }),
  };
};
