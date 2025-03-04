import Skeleton from "react-loading-skeleton";
import MailboxImg from "../assets/mailbox.svg";
import useMailboxStore from "../store/useMailboxStore";
import { Link } from "react-router";
import { useShallow } from "zustand/shallow";
import { useMailboxQuery } from "../hooks/useMailboxQuery";
import { useEffect } from "react";

export default function Home() {
  const { data, isLoading } = useMailboxQuery();
  const { user, totalUnreadMessages, totalMessages } = useMailboxStore(
    useShallow((state) => ({
      user: state.user,
      totalUnreadMessages: state.totalUnreadMessages,
      totalMessages: state.totalMessages,
    }))
  );

  useEffect(() => {
    if (data?.success && data.data) {
      useMailboxStore.getState().setMailboxData(data.data);
    }
  }, [data]);

  return (
    <div>
      <div className="flex flex-col space-y-12 lg:space-y-0 md:flex-row items-center w-full lg:max-w-6xl px-6 py-8 mx-auto">
        <div className="w-full lg:w-1/2 py-8 space-y-12">
          {isLoading ? (
            <Skeleton count={6} />
          ) : (
            <div className="space-y-4">
              <h1 className="text-violet-600 text-5xl font-semibold leading-none">
                Hello {user?.userName},
              </h1>
              <p>
                You have <strong>{totalUnreadMessages}</strong> unread messages
                out of {totalMessages}
              </p>
            </div>
          )}

          <Link
            className="px-6 py-4 text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            to="/inbox"
          >
            View Messages
          </Link>
        </div>
        <div className="w-full lg:w-1/2 py-8">
          <img src={MailboxImg} className="g-image" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
