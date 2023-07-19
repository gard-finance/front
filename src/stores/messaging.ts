import { MessageToL1, Status } from 'starknet';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { provider } from '@/constant/config';

export interface Message {
  tx: `0x${string}`;
  message: MessageToL1;
  status: Status;
  timestamp: number;
}

interface MessagingStore {
  messages: Message[];
  push: (m: Message) => void;
  update: () => Promise<Message[]>;
  consume: (tx: `0x${string}`) => void;
}

export const useMessages = create<MessagingStore>()(
  persist(
    (set, get) => ({
      messages: [],
      push: (m: Message) =>
        set((state) => ({ ...state, messages: [...state.messages, m] })),
      update: async () => {
        const messages = get().messages;
        for (let i = 0; i < messages.length; i++) {
          if (messages[i].status !== 'ACCEPTED_ON_L1') {
            const receipt = await provider.getTransactionReceipt(
              messages[i].tx
            );
            messages[i] = {
              tx: messages[i].tx,
              timestamp: messages[i].timestamp,
              message: messages[i].message,
              status: receipt.status as Status,
            };
          }
        }
        set({ ...get(), messages });
        return messages;
      },
      consume: (tx: `0x${string}`) =>
        set((state) => ({
          ...state,
          messages: state.messages.filter((s) => s.tx != tx),
        })),
    }),
    { name: 'messages' }
  )
);
