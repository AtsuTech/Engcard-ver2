import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

//データ型宣言
type Cards = {
    id: number;
};

export default function Index({ auth, cards, flashcard_uuid, flashcard_user_id, title }: PageProps<{ cards:Cards[], flashcard_uuid:string, flashcard_user_id:number,title:string }>) {

    const [turn,setTurn] = useState<number>(0);//カードの表示順番
    const [change,setChange] = useState(false);//答えを表示する切り替え判定のための変数

    //カードをインデックス番号で1件フィルタ
    const selected_card:any = cards.filter((_:any,index:any) => index == turn);

    //正解&不正解の状態を記録する変数。このデータをAPIで送信してカードの暗記状態を更新する
    const [viewed,setViewed] = useState<any>([{
        'id':'',
        'views':'',
    }]);

    const { data, setData, patch, put, get, post, errors, processing, recentlySuccessful } = useForm({
        flashcard_user_id: flashcard_user_id,
        views: [],
        _method: "post",
    });

    //正解を表示・非表示する関数
    const Change = () => setChange(!change);

    const Next = () =>{
        setTurn(turn + 1);
        Viewed();
        setChange(false);
    }

    const Prev = () =>{
        setTurn(turn - 1);
        Viewed();
        setChange(false);
    }

    //正解したデータを記録する関数
    const Viewed = () =>{
        //現在表示中のカードのidを取得
        var target:any = cards.find((_:any,index:any) => index == turn);

        setViewed([{
            id: target.id,
            memory: true
        }, ...viewed]);
        setData('views', viewed);
    }


    //クイズの結果のデータを配列でバックエンドに送りカードの暗記状態を更新
    const ViewedCountUpdate = () =>{
        setData('views', viewed);
        post(route('view_count'));
        //alert('更新しました');
    }

    const Finish = () =>{
        ViewedCountUpdate();
        get(route('flashcard.show',flashcard_uuid));
    }

    return(
        <main className="h-screen text-gray-500 bg-slate-300 dark:bg-gray-800">
            <Head title="暗記" />

            <div className="fixed w-full z-20 flex items-center h-12 justify-center">

                <div className="w-full ml-3">
                    {turn+1}/{cards.length}
                </div>                
                <div className="w-fit flex justify-end px-2 h-12 /bg-red-400">
                    <button onClick={Finish}>
                        <RxCross2 size={25} />
                    </button>
                </div>

            </div>

            <div className="max-w-3xl mx-auto w-full flex items-center justify-center h-full">
                <div className="w-full">
                    {selected_card.map((card:any) => (
                        <div key={card.word} className="flex w-full">

                            <div className="max-w-3xl w-full mx-auto fixed bottom-5 px-10">
                                {change ?
                                    <button className="block w-full ml-auto mr-auto px-3 py-2 bg-amber-200 rounded-full my-2" onClick={Change}>単語に戻る</button>
                                :
                                    <button className="block w-full ml-auto mr-auto px-3 py-2 bg-slate-100 rounded-full my-2" onClick={Change}>意味を見る</button>
                                }                                
                            </div>

                            <div className="flex items-center w-[40px] mx-1 h-screen">
                                {turn > 0 &&
                                    <button 
                                        className="flex items-center justify-center bg-slate-100 w-full h-10 rounded-full"
                                        onClick={Prev}>
                                        <FaArrowLeft />
                                    </button>
                                }                                
                            </div>
                            <div className="flex items-center justify-center w-[calc(100%-80px)] h-screen">
                                
                                {change ?
                                    <div className="w-full px-2">
                                        {/* <button className="block w-fit ml-auto mr-auto px-3 bg-amber-200 rounded-full my-2" onClick={Change}>単語に戻る</button> */}
                                        <div 
                                            className="relative flex w-full h-48 md:h-96 text-[20px] md:text-[32px] items-center justify-center border border-slate-200 shadow-lg bg-amber-100" 
                                            id="card_id" 
                                            data-id={card.id}
                                            onClick={Change}
                                        >
                                            <div className="absolute top-2 left-2 bg-slate-500 w-3 h-3 rounded-full dark:text-white"></div>
                                            {card.word_mean}
                                        </div>
                                    </div>

                                :
                                    <div className="w-full px-2">
                                        {/* <button className="block w-fit ml-auto mr-auto px-3 bg-slate-300 rounded-full my-2" onClick={Change}>意味を見る</button> */}
                                        <div 
                                            className="relative flex w-full h-48 md:h-96 text-3xl md:text-6xl items-center justify-center border border-slate-200 dark:border-slate-500 shadow-lg bg-white dark:bg-gray-800" 
                                            id="card_id" 
                                            data-id={card.id}
                                            onClick={Change}
                                        >
                                            <div className="absolute top-2 left-2 bg-slate-500 w-3 h-3 rounded-full"></div>
                                            {card.word.length > 20 ?
                                                <span className="text-[12px] md:text-[20px] dark:text-white">{card.word}</span>
                                            :
                                                <span className='dark:text-white'>{card.word}</span>
                                            }
                                            
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="flex items-center w-[40px] mx-1 h-screen">
                                {turn < cards.length - 1 &&
                                    <button 
                                        className="flex items-center justify-center bg-slate-100 w-full h-10 rounded-full"
                                        onClick={Next}>
                                        <FaArrowRight />
                                    </button>
                                }
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}