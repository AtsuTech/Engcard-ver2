import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import DeleteCategoryForm from './Partials/DeleteCategoryForm';
import UpdateCategoryForm from './Partials/UpdateCategoryForm';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { FaTags } from "react-icons/fa";
import BacKSetting from '../Setting/Partials/BackSetting';


//データ型宣言
type Categorys = {
    id: number;
    item: string;
};


export default function Index({ auth, categories }: PageProps<{ categories:Categorys[] }>) {

    return (
        <CommonLayout >
            <Head title="単語帳" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 sm:shadow sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b space-x-1 border-b-slate-300 text-slate-600 dark:text-white">
                            <BacKSetting />
                            <FaTags size={26} />
                            <h5 className="font-bold">カテゴリ管理</h5>
                        </div> 

                        <div className="px-3 space-y-1 py-10">
                            <ul className="">
                            {categories.map( (category:any) => (
                                <li  key={category.id} className="flex items-center w-full py-2 px-2 border border-gray-300 rounded-lg">
                                    <div className='dark:text-white'>{category.item}</div>
                                    <div className="flex ml-auto">
                                        <DeleteCategoryForm id={category.id} item={category.item} />
                                        <UpdateCategoryForm id={category.id} item={category.item} />
                                    </div>
                                </li>
                            ))}                        
                            </ul>

                            {categories.length == 0 &&
                                <div className="flex items-center justify-center h-64">
                                    <div>カテゴリはありません</div>
                                </div>
                            }                            
                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}