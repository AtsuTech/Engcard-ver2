import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import DeleteUserForm from '../Profile/Partials/DeleteUserForm';
import DeleteAccountForm from '../Profile/Partials/DeleteAccountForm';
import BacKSetting from './Partials/BackSetting';
import { FaUserSlash } from "react-icons/fa";

export default function DeleteUser() {
    return (
        <CommonLayout>
            <Head title="アカウント削除" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                                <BacKSetting />
                                <FaUserSlash size={26} />
                                <h5 className="font-bold">アカウント削除</h5>
                            </div> 

                            <div className="px-3 py-10">
                                <DeleteAccountForm />    
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
