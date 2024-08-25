import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import PrimaryButton from '../Component/PrimaryButton';


//データ型宣言
type Flashcard = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
    uuid: string;
};


export default function Index({ auth, flashcards }: PageProps<{ flashcards:Flashcard[] }>) {
    

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        user_id: auth.user.id,
        name:'',
        html_code:'',
        active:0,
    });

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        post(route("advertise.store"));
    }


    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">広告追加</h2>}
        >
            <Head title="広告追加" />
            <p>{}</p>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <form className="space-y-4" onSubmit={Submit}>
                            <div>
                                <label htmlFor="" className="mr-3">ステータス</label>
                                <select name="" className="border border-slate-300 rounded-md" id="" onChange={(e:any) => setData('active',e.target.value)}>
                                    <option value={0} >公開</option>
                                    <option value={1} >非表示</option>
                                </select>                                
                            </div>

                            <div>
                                <label htmlFor="">広告の名前</label>
                                <input type="text" className="block w-1/2 border border-slate-300 rounded-md" required onChange={(e) => setData('name',e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">HTML</label>
                                <textarea name="" className="block w-1/2 border border-slate-300 rounded-md" required onChange={(e) => setData('html_code',e.target.value)}></textarea>
                            </div>
                            <PrimaryButton>追加</PrimaryButton>
                        </form>
                        
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}