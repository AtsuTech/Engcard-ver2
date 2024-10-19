import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import NameAvotor from './NameAvator';
//import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
import FlashCardOperationDropDown from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
import { MdFavorite } from "react-icons/md";

export default function FlashCard
    ({
        id,
        uuid,
        title,
        description,
        cards_length,
        favorite,
        access,
        access_name,
        access_view,
        user_name,
        user_img,
        operation_allow,
    }
    : 
    {
        id:number,
        uuid:string,
        title:string,
        description:string,
        cards_length:number,
        favorite:number,
        access:number,
        access_name:string,
        access_view:boolean,
        user_name:string,
        user_img:string,
        operation_allow:boolean,
    })
{
    sessionStorage.removeItem('viewCounted');//閲覧記録のリセット
    return(
        <div>
            <div  key={id} className="block w-full h-fit mb-4 /border-2 /border-yellow-200 rounded-lg shadow-md overflow-hidden">

                <div className="flex w-full items-center h-8 bg-yellow-200 px-1 py-0.5">
                    {access_view &&
                        <div className="w-[50px]">
                            {access == 0 && <span className="block bg-slate-300 py-0.5 px-1 text-[9px] text-center rounded-full">{access_name}</span>}
                            {access == 1 && <span className="block bg-amber-400 py-0.5 px-1 text-[9px] text-center rounded-full">{access_name}</span>}
                        </div>                     
                    }
    
                    <h5 className="w-[calc(100%-80px)] md:text-1.5xl truncate break-all pl-2 text-slate-600 font-bold">
                        {title}
                    </h5>

                    {operation_allow && 
                        <div className="flex w-[30px] items-center ml-auto">
                            <FlashCardOperationDropDown id={id} uuid={uuid} item={title} />
                        </div>                    
                    }
                </div>


                <Link href={route('flashcard.show',uuid)} className="block w-full dark:bg-slate-700">
                    <div className="px-3 py-2">
                        {description != null ?
                            <div className="w-full text-xs dark:text-white">
                                <p className='truncate'>
                                    {description}
                                </p>
                            </div>
                            :
                            <div className="text-xs text-slate-500 dark:text-white">
                                <i>概要はありません</i>
                            </div>
                        }
                    </div>
                        
                    <div className="flex w-full">
                        {/* <small className="mr-2">{flashcard.updated_at}</small> */}
                        <div className="flex items-center w-fit p-1 space-x-1 ml-auto">
                            <small className="flex items-center w-fit py-0.5 px-2 bg-slate-200 rounded-full text-xs text-amber-500">
                                <MdFavorite />
                                <span className="text-slate-700">{favorite}</span>  
                            </small>
                            <small className="block w-fit py-0.5 px-2 bg-slate-200 rounded-full text-xs">{cards_length}枚</small>
                            { user_img != null ?
                                <img src={'/storage/images/profile/' +  user_img} alt="s" className='w-5 h-5 /ml-1 rounded-full' />
                            :
                                <div className="flex items-center justify-center w-5 h-5 ml-1 text-white text-xs rounded-full bg-slate-900">
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