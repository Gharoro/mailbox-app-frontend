import Skeleton from "react-loading-skeleton";
import useMailboxStore from "../store/useMailboxStore";
import { useShallow } from "zustand/shallow";
import { useMailboxQuery } from "../hooks/useMailboxQuery";
import { useEffect } from "react";

export default function TopBar() {
  const { data, isLoading } = useMailboxQuery();
  const { user, totalUnreadMessages } = useMailboxStore(
    useShallow((state) => ({
      user: state.user,
      totalUnreadMessages: state.totalUnreadMessages,
    }))
  );

  useEffect(() => {
    if (data?.success && data.data) {
      useMailboxStore.getState().setMailboxData(data.data);
    }
  }, [data]);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        {isLoading ? (
          <Skeleton />
        ) : (
          <div className="flex justify-between items-center py-4">
            {/* User Name */}
            <div className="text-lg font-semibold text-gray-800">
              Welcome, {user?.userName}!
            </div>

            {/* Unread Messages Count */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-600">Unread Messages:</span>

              <span className="bg-violet-600 text-white rounded-full px-3 py-1 text-sm font-bold">
                {totalUnreadMessages}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
