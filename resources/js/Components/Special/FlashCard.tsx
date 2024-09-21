import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
// import { title } from 'process';
// import { FaArrowLeft } from "react-icons/fa";
// import { FaArrowRight } from "react-icons/fa";
// import { RxCross2 } from "react-icons/rx";
// import { DiVim } from 'react-icons/di';
// import { spawn } from 'child_process';
import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';

export default function FlashCard
    ({
        id,
        uuid,
        title,
        description,
        cards_length,
        access,
        access_name,
        access_view,
        user_name,
        user_img,
    }
    : 
    {
        id:number,
        uuid:string,
        title:string,
        description:string,
        cards_length:number,
        access:number,
        access_name:string,
        access_view:boolean,
        user_name:string,
        user_img:string,
    })
{
    return(
        <div>
            <div  key={id} className="block w-full h-fit mb-4 /border-2 /border-yellow-200 rounded-lg shadow-md overflow-hidden">

                <div className="flex w-full items-center h-8 bg-yellow-200 p-0.5">
                    {access_view &&
                        <div className="w-fit">
                            {access == 0 && <span className="block bg-slate-300 py-0.5 px-2 text-xs rounded-full">{access_name}</span>}
                            {access == 1 && <span className="block bg-slate-300 py-0.5 px-2 text-xs rounded-full">{access_name}</span>}
                        </div>                     
                    }
    
                    {/* <OperateFlashCardMenu uuid={flashcard.uuid} id={flashcard.id} Update={Update} /> */}
                    {/* <CreateFlashcardFavoriteForm id={flashcard.id} /> */}
                    <h5 className="text-1.5xl break-all pl-2 text-slate-600 text-bold">{title}</h5>
                    <div className="flex w-fit items-center ml-auto">
                        <FlashCardOperationDropDown id={id} uuid={uuid} />
                    </div>
                </div>


                <Link href={route('flashcard.show',uuid)} className="block w-full">
                    <div className="p-2">
                        {description != null ?
                            <div className="w-full text-xs">
                                <p>
                                    {description}
                                </p>
                            </div>
                            :
                            <div className="text-xs text-slate-500">
                                <i>概要はありません</i>
                            </div>
                        }
                    </div>
                        
                    <div className="flex w-full">
                        {/* <small className="mr-2">{flashcard.updated_at}</small> */}
                        <div className="flex items-center w-fit p-1 ml-auto">
                            <small className="block w-fit py-0.5 px-2 bg-slate-300 rounded-full text-xs">{cards_length}枚</small>
                            { user_img != null ?
                                <img src={'/storage/images/profile/' +  user_img} alt="s" className='w-5 h-5 ml-1 rounded-full' />
                            :
                                <div className="flex items-center justify-center w-8 h-8 ml-1 rounded-full bg-cyan-200">
                                    {user_name.substr(0,1)}
                                </div>
                            } 
                        </div>
                    </div>
                </Link>

                </div>
        </div>
    );
}