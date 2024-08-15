import React, { useEffect, useRef, FC, useState } from "react";
import SubMeanCategorySelect from "./SubMeanCategorySelect";
import CategorySelect from "./CategorySelect";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function UpdateSubMeanForm({ wordmean }: { wordmean:any }) {

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id: wordmean.id,
        word_mean: wordmean.word_mean,
        category_id: wordmean.category_id,
        _method: "patch",
    });


    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};

    const Update = (e: any) =>{
        e.preventDefault();
        patch(route("wordmean.update",data.id));
        DialogClose();
    }

    const Delete = (e: any) =>{
        e.preventDefault();

        destroy(route('wordmean.destroy',data.id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }

    return(
        <>
            
            <div>
            
                <div className="flex items-center border border-gray-300 rounded-md p-0.5">
                    <div className="block w-full rounded-md ml-1">{isOpen ? wordmean.word_mean : data.word_mean}</div>
                    <button className="block w-16 h-7 ml-1 bg-slate-400 text-white rounded" onClick={Delete}>削除</button>
                    <button className="block w-16 h-7 ml-1 border border-amber-500 bg-white text-amber-500 rounded" type="button" onClick={DialogOpen}>編集</button>
                </div>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                        <DialogTitle className="font-bold">サブの意味を編集</DialogTitle>
                        <Description>This will permanently deactivate your account</Description>
                        <div className="">
                            <div className="flex items-center w-full h-10 border border-gray-300 p-1 rounded focus-within:border-amber-400">
                                <CategorySelect selected={data.category_id} setData={setData} />
                                <input className="block w-full h-6 border-none rounded-md ml-1" type="text" name="word_mean" value={data.word_mean} onChange={(e) => setData('word_mean',e.target.value)} />
                            </div>
                            
                            <div className="flex mt-6 justify-end">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={() => setIsOpen(false)}>キャンセル</button>
                                <button className="block w-20 h-10 bg-amber-400 text-white rounded-full font-bold" onClick={Update}>変更</button>
                            </div>                              
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog> 
                   
            </div>
            
        </>
    );
}