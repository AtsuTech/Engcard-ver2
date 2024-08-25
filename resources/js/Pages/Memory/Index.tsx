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
        <main className="relative h-screen text-gray-500">
            <Head title="暗記" />

            <div className="absolute w-full z-20 /bg-blue-300 flex items-center h-12 justify-center">

                <div className="w-full ml-3">
                    単語帳:{title}{turn+1}/{cards.length}
                </div>                
                <div className="w-fit flex justify-end px-2 h-12 /bg-red-400">
                    <button onClick={Finish}>
                        <RxCross2 size={25} />
                    </button>
                </div>

            </div>

            <div className="absolute top-0 w-full flex items-center justify-center h-full">
                <div className="w-full">
                    {selected_card.map((card:any) => (
                        <div key={card.word} className="flex w-full">

                            <div className="flex w-16 h-screen">
                                {turn > 0 &&
                                    <button 
                                        className="flex items-center justify-center /bg-slate-100 w-full h-screen"
                                        onClick={Prev}>
                                        <FaArrowLeft />
                                    </button>
                                }                                
                            </div>
                            <div className="flex items-center justify-center w-full /bg-slate-200 h-screen">
                                
                                {change ?
                                    <div>
                                        <button className="block w-fit ml-auto mr-auto px-3 bg-amber-200 rounded-full" onClick={Change}>単語に戻る</button>
                                        <div className="flex w-full h-48 md:h-96 text-3xl md:text-6xl items-center justify-center" id="card_id" data-id={card.id}>
                                            {card.word_mean}
                                        </div>
                                    </div>

                                :
                                    <div>
                                        <button className="block w-fit ml-auto mr-auto px-3 bg-slate-300 rounded-full" onClick={Change}>意味を見る</button>
                                        <div className="flex w-full h-48 md:h-96 text-3xl md:text-6xl items-center justify-center" id="card_id" data-id={card.id}>
                                            {card.word}
                                        </div>
                                    </div>
                                }
                            </div>

                            <div className="flex w-16 h-screen">
                                {turn < cards.length - 1 &&
                                    <button 
                                        className="flex items-center justify-center /bg-slate-100 w-full h-screen"
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