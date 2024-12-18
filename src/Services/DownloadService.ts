import fs from 'fs';
import path from 'path';

export class DownloadService {
  async downloadFile(fileName: string) {
    if (!fileName) {
      throw new Error('File name is required');
    }
  
    // const filePath = path.join(__dirname, '../../', 'Files', fileName);
    
    const filePath = path.join(process.cwd(), 'tmp', fileName);

    if (!fs.existsSync(filePath)) {
      throw new Error(`${process.cwd()}/ ${process.env.FILE_PATH} File not found`);
    }

    return filePath;  
  }
}
