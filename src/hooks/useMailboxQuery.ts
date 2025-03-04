import { useQuery } from "@tanstack/react-query";
import { fetchMailboxData } from "../api/mailboxService";
import useMailboxStore from "../store/useMailboxStore";
import { MAILBOX_QUERY_KEY } from "../utils/constants";

export const useMailboxQuery = () => {
  const { setMailboxData } = useMailboxStore();

  return useQuery({
    queryKey: [MAILBOX_QUERY_KEY],
    queryFn: async () => {
      const result = await fetchMailboxData();
      if (result.success && result.data) {
        setMailboxData(result.data);
      }
      return result;
    },
    placeholderData: (previousData) => previousData,
    refetchOnWindowFocus: true,
  });
};
