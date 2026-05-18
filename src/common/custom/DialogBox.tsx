import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { type ReactNode } from "react";
import CommonButton from "../button/CommonButton";
import { cn } from "@/lib/utils";

interface IDialogBoxProps {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

const DialogBox: React.FC<IDialogBoxProps> = ({
  trigger,
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
      )}

      <DialogContent className={cn("!bg-white max-w-[95vw] sm:max-w-lg rounded-lg shadow-2xl duration-300", className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>}
            {description && <DialogDescription className="text-gray-500">{description}</DialogDescription>}
          </DialogHeader>
        )}

        <div className="py-4">
          {children}
        </div>

        {footer ? (
          <DialogFooter className="sm:justify-end gap-3">
            {footer}
          </DialogFooter>
        ) : (
          <DialogFooter className="sm:justify-end gap-2">
            <DialogClose asChild>
              <CommonButton variant="outline" className="cursor-pointer border border-border">
                Close
              </CommonButton>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
