import CommonLayout from '@/Layouts/CommonLayout';
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
        <CommonLayout >
            <Head title="単語帳" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="/p-4 /sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            {/* <MdEdit size={26} /> */}
                            <h5 className="font-bold">カテゴリ管理</h5>
                        </div> 

                        <ul className="px-3 space-y-1 py-10">
                        {categories.map( (category:any) => (
                            <li  key={category.id} className="flex items-center w-full py-2 px-2 border border-gray-300 rounded-lg">
                                <div>{category.item}</div>
                                <div className="flex ml-auto">
                                    <DeleteCategoryForm id={category.id} item={category.item} />
                                    <UpdateCategoryForm id={category.id} item={category.item} />
                                </div>
                            </li>
                        ))}                        
                        </ul>

                        {categories.length == 0 &&
                            <div className="py-64 flex items-center justify-center">
                                <div>まだカテゴリはありません</div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}