//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { TfiWrite } from "react-icons/tfi";

export default function Create({ auth, accesses }: PageProps<{ accesses: any }>) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        title: '',
        access_id: '',
        description: '',
        _method: "post",
    });

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        post(route("flashcard.store"));
    }


    return (
        <CommonLayout>
            <Head title="単語帳を作成" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b-2 border-b-amber-300 text-slate-700">
                            {/* <GiBookshelf size={26} /> */}
                            <TfiWrite size={26} />
                            <h5 className="text-xl ml-1 font-bold">単語帳作成</h5>
                        </div> 
                        <form onSubmit={Submit} className="block w-full px-5 py-7 space-y-6 text-slate-700">

                            <div>
                                <label className="block w-full my-1 text-xs">単語帳の名前を入力(後からでも名前を変更できます)</label>
                                <input type="text" className="w-full h-10 border border-gray-300 rounded-lg pl-2 /text-2xl" 
                                    placeholder="タイトル" 
                                    name="title"
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />                                
                            </div>

                            <div>
                                <label className="block w-full my-1 text-xs">公開ステータス</label>
                                <div className="flex w-full h-fit">
                                    {accesses.map( (access:any) =>(
                                        <div key={access.id} className="relative flex w-full ">
                                            <input type="radio" name="access" value={access.id}
                                                onChange={(e) => setData('access_id', e.target.value)}
                                                checked={access.id == data.access_id} 
                                                required
                                                className="sr-only peer"
                                                id={access.id}
                                            />

                                            <label htmlFor={access.id} className="block w-full h-14 pl-2 pt-1 border border-gray-300 rounded-lg mr-1 /leading-7 focus:outline-none peer-checked:border-2 peer-checked:border-yellow-400">
                                                {access.name}<br/>
                                                <small className="text-xs text-gray-400">{access.description}</small>
                                            </label>

                                            <div className="hidden p-2.5 absolute right-0 peer-checked:block">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 md:w-9 h-6 md:h-9 text-amber-400">
                                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                    )) }                    
                                </div>                                
                            </div>

                            <div>
                                <label htmlFor="" className="block w-full my-1 text-xs">概要(記載は省略できます)</label>
                                <textarea id="" cols={30} rows={10} name="description"
                                    className="w-full h-32 border border-gray-300 rounded-lg p-2"
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="単語帳についての説明など" >
                                </textarea>                                
                            </div>

                            <button className="inline-flex w-full items-center text-center mt-4 px-4 py-2 bg-amber-400 dark:bg-gray-200 border border-transparent rounded-full font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                                作成
                            </button>

                        </form>                        
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
