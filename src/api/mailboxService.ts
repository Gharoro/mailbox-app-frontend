import axiosInstance from "./axiosInstance";
import {
  MailboxDataResponse,
  MailboxMessagesResponse,
  MailboxSingleMessageResponse,
} from "../interfaces";
import { handleApiError } from "../utils/apiError";
import {
  FETCH_MAILBOX_DATA,
  FETCH_MESSAGE,
  FETCH_MESSAGES,
  UPDATE_MESSAGE_AS_READ,
} from "../utils/constants";

// Fetch mailbox data (Welcome Message)
export const fetchMailboxData = async (): Promise<MailboxDataResponse> => {
  try {
    const { data } = await axiosInstance.get<MailboxDataResponse>(
      FETCH_MAILBOX_DATA
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch paginated messages
export const fetchMessages = async (
  page: number,
  limit = 5
): Promise<MailboxMessagesResponse> => {
  try {
    const { data } = await axiosInstance.get<MailboxMessagesResponse>(
      FETCH_MESSAGES,
      { params: { page, limit } }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch single message
export const fetchMessage = async (
  messageId: string
): Promise<MailboxSingleMessageResponse> => {
  try {
    const { data } = await axiosInstance.get<MailboxSingleMessageResponse>(
      `${FETCH_MESSAGE}/${messageId}`
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Mark message as read
export const updateMessageAsRead = async (
  messageId: string
): Promise<MailboxSingleMessageResponse> => {
  try {
    const { data } = await axiosInstance.put<MailboxSingleMessageResponse>(
      UPDATE_MESSAGE_AS_READ,
      { messageId }
    );
    return data;
  } catch (error) {
    return handleApiError(error);
  }
};
