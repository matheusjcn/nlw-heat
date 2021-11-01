import { httpServer } from './app';

const PORT = 3333;
httpServer.listen(PORT, () => console.log(`Running in port ${PORT}`));
