import { create } from "zustand";
import { MailboxDataResponse, User } from "../interfaces";

interface MailboxState {
  user: User | null;
  totalUnreadMessages: number;
  totalMessages: number;
  setMailboxData: (mailboxData: MailboxDataResponse["data"]) => void;
  updateUnreadCount: (newCount: number) => void;
}

const useMailboxStore = create<MailboxState>((set) => ({
  user: null,
  totalUnreadMessages: 0,
  totalMessages: 0,
  setMailboxData: (mailboxData) => {
    set({
      user: mailboxData?.user,
      totalUnreadMessages: mailboxData?.totalUnreadMessages,
      totalMessages: mailboxData?.totalMessages,
    });
  },
  updateUnreadCount: (newCount) => set({ totalUnreadMessages: newCount }),
}));

export default useMailboxStore;
