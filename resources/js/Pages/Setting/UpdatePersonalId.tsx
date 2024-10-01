import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';
import UpdateParsonalIdForm from '../Profile/Partials/UpdateParsonalIdForm';
import BacKSetting from './Partials/BackSetting';
import { HiIdentification } from "react-icons/hi2";


export default function UpdatePersonalId() {
    return (
        <CommonLayout>
            <Head title="ユーザーID変更" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="/p-5">
                            <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                                <BacKSetting />
                                <HiIdentification size={26} />
                                <h5 className="font-bold">ユーザーID変更</h5>
                            </div> 

                            <div className="px-3 py-10">
                                <UpdateParsonalIdForm />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
