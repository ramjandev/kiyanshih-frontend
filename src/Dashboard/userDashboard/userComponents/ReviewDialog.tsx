import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

const ReviewDialog: React.FC<{ open: boolean; onOpenChange: (open: boolean) => void }> = ({
  open,
  onOpenChange,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    console.log("Submitted review:", { rating, feedback });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            How would you rate your overall experience?
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Share your thoughts to help others make the right choice.
          </DialogDescription>
        </DialogHeader>

        {/* Rating Stars */}
        <div className="flex justify-center gap-2 py-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                (hover ?? rating ?? 0) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            />
          ))}
        </div>

        {/* Feedback textarea */}
        <div className="space-y-2">
          <label
            htmlFor="feedback"
            className="text-sm font-medium text-gray-700"
          >
            Can you tell us more?
          </label>
          <textarea
            id="feedback"
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full min-h-[100px] resize-none rounded-md border border-gray-300 p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer w-1/2"
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer w-1/2"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
