import { atom, selector } from 'recoil';

type MessageState = {
  type: 'INFO' | 'ERROR';
  title: string;
  message: string;
};

export const messagesState = atom<MessageState[]>({
  key: 'messagesState',
  default: [],
});

export const messageState = selector<MessageState | undefined>({
  key: 'messageState',
  get: ({ get }) => {
    const messages = get(messagesState);
    return messages.length > 0 ? messages[0] : undefined;
  },
  set: ({ get, set }, newValue) => {
    const messages = get(messagesState);
    if (newValue === undefined) return;

    const newMessages = [...messages, newValue as MessageState];

    set(messagesState, newMessages);
  },
});
