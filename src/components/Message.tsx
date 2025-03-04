import { Link } from "react-router";
import { IMessage } from "../interfaces";
import { truncateContent } from "../utils/truncateContent";

export default function Message({ message }: { message: IMessage }) {
  return (
    <div
      className={`flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0 hover:bg-[#faf8ed] p-4 rounded-lg border border-b-2 ${
        message?.isRead ? "bg-[#faf8ed]" : "bg-white"
      }`}
    >
      <div className="space-y-2">
        <Link to={`/message/${message?.id}`}>
          <h3 className="font-bold text-2xl">{message?.subject}</h3>
        </Link>

        <p className="overflow-hidden whitespace-nowrap text-overflow-ellipsis">
          {truncateContent(message?.content, 50)}
        </p>
      </div>

      {message?.isRead ? (
        <div>
          <span className="italic font-bold text-violet-600">Read</span>
        </div>
      ) : (
        <div>
          <span className="font-bold">Unread</span>
        </div>
      )}
    </div>
  );
}
