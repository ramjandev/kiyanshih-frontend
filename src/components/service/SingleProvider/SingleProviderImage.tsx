import w1 from "@/assets/images/w1.png";
import w2 from "@/assets/images/w2.png";
import w3 from "@/assets/images/w3.png";

const SingleProviderImage = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row items-stretch gap-6 py-10">
      {/* Left big image */}
      <div className="lg:flex-[1.5] flex-1 bg-[linear-gradient(0deg,rgba(0,0,0,0.10)_0%,rgba(0,0,0,0.10)_100%)] overflow-hidden rounded-3xl">
        <img
          className="rounded-3xl w-full h-full object-cover max-h-[576px]"
          src={w1}
          alt=""
        />
      </div>

      {/* Right two stacked images */}
      <div className="lg:flex-1 flex flex-col gap-6">
        <img
          className="w-full h-full max-h-[273px] rounded-3xl object-cover bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
          src={w2}
          alt=""
        />
        <img
          className="w-full h-full max-h-[273px] rounded-3xl object-cover bg-[linear-gradient(0deg,rgba(0,0,0,0.20)_0%,rgba(0,0,0,0.20)_100%)]"
          src={w3}
          alt=""
        />
      </div>
    </div>
  );
};

export default SingleProviderImage;
