import CommonWrapper from "@/common/space/CommonWrapper";
import ChatInterface from "@/components/message/ChatInterface";

const UserMessage = () => {
  return (
    <CommonWrapper>
      <div className="h-full flex items-center justify-center pb-10">
        <ChatInterface />
      </div>
    </CommonWrapper>
  );
};

export default UserMessage;
