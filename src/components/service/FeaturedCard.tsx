import { useState, type FC } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import RenderStars from "./RenderStars";
import CommonHeader from "@/common/header/CommonHeader";
import Paragraph from "@/common/header/Paragraph";
import { Link, useNavigate } from "react-router-dom";
import { slugify } from "@/help/help";
import { useAppSelector } from "@/redux/hooks";
import { selectToken } from "@/redux/featuresAPI/auth/auth.slice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BadgeCheck, TriangleAlert, X } from "lucide-react";

interface FeatureList {
  id?: string,
  category?: string,
  job_title?: string,
  provider?: string,
  location?: string,
  price?: number,
  rating?: number,
  reviews?: number,
  image?: string,
  verified?: boolean
}

export interface FeaturedCardProps {
  feature: FeatureList;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ feature }) => {
  // console.log("all features data ", feature.rating);

  const token = useAppSelector(selectToken);
  const navigate = useNavigate();
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleBookNow = () => {
    if (token) {
      if (feature.id) {
        navigate(`/user-dashboard/book-service/${feature.id}`, { state: { service: feature } });
      }
    } else {
      setShowAuthAlert(true);
    }
  };

  const id = feature.id || "";
  const provider = feature.provider || "Unknown Provider";
  const job_title = feature.job_title || feature.category || "Service";
  const price = feature.price ?? 0;
  const rating = Number(feature.rating) || 0;
  const reviews = feature.reviews ?? 0;

  return (
    <>
      <div className="p-4 border border-border rounded-[20px] flex flex-col h-full">
        {/* Image */}
        <div className="rounded-lg h-[120px] overflow-hidden mb-4">
          <img
            src={feature.image || "https://via.placeholder.com/400x300"}
            alt={feature.category || "Service"}
            className="w-full h-full rounded-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Link
            to={
              token
                ? `/user-dashboard/overview/${id}/`
                : `/provider/${slugify(provider)}/${id}`
            }
            state={{ service: feature }}
            className="cursor-pointer"
          >
            <CommonHeader className="!text-lg !leading-[28px] line-clamp-1 hover:text-[#1D4ED8] hover:underline line-clamp-1">
              {job_title}
            </CommonHeader>
          </Link>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-[#475569]">{provider}</p>
            {feature.verified && (
              <span className="text-[#FFC100] text-lg">
                <BadgeCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <span className="text-[#1D4ED8]">
              <HiOutlineLocationMarker />
            </span>
            <Paragraph className="!text-black/81">
              {feature.location || "N/A"}
            </Paragraph>
          </div>

          <div className="flex items-center gap-1">
            <RenderStars rating={rating} />
            <p className="">{rating.toFixed(1)}</p>
            <Paragraph className="!text-[#475569] !text-xs">
              ({reviews} Reviews)
            </Paragraph>
          </div>
        </div>

        <div className="py-4">
          <Paragraph className="!text-[#475569]">Start From</Paragraph>
          <CommonHeader className="!text-[#1D4ED8]">
            ${price.toFixed(2)}
          </CommonHeader>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={handleBookNow}
            className="px-4 sm:px-3 py-2 border border-border rounded-lg text-sm text-white transition bg-[#1D4ED8] hover:bg-blue-600 !flex-shrink-0 cursor-pointer"
          >
            Book Now
          </button>
          <Link
            to={
              token
                ? `/user-dashboard/overview/${feature.id}/`
                : `/provider/${slugify(feature.provider)}/${feature.id}`
            }
            state={feature}
          >
            <button
              className="px-4 py-2 border border-border rounded-lg text-sm transition !flex-shrink-0 text-[#0F172A] hover:text-blue cursor-pointer"
            >
              View Details
            </button>
          </Link>
        </div>
      </div>

      <AlertDialog open={showAuthAlert} onOpenChange={setShowAuthAlert}>
        <AlertDialogContent className="max-w-[500px] p-6 rounded-[24px] gap-0 border-none shadow-lg">
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShowAuthAlert(false)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <AlertDialogHeader className="flex flex-row items-start gap-4 space-y-0 text-left">
            <div className="flex-shrink-0 w-16 h-16 bg-rose-50 rounded-xl flex items-center justify-center">
              <TriangleAlert className="w-8 h-8 text-rose-500" />
            </div>
            <div className="flex flex-col gap-3">
              <AlertDialogTitle className="text-xl font-bold text-gray-900 leading-tight">
                Registration Alert !
              </AlertDialogTitle>
              <AlertDialogDescription className="text-sm md:text-lg text-gray-500 font-normal leading-relaxed">
                Booking is available for registered users. Create your free account to start your booking.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <AlertDialogFooter className="mt-8 flex gap-3 sm:justify-end">
            <AlertDialogCancel className="h-12 px-8 rounded-xl border border-gray-200 text-gray-900 font-medium hover:bg-gray-50 bg-white !cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate('/client-signup')}
              className="h-12 px-8 rounded-xl bg-[#111827] text-white font-medium hover:bg-gray-800 border-none !cursor-pointer"
            >
              Register
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeaturedCard;
