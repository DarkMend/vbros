import { useToastStore } from "../../store/toastStore"
import { ToastContainer, toast } from 'react-toastify';

export default function ToastLayout() {
    const { isActive, content, type } = useToastStore();

    if(isActive){
        if(type === 'success'){
            toast.success(content);
        }
        if(type === 'error'){
            toast.error(content);
        }
    }

    return (
        <ToastContainer />
    )
}