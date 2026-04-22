import w1 from "@/assets/images/w1.png";
import RenderStars from "../RenderStars";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import BigTitle from "@/common/header/BigTitle";
import type { FC } from "react";

const reviews = [
  {
    id: 1,
    name: "Fabio",
    date: "August 14, 2025",
    avatar: w1,
    rating: 4.5,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want .Mike did an excellent job fixing our kitchen cabinet doors and installing new handles. Very professional, arrived on time, and cleaned up after himself. Highly recommended! Very much recommended.",
  },
  {
    id: 2,
    name: "Fabio",
    date: "August 14, 2025",
    avatar: w1,
    rating: 5,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want . Very much recommended.",
  },
  {
    id: 3,
    name: "Fabio",
    date: "August 14, 2025",
    avatar: w1,
    rating: 2.3,
    text: "Mike Handyman Service is a great , he helped me through the problems that i really want . Very much recommended.",
  },
];
interface SingleProviderReviewProps {
  className?: string;
}
const SingleProviderReview: FC<SingleProviderReviewProps> = ({ className }) => {
  return (
    <div className=" pb-10">
      <BigTitle className={`text-[#212529] !text-2xl pb-5 mt-10 ${className}`}>
        Reviews
      </BigTitle>

      <div className="bg-white rounded-xl  border border-border p-7.5 flex flex-col gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="">
            <div className="flex items-center gap-3">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <CommonHeader className="font-semibold text-[#111827]">
                  {review.name}
                </CommonHeader>
                <div className="flex items-center gap-2">
                  <RenderStars rating={review.rating} />
                  <Paragraph className=" !text-[#6B7280]">
                    August 14, 2025
                  </Paragraph>
                </div>
              </div>
            </div>

            <CommonHeader className=" !font-normal text-[#0F172A] pt-4">
              {review.text}
            </CommonHeader>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleProviderReview;
