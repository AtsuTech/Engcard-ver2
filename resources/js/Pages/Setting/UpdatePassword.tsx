import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import UpdatePasswordForm from '../Profile/Partials/UpdatePasswordForm';


export default function UpdatePassword() {
    return (
        <CommonLayout>
            <Head title="パスワード変更" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-5">
                            <Link href={route('setting')} className="">
                                設定に戻る
                            </Link>
                            <UpdatePasswordForm />
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
