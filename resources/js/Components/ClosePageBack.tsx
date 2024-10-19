import { IoMdArrowBack } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

export default function ClosePageBack() {
    

    const preBack =()=>{
        window.history.back();
    }

    return(
        <div>
            <button onClick={preBack} className="block text-slate-800 ">
                <IoCloseOutline size={26} />
            </button>
        </div>

    );
}