import CommonButton from "@/common/button/CommonButton";
import CommonBorderWrapper from "@/common/space/CommonBorderWrapper";

const inputClass = {
  input:
    "w-full bg-white rounded-md p-3 text-black font-Geist text-base leading-[24px] border border-[#666666]/35  outline-none transition resize-none",
  label:
    "text-sm lg:text-base text-[#666]  font-Geist leading-[24px] block mb-2",
};
const PersonalForm = () => {
  return (
    <div className=" w-full">
      <CommonBorderWrapper className="p-8">
        <form className=" space-y-4">
          <div>
            <input
              type="text"
              className={inputClass.input}
              placeholder="Name"
            />
          </div>
          <div>
            <input
              type="email"
              className={inputClass.input}
              placeholder="Email"
            />
          </div>

          <div>
            <input
              type="text"
              className={inputClass.input}
              placeholder="Phone"
            />
          </div>
          <div>
            <textarea
              className={inputClass.input}
              placeholder="Message"
              rows={4}
            />
          </div>
          <CommonButton className=" !bg-[#18181B] !text-white">
            Send Message
          </CommonButton>
        </form>
      </CommonBorderWrapper>
    </div>
  );
};

export default PersonalForm;
