import React, { useEffect, useRef, FC, useState } from "react";
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

export default function CreateCategoryForm({}: {}) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        user_id: '',
        item: '',
        _method: "post",
    });

    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};

    //データ追加
    const Submit = (e: any) => {
        e.preventDefault();
        post(route("category.store"), {
            preserveScroll: true,  // このオプションでスクロールを防ぐ
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };


    return(
        <div>
            <button type="button" 
                className="block w-full h-10 bg-amber-400 text-white rounded-md font-bold text-sm"
                onClick={DialogOpen}>
                新規追加
            </button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                    <DialogTitle className="font-bold">カテゴリを追加</DialogTitle>
                    {/* <Description>This will permanently deactivate your account</Description> */}
                    <form onSubmit={Submit}>
                        <input 
                            type="text" 
                            className="border border-gray-300 rounded-md"
                            value={data.item} 
                            onChange={(e)=>setData('item',e.target.value)}  
                        />
                        <div className="flex justify-end w-full py-2 space-x-2">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 text-sm"
                                type="button"
                            >
                                キャンセル
                            </button>
                            <button 
                                className={`block w-20 h-10 text-white rounded-full font-bold text-sm 
                                    ${data.item === "" ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-400'}`}
                                disabled={data.item === ""}
                                onClick={Submit}
                                type="button"
                            >
                                追加
                            </button>
                        </div>
                    </form>
                </DialogPanel>
                </div>
            </Dialog> 
        </div>
        
    );
}