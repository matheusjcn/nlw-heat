import { Router } from 'express';
import AuthenticateUseController from './controllers/AuthenticateUserController';
import CreateMessageController from './controllers/CreateMessageController';
import GetLastNMessagesController from './controllers/GetLastNMessagesController';
import ProfileUserController from './controllers/ProfileUserController';
import { ensureAuthenticate } from './middleware/ensureAuthenticate';

const router = Router();

router.post('/authenticate', new AuthenticateUseController().handle);
router.get('/messages/lasts', new GetLastNMessagesController().handle);

router.post(
  '/message',
  ensureAuthenticate,
  new CreateMessageController().handle,
);

router.get(
  '/user/profile',
  ensureAuthenticate,
  new ProfileUserController().handle,
);

export default router;
