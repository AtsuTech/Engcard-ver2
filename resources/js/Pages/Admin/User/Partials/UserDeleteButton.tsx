import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function UserDeleteButton({id}:{id:any}){


    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id:id,
    });

    const [open,setOpen] = useState(false);

    const UserDelete =(e:any)=>{
        e.preventDefault();
        destroy(route('user.destroy',id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }

    return(
        <>
            <button onClick={()=>setOpen(true)}>
                de
            </button>

            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                <DialogPanel className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md">
                    <DialogTitle className="font-bold dark:text-white">ユーザー削除</DialogTitle>
                    <Description className="dark:text-white text-xs">このユーザーを削除して本当によろしいですか？</Description>
                    <div className="">
                        <div className="">
                            
                            <div className="flex justify-end mt-3">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={()=>setOpen(false)}>キャンセル</button>
                                <button className="block w-20 h-10 bg-rose-600 text-white rounded-full" onClick={UserDelete}>削除</button>
                            </div>                              
                        </div>            
                    </div>
                </DialogPanel>
                </div>
            </Dialog> 
        </>
    );

}