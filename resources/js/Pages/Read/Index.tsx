import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
//import Card from '../Card/Partials/Card';
import Card from '@/Components/Special/Card';

//データ型宣言
type Cards = {
    id: number;
};

export default function Index({ auth, cards, flashcard_uuid, flashcard_user_id, title }: PageProps<{ cards:Cards[], flashcard_uuid:string, flashcard_user_id:number,title:string }>) {
    console.log(cards);
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
    }

    const Prev = () =>{
        setTurn(turn - 1);
        Viewed();
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
        <main className="h-[100svh] text-gray-500 bg-slate-300 dark:bg-gray-800">
            <Head title="読む" />

            <header className="fixed w-full z-20 h-12">

                <div className="flex items-center py-1">
                    
                    <div className="w-fit ml-3 bg-white rounded-md p-2">
                        {turn+1}/{cards.length}
                    </div>   
                    <div className="w-full flex justify-end px-2 py-1">
                        <button 
                            className='flex items-center justify-center w-8 h-8 bg-slate-800 text-white rounded-full'
                            onClick={Finish}
                        >
                            <RxCross2 size={25} />
                        </button>
                    </div>
                </div>
                
            </header>

            <div className="max-w-3xl mx-auto top-0 w-full justify-center h-full">
                <div className="w-full">
                    {selected_card.map((card:any) => (
                        <div key={card.word} className="flex w-full">

                            <div className="flex items-center w-[40px] mx-1 h-[100svh]">
                                {turn > 0 &&
                                    <button 
                                        className="flex items-center justify-center bg-slate-100 w-full h-10 rounded-full"
                                        onClick={Prev}>
                                        <FaArrowLeft />
                                    </button>
                                }                                
                            </div>

                            <div className="flex items-center justify-center w-[calc(100%-80px)] h-[100svh]">
                                <Card
                                    memory={card.memory}
                                    img_path={card.img_path}
                                    word={card.word}
                                    word_mean={card.word_mean}
                                    category={card.category}
                                    sub_word_mean={card.wordmeans}
                                    sentence={card.sentence}
                                    sentence_mean={card.sentence_mean}
                                    link={card.link}
                                />
                            </div>

                            <div className="flex items-center w-[40px] mx-1 h-[100svh]">
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