import { FC,useRef, } from "react";
import { useState, useEffect} from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle, Transition,  TransitionChild} from '@headlessui/react';
import Card from "@/Components/Special/Card";
import { fail } from "assert";
import { IoMdClose } from "react-icons/io";
import { IoOpenOutline } from "react-icons/io5";
import Bage from "@/Components/Bage";


interface CardProps {
    id: any;
    uuid: any;
    memory: any;
    word: any;
    word_mean: any;
    category: any;
    sub_word_mean: any;
    sentence: any;
    sentence_mean: any;
    link: any;
    user_id: any;
    flashcard_id: any;
    img_path: any;
}




export const CardList:FC<CardProps> = ({
    id,
    uuid,
    memory,
    word,
    word_mean,
    category,
    sub_word_mean,
    sentence,
    sentence_mean,
    link,
    user_id,
    flashcard_id,
    img_path}) =>{

    //モーダル開閉
    const [cardModal,setCardModal] = useState(false);


    return(
        <>
        <div className="w-full"  key={id}>
            {/* <Link to={`/card/${uuid}`} key={id} className="w-full"> */}
                <div className="flex h-12 border w-full /bg-white border-gray-300 overflow-hidden rounded-lg" onClick={() => setCardModal(true)}>

                    {/* left */}
                    <div className="flex items-center w-[calc(50%-0px)] border-r border-gray-300 pr-1">

                        <div className="w-4 h-full">
                            <div className="flex w-4 h-full items-center justify-center border-r border-gray-300">
                                <div className={`w-2 h-2  rounded-full ${memory ? 'bg-amber-400' : 'bg-gray-400'}`}>
                                </div>
                            </div>                            
                        </div>


                        <p className="w-full pl-2 truncate">
                            <span className="text-sm">{word}</span>
                        </p>

                        {img_path &&
                            <div className="w-[50px]">
                                <img src={location.protocol + '//' + window.location.host + img_path} alt="" className="block w-[40px] ml-auto h-10 rounded-lg" />  
                            </div>
                        }   
                    </div>

                    {/* right */}
                    <div className="w-1/2 h-12 flex items-center">
                        <p className="ml-[3px] line-clamp-1 /truncate">
                            {category != null &&
                                <Bage text={category} />
                            }
                            <span className="text-sm">{word_mean}</span>
                        </p>
                    </div>

                </div>
            {/* </Link> */}

            <Dialog
                as="div"
                id="modal"
                className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
                open={cardModal} onClose={() => setCardModal(false)}
            >
                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-gray-300/75 dark:bg-gray-900/75" />
                </TransitionChild>

                <TransitionChild
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <DialogPanel
                        className={`mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full mx-auto max-w-96 sm:mx-auto`}
                    >
                        <div className="flex p-1">
                            <button className="text-slate-600" onClick={() => setCardModal(false)}>
                                <IoMdClose size={22} />
                            </button>
                            {/* <Link href={route('card.show',uuid)} className="ml-auto flex items-center justify-center text-amber-500 /bg-amber-400 /text-white w-6 h-6 rounded-full">
                                <IoOpenOutline size={22} />
                            </Link> */}
                            <a 
                                href={location.protocol + '//' + window.location.host +'/card/'+uuid} target="_blank" rel="noopener noreferrer"
                                className="ml-auto flex items-center justify-center text-amber-500"
                            >
                                <IoOpenOutline size={22} />
                            </a>
                        </div>

                        <Card
                            memory="Apple"
                            //imgflag={true}
                            img_path={img_path}
                            word={word}
                            word_mean={word_mean}
                            category={category}
                            sub_word_mean={sub_word_mean}
                            sentence={sentence}
                            sentence_mean={sentence_mean}
                            link={link}
                        />      
                    </DialogPanel>
                </TransitionChild>
            </Dialog>


            {/* <Dialog open={cardModal} onClose={() => setCardModal(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-gray-300/50">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                    <DialogTitle className="font-bold">サブの意味を編集</DialogTitle>
                    <Description>This will permanently deactivate your account</Description>

                    <Card
                        memory="Apple"
                        //imgflag={true}
                        img_path={img_path}
                        word={word}
                        word_mean={word_mean}
                        category={category}
                        sub_word_mean={sub_word_mean}
                        sentence={sentence}
                        sentence_mean={sentence_mean}
                        link={link}
                    />      
                </DialogPanel>
                </div>
            </Dialog>  */}
            
        </div>
        </>
    );
}