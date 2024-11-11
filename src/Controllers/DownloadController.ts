import { Request, Response } from 'express';
import { DownloadService } from '../Services/DownloadService';

export class DownloadController {
  private downloadService: DownloadService;

  constructor() {
    this.downloadService = new DownloadService();
  }

  async downloadFile(req: Request, res: Response) {
    const fileName = req.query.fileName as string;

    try {
      const filePath = await this.downloadService.downloadFile(fileName);

      res.download(filePath, fileName, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send({ message: 'Error downloading the file' });
        }
      });
    } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === 'File name is required') {
            return res.status(400).send({ message: error.message });
          } else if (error.message === 'File not found') {
            return res.status(404).send({ message: error.message });
          } else {
            console.error(error);
            return res.status(500).send({ message: 'Internal Server Error' });
          }
        } else {
          console.error(error);
          return res.status(500).send({ message: 'Unknown error occurred' });
        }
      }
      
    }
}
