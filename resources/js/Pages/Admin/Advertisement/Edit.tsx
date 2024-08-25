import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { title } from 'process';
import PrimaryButton from '../Component/PrimaryButton';


//データ型宣言
type Advertisement = {
    id: number;
    name: string;
    user_id: number;
    active: string | null;
    html_code: string;
};


//export default function Index({ auth, advertisement }: PageProps<{ advertisement:Advertisement }>) {
export default function Index({ auth, advertisement }: PageProps<{ advertisement:Advertisement }>) {  

    const { data, setData, patch, put, errors, processing, recentlySuccessful } = useForm({
        id: advertisement.id,
        user_id: auth.user.id,
        name: advertisement.name,
        html_code: advertisement.html_code,
        active: advertisement.active,
        _method: "patch",
    });
    
    // データ送信
    const Submit = (e: any) => {
        e.preventDefault();
        console.log(data);
        patch(route("advertise.update", data.id));
        //put(route("advertise.update", data.id));
    }


    return (
        <AdminLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">広告更新</h2>}
        >
            <Head title="広告更新" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div>
                        <form className="space-y-4" onSubmit={Submit}>
                            <div>
                                <label htmlFor="" className="mr-3">ステータス</label>
                                <select name="" className="border border-slate-300 rounded-md" id="" onChange={(e:any) => setData('active',e.target.value)}>
                                    <option value={0} selected={Number(data.active) === 0} >公開</option>
                                    <option value={1} selected={Number(data.active) === 1}>非表示</option>
                                </select>                                
                            </div>

                            <div>
                                <label htmlFor="">広告の名前</label>
                                <input 
                                    type="text" 
                                    className="block w-1/2 border border-slate-300 rounded-md" 
                                    required 
                                    value={data.name}
                                    onChange={(e) => setData('name',e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="">HTML</label>
                                <textarea 
                                    name="" 
                                    className="block w-1/2 border border-slate-300 rounded-md" 
                                    required 
                                    value={data.html_code}
                                    onChange={(e) => setData('html_code',e.target.value)}>
                                </textarea>
                            </div>
                            <PrimaryButton>保存</PrimaryButton>
                        </form>
                        
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}