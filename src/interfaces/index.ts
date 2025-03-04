export interface User {
  userId: number;
  userName: string;
}

export interface MailboxDataResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    user: { userId: number; userName: string };
    totalMessages: number;
    totalUnreadMessages: number;
  };
}

export interface MailboxMessagesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: {
    messages: IMessage[];
    pagination: {
      currentPage: number;
      nextPage: number | null;
      previousPage: number | null;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface IMessage {
  id: number;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface MailboxSingleMessageResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data?: IMessage;
}
