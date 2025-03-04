import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMessageAsRead } from "../api/mailboxService";
import useMailboxStore from "../store/useMailboxStore";
import { MAILBOX_QUERY_KEY } from "../utils/constants";

export const useMarkMessageAsRead = () => {
  const queryClient = useQueryClient();
  const { updateUnreadCount, totalUnreadMessages } = useMailboxStore();

  return useMutation({
    mutationFn: (messageId: string) => updateMessageAsRead(messageId),
    onSuccess: () => {
      updateUnreadCount(Math.max(totalUnreadMessages - 1, 0));
      queryClient.invalidateQueries({ queryKey: [MAILBOX_QUERY_KEY] });
    },
  });
};
