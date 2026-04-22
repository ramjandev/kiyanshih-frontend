import React from "react";
import ChatComponents from "./ChatComponents";

const ChatInterface: React.FC = () => {
  return (
    <div className="h-[calc(100vh-220px)] flex  mt-5 mb-20 w-full">
      <div className="flex w-full max-w-full mx-auto bg-white overflow-hidden md:gap-x-2">
        <ChatComponents />
      </div>
    </div>
  );
};

export default ChatInterface;
