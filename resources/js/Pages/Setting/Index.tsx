import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaUpLong } from 'react-icons/fa6';


// type User{
//     name:string
// }

export default function Index({auth}: PageProps<{}>) {
    return (
        <CommonLayout>
            <Head title="設定" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="/p-4 /sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-700">
                            {/* <GiBookCover size={26} /> */}
                            <h5 className="text-1.5xl ml-1 font-bold">設定</h5>
                        </div> 
                        <div className="p-5">
                            <div className="my-2">アカウント</div>
                            <ul className="border border-slate-300 rounded-md /space-y-2">
                                <li className="">
                                    <Link href={route('update.password')} className="flex items-center full p-5 border-b border-b-slate-300 /rounded-md">
                                        パスワード変更
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href={route('update.personal_id')} className="flex items-center full p-5 border-b border-b-slate-300">
                                        ユーザーID変更
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href={route('delete.account')} className="flex items-center full p-5 text-rose-500">
                                        アカウント削除
                                    </Link>
                                </li>
                            </ul> 

                            <div className="my-2">単語帳&単語カード</div>
                            <ul className="border border-slate-300 rounded-md /space-y-2">
                                {/* <li className="">
                                    <Link href="" className="flex items-center full p-5 border-b border-b-slate-300 /rounded-md">
                                        パスワード変更
                                    </Link>
                                </li>
                                <li className="">
                                    <Link href="" className="flex items-center full p-5 border-b border-b-slate-300">
                                        ユーザーID変更
                                    </Link>
                                </li> */}
                                <li className="">
                                    <Link href={route('category.index')} className="flex items-center full p-5">
                                        カテゴリ設定
                                    </Link>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
