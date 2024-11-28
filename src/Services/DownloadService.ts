import fs from 'fs';
import path from 'path';

export class DownloadService {
  async downloadFile(fileName: string) {
    if (!fileName) {
      throw new Error('File name is required');
    }
  
    // const filePath = path.join(__dirname, '../../', 'Files', fileName);
    
    const filePath = path.join(process.env.FILE_PATH, fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error('File not found');
    }

    return filePath;  
  }
}
