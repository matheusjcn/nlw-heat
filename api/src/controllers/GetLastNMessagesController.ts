import { Request, Response } from 'express';
import CreateMessageService from '../services/GetLastNMessagesService';

class GetLastNMessagesController {
  async handle(req: Request, res: Response) {
    const service = new CreateMessageService();

    const result = await service.execute(3);

    return res.json(result);
  }
}

export default GetLastNMessagesController;
