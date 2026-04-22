import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { Link } from "react-router-dom";
import type { UseFormTrigger } from "react-hook-form";

interface LoginSubmitProps {
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  step: number;
  onFinalSubmit: () => void;
  trigger: UseFormTrigger<any>;
  isLoading?: boolean;
}

const LoginSubmit: React.FC<LoginSubmitProps> = ({
  setSteps,
  step,
  onFinalSubmit,
  trigger,
  isLoading,
}) => {
  const handleClick = async () => {
    let fieldsToValidate: any[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "phone",
        "email",
        "city",
        "area",
        "password",
        "confirmPassword",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "service",
        "subCategory",
        "customService",
        "customSubCategory",
        "serviceLocation",
        "yearsExperience",
        "business_logo",
        "aboutService",
      ];
    } else if (step === 3) {
      fieldsToValidate = ["plan", "hourlyRate"];
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      if (step < 3) {
        setSteps((pre) => pre + 1);
      } else {
        // ✅ STEP 3 → API CALL HERE
        onFinalSubmit();
      }
    }
  };

  return (
    <div className="pt-5">
      <CommonButton
        type="button"
        isLoading={step === 3 ? isLoading : false}
        loadingText="Submitting..."
        onClick={handleClick}
        className={`mb-5 !w-[180px] !text-white transition ${step === 3 ? "bg-blue-500 hover:bg-blue-600" : "bg-[#18181B]"
          }`}
      >
        {step === 3 ? "Sign Up" : "Next"}
      </CommonButton>

      <CommonHeader className=" text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </CommonHeader>
    </div>
  );
};

export default LoginSubmit;





// import CommonButton from "@/common/button/CommonButton";
// import CommonHeader from "@/common/header/CommonHeader";
// import { Link } from "react-router-dom";

// interface LoginSubmitProps {
//   setSteps: React.Dispatch<React.SetStateAction<number>>;
//   step: number;
// }

// const LoginSubmit: React.FC<LoginSubmitProps> = ({ setSteps, step }) => {
//   return (
//     <div>
//       <div className="pt-5">
//         <CommonButton
//           type={step === 3 ? "submit" : "button"}
//           onClick={() =>
//             setSteps((pre) => {
//               if (pre < 3) return pre + 1;
//               return pre;
//             })
//           }
//           className="mb-5 !w-[180px] bg-[#18181B] text-white  transition"
//         >
//           Next
//         </CommonButton>

//         <CommonHeader className=" text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Sign In
//           </Link>
//         </CommonHeader>
//       </div>
//     </div>
//   );
// };

// export default LoginSubmit;
