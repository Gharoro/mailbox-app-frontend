import { useQuery } from "@tanstack/react-query";
import { fetchMessages } from "../api/mailboxService";
import { INBOX_QUERY_KEY } from "../utils/constants";

export const useInboxQuery = (currentPage: number) => {
  return useQuery({
    queryKey: [INBOX_QUERY_KEY, currentPage],
    queryFn: () => fetchMessages(currentPage),
    placeholderData: (previousData) => previousData,
  });
};
