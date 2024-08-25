import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import Delete from './Delete';
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

//データ型宣言
type Advertisements = {
    id: number;
    name: string;
    user_id: number;
    active: string | null;
    html_code: string;
};


export default function Index({ auth, advertisements }: PageProps<{ advertisements:Advertisements[] }>) {


    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">アフィリエイト広告</h2>}
        >
            <Head title="アフィリエイト広告" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="w-full flex justify-end">
                        <Link href={route('advertise.create')}>
                            <button className="flex items-center space-x-2 bg-teal-700 text-white p-2">
                            <IoMdAdd />広告追加
                            </button>
                        </Link>                        
                    </div>
                    <table className="table-auto w-full border border-slate-400">
                        <tbody>
                            {advertisements.map((advertisement) => (
                                <tr key={advertisement.id} className="border border-slate-400">
                                    <td className="border border-slate-400 p-2">{advertisement.name}</td>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: advertisement.html_code }} />
                                    </td>
                                    <td className="border border-slate-400 p-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link href={route("advertise.edit",advertisement.id)}>
                                                <MdModeEdit />
                                            </Link>
                                            <Delete 
                                                id={advertisement.id} 
                                                name={advertisement.name}
                                                html_code={advertisement.html_code}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}                            
                        </tbody>
                    </table>


                    
                </div>
            </div>
        </AdminLayout>
    );
}