import React, { useEffect, useRef, FC, useState } from "react";
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { title } from 'process';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { RiDeleteBin5Fill } from "react-icons/ri";


export default function Delete({ id,name,html_code }: {id:number,name:string,html_code:string }) {
    

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        id: id,
    });

    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        destroy(route('advertise.destroy',data.id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }


    return (
        <>
            <button onClick={DialogOpen}className="">
                <RiDeleteBin5Fill/>
            </button>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                    <DialogTitle className="font-bold">広告を削除</DialogTitle>
                    <Description>{name}</Description>
                    <div className="">
                        <div dangerouslySetInnerHTML={{ __html: html_code }} />
                        <div className="flex mt-6 justify-end">
                            <button onClick={Submit} className="bg-rose-600 text-white p-2 rounded-md">削除</button>
                        </div>                              
                    </div>
                </DialogPanel>
                </div>
            </Dialog> 
        </>
       
    );
}