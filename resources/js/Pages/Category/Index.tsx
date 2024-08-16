import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DeleteCategoryForm from './Partials/DeleteCategoryForm';
import UpdateCategoryForm from './Partials/UpdateCategoryForm';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";




//データ型宣言
type Categorys = {
    id: number;
    item: string;
};


export default function Index({ auth, categories }: PageProps<{ categories:Categorys[] }>) {
    

    // const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
    //     id: flashcard.id,
    //     title: flashcard.title,
    //     access_id: flashcard.access_id,
    //     description: flashcard.description,
    //     _method: "patch",
    // });

    //データ送信
    // const Submit = (e :any) =>{
    //     e.preventDefault();
    //     patch(route("flashcard.update",data.id));
    // }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">カテゴリ</h2>}
        >
            <Head title="単語帳" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <ul>
                    {categories.map( (category:any) => (
                        <li  key={category.id} className="flex w-full py-3 px-2 border-b border-b-slate-400 /rounded-lg">
                            <div>{category.item}</div>
                            <div className="flex ml-auto">
                                <DeleteCategoryForm id={category.id} item={category.item} />
                                <UpdateCategoryForm id={category.id} item={category.item} />
                            </div>
                        </li>
                    ))}                        
                    </ul>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}