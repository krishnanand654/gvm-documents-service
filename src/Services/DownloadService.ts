import fs from 'fs';
import path from 'path';

export class DownloadService {
  async downloadFile(fileName: string) {
    if (!fileName) {
      throw new Error('File name is required');
    }

    // Path to the directory where your files are stored
    const filePath = path.join(__dirname, '..', 'Files', fileName);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    return filePath;  
  }
}
