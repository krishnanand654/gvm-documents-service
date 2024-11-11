import fs from 'fs';
import path from 'path';

export class DownloadService {
  async downloadFile(fileName: string) {
    if (!fileName) {
      throw new Error('File name is required');
    }
  
    const filePath = path.join(__dirname, '../../', 'Files', fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    return filePath;  
  }
}
