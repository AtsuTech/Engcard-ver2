import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Card from '@/Components/Special/Card';
import React, { useEffect, useRef, FC, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Welcome({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    const[toggleMenu,setToggleMenu] = useState(false)

    return (
        <>
            <Head title="ようこそ" />
            <div 
                style={{ backgroundImage: `url('/images_materials/wallpaper.jpg')` }}
                className="text-black/50 /bg-[url('https://cdn.pixabay.com/photo/2018/01/11/21/27/desk-3076954_1280.jpg')] 
                bg-no-repeat bg-cover h-screen"
            >
                {/* <img id="background" className="absolute -left-20 top-0 max-w-[877px]" src="https://cdn.pixabay.com/photo/2018/01/11/21/27/desk-3076954_1280.jpg" /> */}
                <div className="w-full min-h-screen selection:bg-[#f7ea78] selection:text-white">
                    <div className="w-full relative px-2 lg:px-20">

                        <header className="sticky top-3 w-full /bg-amber-300/90 p-2 rounded-md z-40">
                            <div className="flex items-center w-full">
                                <div className="flex justify-center">
                                    <div className="w-28">
                                        <ApplicationLogo />
                                    </div>
                                </div>

                                {/* <div className='text-sm space-x-3 mx-2 hidden sm:block'>
                                    <Link href={route('privacy.policy')}>
                                        プライバシーポリシー
                                    </Link>
                                    <Link href={route('terms.of.service')}>
                                        利用規約
                                    </Link>
                                </div> */}

                                <nav className="absolute right-2 flex items-center justify-end">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="flex items-center rounded-full p-1 text-slate-600 ring-1 ring-transparent transition bg-white hover:bg-amber-200"
                                        >
                                            {auth.user &&
                                                <div>
                                                {auth.user.profile_photo_path != null ?
                                                    <img src={'/storage/images/profile/' + auth.user.profile_photo_path} alt="" className='w-8 h-8 rounded-full' />
                                                :
                                                    <div className="flex items-center justify-center w-8 h-8 ml-1 rounded-full text-white bg-slate-900">
                                                        {auth.user.name.substr(0,1)}
                                                    </div>
                                                } 
                                                </div>
                                            }
                                            <span className='text-xs px-2'>ダッシュボード</span>
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('login')}
                                                className="text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-0 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                            >
                                                ログイン
                                            </Link>
                                        </>
                                    )}

                                    {/* <div className='flex items-center text-sm space-x-3 mx-2 sm:hidden'>
                                        <button onClick={()=>setToggleMenu(true)}>
                                            <AiOutlineMenu size={26} />
                                        </button>
                                        {toggleMenu &&
                                            <div className='fixed top-0 right-0 bg-black/90 w-full h-screen z-50'>
                                                <div className='flex justify-end items-center h-20 pr-5 w-full'>
                                                    <button 
                                                        onClick={()=>setToggleMenu(false)}
                                                        className='text-white'
                                                    >
                                                        <AiOutlineMenu size={26} />
                                                    </button>
                                                </div>


                                                <ul className='text-white my-10 text-center'>
                                                    <li>
                                                        <Link href={route('privacy.policy')}>
                                                            プライバシーポリシー
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>                                            
                                        }

                                    </div> */}
                                </nav>

                                
                            </div>
                        </header>

                        <main className="flex items-center justify-center h-[calc(100vh-58px)]">
                            <div className="lg:flex p-10 sm:p-0 items-center justify-center /h-[calc(100vh-58px)]">
                                <section className="flex flex-col items-center justify-center gap-6 overflow-hidden p-6 text-center duration-300 md:row-span-3 lg:p-10 lg:pb-10">
                                
                                    <h1 className="text-[23px] sm:text-4xl text-white /animate-bounce">
                                        英単語をどんどん覚えよう
                                    </h1>
                                    <p className="text-[13px] sm:text-[20px] text-white">Engcardは英単語の暗記に特化した単語帳サービスです</p>

                                    <Link
                                        href={route('register')}
                                        //className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        className="flex items-center space-x-3 text-slate-800 bg-amber-400 hover:bg-amber-500 font-medium rounded-full text-xl px-6 py-2.5 me-2 mb-2"
                                    >
                                        <span>アカウント作成</span>
                                        <FaLongArrowAltRight />
                                    </Link>
                                </section>

                                <section className='w-[300px] sm:w-96 mx-auto'>
                                    <Card
                                        memory="true"
                                        //imgflag={true}
                                        img_path={"https://cdn.pixabay.com/photo/2022/01/22/16/54/book-6957870_1280.jpg"}
                                        word="learn"
                                        word_mean="学ぶ"
                                        category="動詞"
                                        sub_word_mean={[]}
                                        sentence="Some people learn by studying alone."
                                        sentence_mean="独学で学ぶ人たちもいる"
                                        link="engcard.com"
                                    />
                               
                                </section>
                            </div>

                            
                        </main>

                        
                    </div>


                    
                        <section className="bg-slate-200">
                            <div className='max-w-5xl mx-auto px-5'>
                            <div className="lg:px-20 py-10">
                                <h2 className="py-8 text-3xl text-center text-slate-900">Engcardとは？</h2>
                                <div className="flex flex-col-reverse lg:flex-row w-full lg:space-x-5 space-y-5 lg:space-y-0">
                                    <div className="flex items-center lg:w-1/2 w-full py-10">
                                        <p>
                                            Engcardはweb上でオリジナルの英単語帳を作れるサービスです。
                                            PCはもちろん、スマートフォン・タブレットをはじめとするインターネットに接続できるデバイスから利用できます。
                                            覚えたい単語カードを自由に作成してオリジナルの単語帳の作成・編集が可能です。
                                        </p> 
                                    </div>
                                    <div className="lg:w-1/2 w-full">
                                        {/* <img src={'/images_materials/welcome-pic-1.png'} alt="" className="block w-full bg-cover bg-center h-60 bg-slate-600 sm:rounded-md" /> */}
                                        <div style={{ backgroundImage: `url('/images_materials/welcome-pic-1.png')` }} className="/bg-cover bg-contain bg-center bg-no-repeat w-full h-[230px] md:h-[280px]"></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </section>

                        <section className="/bg-emerald-200">
                            <div className='max-w-5xl mx-auto px-5'>
                            <div className="lg:px-20 py-10">
                                <h2 className="py-8 text-3xl text-center text-slate-900">特徴</h2>
                                <div className="flex flex-col lg:flex-row w-full lg:space-x-5 space-y-5 lg:space-y-0">
                                    <div className="lg:w-1/2 w-full">
                                        {/* <img src="https://cdn.pixabay.com/photo/2022/03/21/10/17/digitization-7082815_1280.jpg" alt="" className="block w-full h-60 bg-slate-600 sm:rounded-md" /> */}
                                        <div style={{ backgroundImage: `url('/images_materials/welcome-pic-2.png')` }} className="/bg-cover bg-contain bg-center bg-no-repeat w-full h-[230px] md:h-[280px]"></div>
                                    </div>
                                    <div className="flex items-center lg:w-1/2 w-full py-10">
                                        <p>
                                            英単語の暗記に特化して作られています。
                                            複数の意味、さらに画像や品詞、例文、外部リンクなどの情報を保存できます。
                                            様々な情報と単語を関連させて暗記することで、語彙の定着をサポートします。
                                        </p> 
                                    </div>
                                </div>
                            </div>
                            </div>
                        </section>

                        <section className="bg-slate-200">
                            <div className='max-w-5xl mx-auto px-5'>
                            <div className="lg:px-20 py-10">
                                <h2 className="py-8 text-3xl text-center text-slate-900">機能</h2>
                                <div className="flex flex-col-reverse lg:flex-row w-full lg:space-x-5 space-y-5 lg:space-y-0">
                                    <div className="flex items-center lg:w-1/2 w-full py-10">
                                        <p>
                                            作成した単語帳を暗記する機能やクイズ機能を備えています。
                                            また、ユーザーの学習状況が把握出来るダッシュボードも備えています。
                                        </p> 
                                    </div>
                                    <div className="lg:w-1/2 w-full">
                                        {/* <img src="https://cdn.pixabay.com/photo/2018/01/11/21/27/desk-3076954_1280.jpg" alt="" className="block w-full h-60 bg-slate-600 sm:rounded-md" /> */}
                                        <div style={{ backgroundImage: `url('/images_materials/welcome-pic-3.png')` }} className="bg-cover /bg-contain bg-center bg-no-repeat w-full h-[230px] md:h-[280px]"></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </section>
                    




                    <footer className="py-16 text-center text-sm text-white bg-slate-800">
                        {/* Laravel v{laravelVersion} (PHP v{phpVersion}) */}
                        <div className='py-10'>Engcard</div>
                        <div className='flex justify-center text-sm space-x-3 mx-2 '>
                            <Link href={route('privacy.policy')}>
                                プライバシーポリシー
                            </Link>
                            <Link href={route('terms.of.service')}>
                                利用規約
                            </Link>
                        </div>
                        
                    </footer>
                </div>
            </div>
        </>
    );
}
