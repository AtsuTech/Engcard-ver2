import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';
import ChangePasswordForm from '../Profile/Partials/ChangePasswordForm';
import BacKSetting from './Partials/BackSetting';
import { PiPasswordFill } from "react-icons/pi";

export default function UpdatePassword() {
    return (
        <CommonLayout>
            <Head title="パスワード変更" />
            <div className="py-0 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="">
                            <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                                <BacKSetting />
                                <PiPasswordFill size={26} />
                                <h5 className="font-bold">パスワード変更</h5>
                            </div> 

                            <div className="px-3 py-10">
                                <ChangePasswordForm /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
