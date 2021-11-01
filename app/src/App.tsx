import styles from './App.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { useAuth } from './contexts/authContext';

export function App() {
  const { user } = useAuth();

  return (
    <main
      className={`${styles.contentWrapper} ${
        !!user ? styles.contentSigned : ''
      }`}
    >
      <MessageList></MessageList>

      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}

// Mudança de cores
// Animações
// Outras autenticações
// Outros Bancos
// ...
