import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, Head } from '@inertiajs/react';
import { IoMdArrowBack } from "react-icons/io";

export default function ErrorPage({ status }:{status:number}) {
    const title = {
      503: '503: Service Unavailable',
      500: '500: Server Error',
      404: '404: Page Not Found',
      403: '403: Forbidden',
      419: '419: Page Expired'
    }[status] 
  
    const description = {
        503: 'サービスが利用できません',
        500: 'サーバーエラーが発生しました',
        404: 'お探しのページは見つかりません',
        403: 'このページへのアクセスは禁止されています',
        419: 'ページの有効期限が切れました', 
    }[status] 


  
    return (
        <main className="flex items-center justify-center h-screen dark:bg-gray-900">
            <div className='/bg-amber-700'>
                <div className="w-[200px] mx-auto">
                    <ApplicationLogo />
                </div>
                
                <div className="text-slate-500 my-10 text-center">
                    <h1 className="font-bold text-[25px] ">{title}</h1>
                    <div>{description}</div>
                </div>

                <div className="my-10">
                    <Link href="/" className="flex items-center justify-center space-x-1 w-full text-center rounded-full bg-amber-400 p-3 shadow-lg">
                        <IoMdArrowBack />
                        <span>トップページ</span>
                    </Link>                    
                </div>

            </div>               
        </main>
    )
  }