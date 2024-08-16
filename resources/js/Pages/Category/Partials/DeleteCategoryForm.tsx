import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function DeleteCategoryForm({ id, item }: { id:number, item:string }) {

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id: id,
        item: item,
        _method: "patch",
    });


    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};


    //データ送信
    // const Submit = (e :any) =>{
    //     e.preventDefault();
    //     patch(route("category.update",data.id), {
    //         preserveScroll: true,  // このオプションでスクロールを防ぐ
    //     });
    //     DialogClose();
    // }

    const Submit = (e: any) =>{
        e.preventDefault();

        destroy(route('category.destroy',data.id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }

    return(
        <>
            
            <div>
            
                <button className="block w-16 h-7 ml-1 bg-rose-600 text-white rounded" type="button" onClick={DialogOpen}>削除</button>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                        <DialogTitle className="font-bold text-rose-600">カテゴリを削除</DialogTitle>
                        <Description className="text-sm">
                            "{item}"を削除します。本当によろしいですか？
                        </Description>
                        <div className="">
                            
                            <div className="flex mt-6 justify-end">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={() => setIsOpen(false)}>キャンセル</button>
                                <button className="block w-20 h-10 bg-rose-600 text-white rounded-full font-bold" onClick={Submit}>削除</button>
                            </div>                              
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog> 
                   
            </div>
            
        </>
    );
}