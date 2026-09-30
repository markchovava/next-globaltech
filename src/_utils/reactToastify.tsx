import { Bounce } from "react-toastify";
import type { ToastPosition } from "react-toastify";

export const reactToastifyDark = {
    position: "top-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
};