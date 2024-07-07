import { ReactNode } from 'react';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error';

const toaster = (message: ReactNode, type: ToastType) => {
  toast[type](message, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const successToast = (message: ReactNode) => {
  toaster(message, 'success');
};

export const failureToast = (message: ReactNode) => {
  toaster(message, 'error');
};
