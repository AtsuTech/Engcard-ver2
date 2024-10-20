import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import { MdModeEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import UserDeleteButton from './Partials/UserDeleteButton';
import { spawn } from 'child_process';

//データ型宣言
type Users = {
    id: number;
    email: string;
    name: string;
    admin_id: number;
};


export default function Index({ auth, all_user }: PageProps<{ all_user:Users[] }>) {


    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">ユーザー管理</h2>}
        >
            <Head title="ユーザー管理" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="w-full flex justify-end">
                        全ユーザー数:<b>{all_user.length}</b>            
                    </div>
                    <table className="table-auto w-full border border-slate-400">
                        <thead className="border border-slate-400 bg-slate-500 text-white">
                            <th className="border border-slate-400" >名前</th>
                            <th className="border border-slate-400">e-mail</th>
                            <th className="border border-slate-400">操作</th>
                        </thead>
                        <tbody>
                            {all_user.map((user) => (
                                <tr key={user.id} className="border border-slate-400">
                                    <td className="border border-slate-400 p-2">
                                        <div className="flex items-center space-x-2">
                                            {user.admin_id == 1 &&
                                                <span className='bg-cyan-600 text-white text-[8px] p-1 rounded-md'>管理ユーザー</span>
                                            }
                                            <span className=''>{user.name}</span>
                                        </div>
                                    </td>
                                    {/* <td>
                                        <div dangerouslySetInnerHTML={{ __html: advertisement.html_code }} />
                                    </td> */}
                                    <td className="border border-slate-400 p-2">
                                        {user.email}
                                    </td>
                                    <td className="border border-slate-400 p-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            {user.admin_id != 1 ?
                                                <UserDeleteButton id={user.id} />
                                                :
                                                <div className='text-sm'>操作不可</div>
                                            }
                                            
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