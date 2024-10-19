//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PageBack } from '@/Components/PageBack';
import { CardList } from '../Card/Partials/CardList';
import OperateFlashcardFavorite from '../FlashcardFavorite/Partials/OperateFlashcardFavorite';
import { SiReadme } from "react-icons/si";
import { PiHeadCircuitFill } from "react-icons/pi";
import { MdQuiz } from "react-icons/md";
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

//データ型宣言
type Flashcard = {
    id: number;
    uuid: string;
    title: string;
    access_id: number;
    description: string | null;
    favorite: number;
    updated_at: string;
    user_id: number;
    user:any;
    viewed_count: number;
    cards:[];
};


export default function Show({ flashcard, favorites, has_favorite }: PageProps<{ flashcard:Flashcard, favorites:[], has_favorite:[] }>) {
    
    const { auth } :any= usePage().props;  
    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: flashcard.id,
        title: flashcard.title,
        access_id: flashcard.access_id,
        description: flashcard.description,
        favorite: flashcard.favorite,
        updated_at: flashcard.updated_at,
        user_id: flashcard.user_id,
        viewed_count: flashcard.viewed_count,
    });

    const [viewCounted, setViewCounted] = useState(false);  // カウント済みかどうかを記録
    useEffect(() => {
        // カウントがまだ行われていない場合のみ実行
        if (!sessionStorage.getItem('viewCounted')) {

            if (auth.user.id == flashcard.user.id) {
                post(route("flashcard.viewing", flashcard.id), {
                    preserveScroll: true,  // スクロールを防ぐオプション
                    onSuccess: () => {
                        setViewCounted(true);
                        
                        sessionStorage.setItem('viewCounted', 'true');// sessionStorageに値を保存して、再読み込み時に処理をスキップ
                    },
                });
            } else {
                post(route("flashcard.viewed", flashcard.id), {
                    preserveScroll: true,  // スクロールを防ぐオプション
                    onSuccess: () => {
                        setViewCounted(true);
                        
                        sessionStorage.setItem('viewCounted', 'true');// sessionStorageに値を保存して、再読み込み時に処理をスキップ
                    },
                });
            }
        }
    }, [flashcard.user.id]);

    const [quizDialog,setQuizDialog] = useState(false);


    return (
        <CommonLayout>
            <Head title={flashcard.title} />

            <div className="py-0 md:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="relative flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-700">
                            <PageBack />
                            
                            <h5 className="flex items-center text-1.5xl ml-1 ">
                                <Link href={route('flashcard.index')} className="flex items-center underline text-slate-500 dark:text-slate-400">
                                    単語帳:
                                </Link>
                                <span className="ml-1 font-bold dark:text-white">{flashcard.title}</span>
                            </h5>
                            
                            <div className="flex absolute right-2">
                                {auth.user.id == flashcard.user.id &&
                                    <Link href={route('flashcard.edit',flashcard.uuid)} className="block text-sm text-amber-500 px-2 rounded-lg">
                                        編集
                                    </Link>
                                }
                            </div>                            
                        </div> 

                        <div className="px-3 py-4">
                            <div className="relative h-10 my-2 text-xs">
                                <div className="absolute flex right-0 mt-1">
                                    
                                        <div className="flex items-center w-fit space-x-2">
                                            <small className="dark:text-white bg-slate-200 px-1 rounded-full">{data.viewed_count} views</small>
                                            <small className="dark:text-white">最終編集:{data.updated_at}</small>
                                            <div className="py-2">
                                                <Link href={`/user/profile/${flashcard.user.personal_id}`}>
                                                {flashcard.user.profile_photo_path ?
                                                    <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + flashcard.user.profile_photo_path} className="w-5 block rounded-full" />
                                                :
                                                    <div className="flex items-center justify-center w-5 h-5 rounded-full text-white bg-slate-900">
                                                        {flashcard.user.name.substr(0,1)}
                                                    </div>
                                                }  
                                                </Link>                                     
                                            </div>
                                            
                                            <div className="border border-slate-300 rounded-md">
                                                <OperateFlashcardFavorite id={flashcard.id} count={favorites.length} has={has_favorite.length} />
                                            </div>
                                            
                                        </div>    
                                                     
                                </div>
                            </div>

                            <div className="bg-slate-200 p-3 text-slate-500 rounded-md">
                                <span className="block text-sm font-semibold">概要</span>
                                {data.description == null ?
                                    <div className="text-xs">
                                        <i>概要はありません</i>
                                    </div>
                                :
                                    <p>{data.description}</p>
                                }
                            </div>

                            {flashcard.cards.length != 0 && 
                                <section className="flex items-center w-full space-x-2 my-5">
                                    <Link href={route('read',flashcard.uuid)} className="/block flex items-center justify-center space-x-1 w-full py-3 bg-amber-300 text-slate-700 text-center rounded-full">
                                        <SiReadme size={22} />
                                        <span>読む</span>
                                    </Link>
                                    <Link href={route('memory',flashcard.uuid)} className="/block flex items-center justify-center space-x-1 w-full py-3 bg-amber-300 text-slate-700 text-center rounded-full">
                                        <PiHeadCircuitFill size={22} />
                                        <span>暗記</span>
                                    </Link>
                                    {flashcard.cards.length >= 10 ?
                                        <Link href={route('quiz',flashcard.uuid)} className="/block flex items-center justify-center space-x-1 w-full py-3 bg-amber-300 text-slate-700 text-center rounded-full">
                                            <MdQuiz size={22} />
                                            <span>クイズ</span>
                                        </Link>
                                        :
                                        <>
                                            <button
                                                className="flex items-center justify-center space-x-1 w-full py-3 bg-amber-300 text-slate-700 text-center rounded-full"
                                                onClick={() => setQuizDialog(true)}
                                            >
                                                <MdQuiz size={22} />
                                                <span>クイズ</span>
                                            </button>
                                            <Dialog open={quizDialog} onClose={() => setQuizDialog(false)} className="relative z-50">
                                                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                                                    <DialogPanel className="max-w-lg space-y-4 bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md">
                                                        <DialogTitle className="font-bold">クイズ</DialogTitle>
                                                        <Description className="text-sm">
                                                        単語カードを10枚以上作るとクイズ機能が使えます。
                                                        </Description>
                                                        <div className="">                                                        
                                                            <button type="button" className="block w-full h-8 bg-amber-400 text-white rounded-full font-bold" onClick={()=>setQuizDialog(false)}>
                                                                OK
                                                            </button>
                                                        </div>
                                                    </DialogPanel>
                                                </div>
                                            </Dialog> 
                                        </>
                                    }
                                </section>
                            }


                            {flashcard.cards.length == 0 ?
                                <div className="flex items-center justify-center w-full min-h-[600px] text-slate-600">単語カードが登録されていません</div>
                                :
                                <section className="space-y-2">
                                    <div className="w-fit px-2 text-sm bg-slate-200 rounded-full ml-auto mr-auto my-10">
                                        カード:{flashcard.cards.length}枚
                                    </div>
                                    {flashcard.cards.map( (card:any) => (
                                        <div key={card.id}>
                                            <CardList 
                                                id ={card.id}
                                                uuid ={card.uuid}
                                                memory ={card.memory}
                                                word ={card.word}
                                                word_mean ={card.word_mean}
                                                category ={card.category}
                                                sub_word_mean={card.wordmeans}
                                                sentence={card.sentence}
                                                sentence_mean={card.sentence_mean}
                                                link={card.link}
                                                user_id ={card.user_id}
                                                flashcard_id ={card.flashcard_id}
                                                img_path ={card.img_path}
                                            /> 
                                        </div>
                                    ))}
                                </section>   
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}