import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Dashboard({ auth }: PageProps) {
    return (
        <CommonLayout>
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b-2 border-b-amber-300 text-slate-700">
                            {/* <GiBookshelf size={26} /> */}
                            <h5 className="text-xl /ml-1 font-bold">ダッシュボード</h5>
                        </div> 

                        <section className="p-5">
                            <p>{auth.user.name}</p>
                            <p>{auth.user.comment}</p>
                            <img src={auth.user.profile_photo_path} alt="" />
                        </section>
                        
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
