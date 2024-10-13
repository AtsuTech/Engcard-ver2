import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function UpdateCategoryForm({ id, item }: { id:number, item:string }) {

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id: id,
        item: item,
        _method: "patch",
    });


    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};


    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        patch(route("category.update",data.id), {
            preserveScroll: true,  // このオプションでスクロールを防ぐ
        });
        DialogClose();
    }

    // const Delete = (e: any) =>{
    //     e.preventDefault();

    //     destroy(route('wordmean.destroy',data.id), {
    //         preserveScroll: true,
    //         onFinish: () => reset(),
    //     });
    // }

    return(
        <>
            
            <div>
            
                <button className="block w-16 h-7 ml-1 bg-amber-400 text-white rounded" type="button" onClick={DialogOpen}>編集</button>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                    <DialogPanel className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md">
                        <DialogTitle className="font-bold dark:text-white">カテゴリを編集</DialogTitle>
                        <div className="">
                            <input className="block w-full h-10 border border-slate-300 rounded-md ml-1" type="text" name="word_mean" value={data.item} onChange={(e) => setData('item',e.target.value)} />
                            
                            <div className="flex mt-6 justify-end">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={() => setIsOpen(false)}>キャンセル</button>
                                <button className={`block w-20 h-10 text-white rounded-full font-bold 
                                    ${data.item === "" ? 'bg-amber-300 cursor-not-allowed' : 'bg-amber-400'}`}
                                    disabled={data.item === ""} onClick={Submit}>
                                    変更
                                </button>
                            </div>                              
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog> 
                   
            </div>
            
        </>
    );
}