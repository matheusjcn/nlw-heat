import 'dotenv/config';
import express from 'express';
import router from './routes';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected on socket ${socket.id}`);
});

app.use(cors());
app.use(express.json());
app.use(router);

app.get('/github', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENTE_ID}`,
  );
});

app.get('/signin/callback', (req, res) => {
  const { code } = req.query;

  return res.json(code);
});

app.get('/', (req, res) => {
  const { code } = req.query;

  return res.json('testando');
});

const PORT = 3333;

export { httpServer, io };
