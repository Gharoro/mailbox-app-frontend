import { useCallback, useState } from "react";
import Message from "../components/Message";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";
import { useInboxQuery } from "../hooks/useInboxQuery";

export default function Inbox() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useInboxQuery(currentPage);

  const messages = data?.success && data?.data ? data.data.messages : [];
  const pagination = data?.success && data?.data ? data.data.pagination : null;

  const handlePageChange = useCallback(
    (page?: number | null) => {
      if (page && page !== currentPage) {
        setCurrentPage(page);
      }
    },
    [currentPage]
  );

  return (
    <div className="w-full lg:max-w-6xl min-h-screen mx-auto overflow-hidden shadow-lg mb-8">
      {/* Header */}
      <div className="bg-violet-600 p-6 text-white rounded-t-2xlxxxx space-y-12">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Your Mailbox</h1>
          <p>Click on a message to read it's full content</p>
        </div>
      </div>

      {/* Messages Section */}
      <div className="p-6">
        {isLoading ? (
          <Skeleton count={10} height={30} />
        ) : (
          <>
            <div className="flex justify-between items-center mb-12">
              <Link
                to="/"
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
                <span className="ml-1 text-base">Back to Home</span>
              </Link>

              <nav className="flex items-center p-1 rounded bg-white space-x-2">
                <button
                  onClick={() => handlePageChange(pagination?.previousPage)}
                  disabled={!pagination?.hasPreviousPage}
                  className="p-1 cursor-pointer rounded border text-black bg-white hover:text-white hover:bg-violet-600 hover:border-violet-600"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </button>
                <p className="text-gray-500">
                  Page {currentPage} of {pagination?.totalPages ?? 1}
                </p>
                <button
                  onClick={() => handlePageChange(pagination?.nextPage)}
                  disabled={!pagination?.hasNextPage}
                  className="p-1 cursor-pointer rounded border text-black bg-white hover:text-white hover:bg-violet-600 hover:border-violet-600"
                >
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </nav>
            </div>

            <div className="flex flex-col w-full space-y-8">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
