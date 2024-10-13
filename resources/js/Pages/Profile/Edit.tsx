import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/CommonLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateProfileForm from './Partials/UpdateProfileForm';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { MdEdit } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export default function Edit({ auth, mustVerifyEmail, status }: PageProps<{ mustVerifyEmail: boolean, status?: string }>) {
    return (
        // <AuthenticatedLayout
        //     user={auth.user}
        //     header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Profile</h2>}
        // >
        <CommonLayout>
            <Head title="プロフィール編集" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* <div className="/p-4 /sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"> */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                            <FaUserEdit size={26} />
                            <h5 className="font-bold">プロフィール編集</h5>
                        </div> 
                        <div className="px-6 py-10"> 
                            {/* <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            /> */}
                            <UpdateProfileForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                    </div>

                    {/* <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <UpdateParsonalIdForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
                </div>
            </div>
        {/* </AuthenticatedLayout> */}
        </CommonLayout>
    );
}
