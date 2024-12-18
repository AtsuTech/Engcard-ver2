import { FC } from "react";
import { useState, useEffect} from "react";
//import { Link } from 'react-router-dom';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import axios,{AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';

export const CardOperation:FC<{id:any,uuid:any,reload:any}> = ({id,uuid,reload}) => {

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id:id,
    });

    const [deleteDialog,setDeleteDialog] = useState(false);
    const [toggle,setToggle] = useState(false);
    const display  = () => setToggle((prev) => !prev);

    //カード削除
    function Delete(e:any){
        e.preventDefault();

        destroy(route('card.destroy',id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
        display();
    }

    return(
        <div className="relative">
            <button className="text-slate-400 border border-1 border-gray-300 rounded-lg w-fit h-12 /px-1" onClick={display}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-6">
                <path fillRule="evenodd" d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                </svg>
            </button>
                            
            {/* 削除確認ダイアログ */}
            <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                <DialogPanel className="max-w-lg space-y-4 p-12 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
                    <DialogTitle className="font-bold">カード削除</DialogTitle>
                    <Description>本当によろしいですか？</Description>
                    <div className="flex space-x-2">
                        <button type="button" className="block px-3 h-8 bg-gray-400 text-white rounded-full font-bold" onClick={() => setDeleteDialog(false)}>
                            キャンセル
                        </button>
                        <button type="button" className="block px-3 h-8 bg-rose-600 text-white rounded-full font-bold" onClick={Delete}>
                            削除
                        </button>
                    </div>
                </DialogPanel>
                </div>
            </Dialog> 

            {toggle &&
                <ul className="flex absolute right-0 top-0 bg-slate-300 w-fit h-12 p-0 rounded-lg z-50">
                    <li>
                        <Link href={route('card.edit',uuid)} className="block w-full data-[focus]:bg-amber-200 px-2 rounded-lg">
                            <div className="w-fit px-4 ml-auto mr-auto h-4/5bg-green-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                    <li onClick={() => setDeleteDialog(true)}>
                        <div className="/flex">
                            <div className="w-fit px-4 ml-auto mr-auto /bg-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                </svg>                                
                            </div>
                        </div>
                    </li>
                    <li>
                        <button className="w-fit px-4 ml-auto mr-auto /bg-amber-500" onClick={display}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-12">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </li>
                </ul>
            }


        </div>
    );
}