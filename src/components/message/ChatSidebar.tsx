import image from "@/assets/images/heroProvider.png";
import type { ConversationListResponse } from "@/redux/featuresAPI/providerAPI/message/types/message";
import { Search } from "lucide-react";
import { getLastActiveTime } from "./date";
interface User {
  handleUserSelect: (userId: number) => void;
  showSidebar: boolean;
  searchQuery: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  allUsers: ConversationListResponse;
  selectId: number | null;
}
const ChatSidebar: React.FC<User> = ({
  handleUserSelect,
  showSidebar,
  searchQuery,
  handleSearchChange,
  allUsers,
  selectId,
}) => {
  return (
    allUsers && (
      <div>
        <div
          className={`${
            showSidebar ? "flex" : "hidden"
          } md:flex w-full md:w-80 border border-gray-200 flex-col rounded-lg bg-white `}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900 mb-4">
              Messages
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search Message..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {allUsers?.results.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={`flex items-center p-4  cursor-pointer border-b border-gray-100 transition-colors ${selectId === user.id ? "bg-gray-200" : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <img
                      src={user.other_user.profile_image || image}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {user.other_user.is_online && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {user.other_user.first_name}
                    </h4>
                    <div className="flex items-center justify-center bg-green-500 h-4 w-4 rounded-full text-xs text-white p-1 ">
                      {user.unread_count}
                    </div>
                  </div>
                  <div className="flex justify-between gap-10">
                    <p className="text-xs text-gray-500 truncate">
                      {user.last_message?.content}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {getLastActiveTime(user.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default ChatSidebar;
