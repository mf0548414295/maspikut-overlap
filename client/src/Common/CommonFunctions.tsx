import { toast } from 'react-toastify';

export const errorToast = (message: string) => {
  toast.error(message, {
    position: 'bottom-left',
  });
};

export const successToast = (message: string) => {
  toast.success(message, {
    position: 'bottom-left',
  });
};
