import io from 'socket.io-client';
import { api } from '../../services/api';
import logoImage from '../../assets/logo.svg';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';

type Message = {
  id: string;
  text: string;
  user: User;
};

type User = {
  name: string;
  avatar_url: string;
};

const messageQueue: Message[] = [];

const socket = io('http://localhost:3333');
socket.on('new_message', (new_message: Message) => {
  messageQueue.push(new_message);
});

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messageQueue.length > 0) {
        setMessages((prevState) =>
          [messageQueue[0], prevState[0], prevState[1]].filter(Boolean),
        );

        messageQueue.shift();
      }
    }, 3000);
  }, []);

  useEffect(() => {
    api.get<Message[]>('/messages/lasts').then((res) => {
      setMessages(res?.data);
      // console.log('Messages : ', res?.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="Imagem2021" />

      <ul className={styles.messageList}>
        {messages.map((message) => (
          <li key={message.id} className={styles.message}>
            <div className={styles.messageContent}>
              {message.text}
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
