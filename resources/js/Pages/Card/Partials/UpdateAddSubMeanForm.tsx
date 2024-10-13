import React, { useEffect, useRef, FC, useState } from "react";
import SubMeanCategorySelect from "./SubMeanCategorySelect";
import CategorySelect from "./CategorySelect";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function UpdateAddSubMeanForm({card_id}:{card_id:number}){

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        card_id: card_id,
        word_mean: '',
        category_id: 1,
    });

    const Submit =(e:any)=>{
        e.preventDefault();
        post(route("wordmean.store"));
        DialogClose();
    }

    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};

    return(
        <>
            <div className="flex items-center w-full my-1">
                <button type="button" className="block ml-auto w-fit px-4 py-1 /h-10 bg-amber-300 text-slate-600 rounded-full" onClick={DialogOpen}>
                    追加
                </button>
            </div>
          
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                <DialogPanel className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md">
                    <DialogTitle className="font-bold dark:text-white">サブの意味を追加</DialogTitle>
                    <Description className="dark:text-white text-xs">サブの意味は5個まで登録可能です</Description>
                    <div className="">
                        <div className="">
                            <div className="flex items-center w-full h-10 border border-gray-300 p-1 rounded focus-within:border-amber-400">
                                <CategorySelect selected={data.category_id} setData={setData} />
                                <input className="block w-full h-6 border-none rounded-md ml-1" type="text" name="word_mean" value={data.word_mean} onChange={(e) => setData('word_mean',e.target.value)} />
                            </div>
                            
                            <div className="flex justify-end mt-3">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={DialogClose}>キャンセル</button>
                                <button className="block w-20 h-10 bg-amber-400 text-white rounded-full" onClick={Submit}>追加</button>
                            </div>                              
                        </div>            
                    </div>
                </DialogPanel>
                </div>
            </Dialog> 
        </>

    );


}
