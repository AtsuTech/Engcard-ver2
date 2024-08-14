import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import CreateCardForm from '../Card/Partials/CreateCardForm';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import { createContext } from 'react';

//データ型宣言
type Access = {
    id: number;
    name: string;
};

//データ型宣言
type Category = {
    id: number;
    item: string;
};

//データ型宣言
type Flashcard = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
};

//孫コンポーネントにコンテキストでカテゴリのデータ渡す
export const CategoryContext = createContext({});

export default function Edit({ auth, accesses, categories, flashcard }: PageProps<{ accesses:Access[], categories:Category[], flashcard: Flashcard }>) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: flashcard.id,
        title: flashcard.title,
        access_id: flashcard.access_id,
        description: flashcard.description,
        _method: "patch",
    });

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        patch(route("flashcard.update",data.id));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">単語帳を編集</h2>}
        >
            <Head title="単語帳を編集" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <form onSubmit={Submit} className="">
                        <div className="flex py-2">

                            <div className="w-fit">
                                <ul className="flex w-fit h-8 text-sm text-gray-700 border border-gray-300 rounded-lg overflow-hidden" aria-labelledby="dropdownDefaultButton">
                                    {accesses.map( (access:any) =>(
                                        <li className="flex items-center w-fit" key={access.id}>
                                            <input type="radio" name="access" value={access.id}
                                                onChange={(e) => setData('access_id', Number(e.target.value))}
                                                checked={data.access_id == access.id } 
                                                required 
                                                className="sr-only peer"
                                                id={access.id}
                                            />

                                            <label htmlFor={access.id} className="w-20 h-10 text-xs text-center focus:outline-none peer-checked:bg-amber-400 peer-checked:text-white flex items-center justify-center">
                                                {access.name}
                                            </label>

                                        </li>
                                    )) }
                                </ul> 
                            </div>

                        </div>
                            
                        <label htmlFor="" className="block mt-3 text-sm">タイトル</label>
                        <input type="text" 
                            className="w-full h-10 border border-gray-300 rounded-lg pl-2" 
                            placeholder="タイトル" 
                            value={data.title}
                            name="title"
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        /> 

                        <label htmlFor="" className="block mt-3 text-sm">概要</label>
                        <textarea 
                            name="description" 
                            id="" 
                            className="w-full h-32 border border-gray-300 rounded-lg pl-2 /mt-1"
                            onChange={(e) => setData('description', e.target.value)}
                            value={data.description==null ? "":data.description}
                        >
                        </textarea>

                        <div className="mt-2">
                            <DesignedPrimaryButton>保存</DesignedPrimaryButton>
                        </div>
                                            
                    </form>  
                    <CategoryContext.Provider value={categories}>
                        <CreateCardForm id={data.id} />
                    </CategoryContext.Provider>                    

                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
