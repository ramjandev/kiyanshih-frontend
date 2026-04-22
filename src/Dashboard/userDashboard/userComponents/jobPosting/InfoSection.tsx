import UserSectionHeader from "../reuseable/UserSectionHeader";

interface InfoSectionProps {
  image: string;
  title: string;
  subtitle: string;
  className?: string;
}

const InfoSection = ({
  image,
  title,
  subtitle,
  className,
}: InfoSectionProps) => {
  return (
    <div
      className={` flex flex-col items-center justify-center gap-5 ${
        className || ""
      }`}
    >
      <img src={image} className="max-w-15" alt={title} />
      <UserSectionHeader
        className="!text-center  flex justify-center"
        title={title}
        subtitle={subtitle}
      />
    </div>
  );
};

export default InfoSection;
