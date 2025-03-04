import { useEffect } from "react";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "../utils/formatDate";
import { useMessageQuery } from "../hooks/useMessageQuery";
import { useMarkMessageAsRead } from "../hooks/useMarkMessageAsRead";

export default function Message() {
  const { id } = useParams<{ id: string }>();

  const { data: message, isLoading } = useMessageQuery(id as string);
  const { mutate: markAsRead } = useMarkMessageAsRead();

  // Mark message as read on page load if message is not already read
  useEffect(() => {
    if (message && !message.isRead) {
      markAsRead(id as string);
    }
  }, [message, markAsRead, id]);

  return (
    <div className="w-full lg:max-w-6xl min-h-screen mx-auto overflow-hidden shadow-lg mb-8">
      {/* Header */}
      <div className="bg-violet-600 p-6 text-white rounded-t-2xl space-y-12">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Read Message</h1>
        </div>
      </div>

      {/* Messages Section */}
      <div className="p-6">
        <Link
          to="/inbox"
          className="inline-flex items-center border border-violet-600 px-3 py-1.5 rounded-md text-violet-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            ></path>
          </svg>
          <span className="ml-1 text-base">Back to Inbox</span>
        </Link>

        {isLoading ? (
          <div className="mt-8">
            <Skeleton count={10} />
          </div>
        ) : (
          <div className="mt-8 space-y-12">
            <div>
              <h1 className="font-medium text-lg">Subject</h1>
              <h2 className="font-bold text-2xl">{message?.subject}</h2>
              <p className="mt-4 italic">
                {formatDate(message?.createdAt || "")}
              </p>
            </div>

            <hr />

            <p className="text-justify">{message?.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
