import { toast } from "react-toastify";

interface ToastProps {
   msg: string;
   callback?: any;
   duration?: number;
}

export const errorPopUp = ({ msg, callback, duration }: ToastProps) => {
   toast.error(msg, {
      onClose: callback || "",
      autoClose: duration || 1500,
   });
};

export const successPopUp = ({ msg, callback, duration }: ToastProps) => {
   toast.success(msg, {
      onClose: callback || "",
      autoClose: duration || 1500,
   });
};
