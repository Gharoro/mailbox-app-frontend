import { useQuery } from "@tanstack/react-query";
import { fetchMessage } from "../api/mailboxService";
import { MESSAGE_QUERY_KEY } from "../utils/constants";

export const useMessageQuery = (messageId: string) => {
  return useQuery({
    queryKey: [MESSAGE_QUERY_KEY, messageId],
    queryFn: () => fetchMessage(messageId),
    enabled: !!messageId,
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 2,
    select: (result) => (result.success ? result.data : null),
  });
};
