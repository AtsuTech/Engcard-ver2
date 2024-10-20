import { FC } from "react";
import { IoMdArrowBack } from "react-icons/io";

export const PageBack:FC = () => {

    const preBack =()=>{
        window.history.back();
    }

    return(
        <div>
            <div className="flex my-2">
                <button onClick={preBack} className="bg-slate-300 p-1 rounded-full">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg> */}
                    <IoMdArrowBack size={15} />
                </button>
            </div>            
        </div>

    );
}