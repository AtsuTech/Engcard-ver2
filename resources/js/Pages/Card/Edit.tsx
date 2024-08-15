import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useRef, FC, useState } from "react";
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
//import { title } from 'process';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import { CategoryContext } from '../Category/Partials/CategoryContext';
import CategorySelect from './Partials/CategorySelect';
import UpdateSubMeanForm from './Partials/UpdateSubMeanForm';
import UpdateAddSubMeanForm from './Partials/UpdateAddSubMeanForm';
import UpdateImageForm from './Partials/UpdateImageForm';

//データ型宣言
type Category = {
    id: number;
    item: string;
};


type WordMean = {
    id: number;
    card_id: number;
    category_id: number;
    word_mean: string;
}

//データ型宣言
type Card = {
    id: number;
    uuid: string;
    flashcard_id: number;
    word: string;
    word_mean: string;
    img_path: any;
    category_id: number;
    sentence: string;
    sentence_mean: string;
    link: string;
    wordmeans: WordMean[];
};

//export default function Edit({ auth, categories, card }: PageProps<{ categories:Category[], card:Card }>) {
export default function Edit({ auth, categories, card, wordmeans }: PageProps<{ categories:Category[], card:Card, wordmeans:WordMean[] }>) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: card.id,
        uuid: card.uuid,
        flashcard_id: card.flashcard_id,
        word: card.word,
        word_mean: card.word_mean,
        img_path: card.img_path,
        category_id: card.category_id,
        sentence: card.sentence,
        sentence_mean: card.sentence_mean,
        link: card.link,
        _method: "post",
    });




    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        patch(route("card.update",data.id));
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">カード編集{data.word}</h2>}
        >
            <Head title="単語帳を編集" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 /space-y-6">


                    <CategoryContext.Provider value={categories}>
                        <form>

                            <label className="block mt-3" htmlFor="word">単語</label>
                            <input type="text" 
                                id="word"
                                name="word" 
                                className="w-full h-10 border border-gray-300 pl-2 rounded-lg outline-amber-400" 
                                placeholder="単語 ex.)Apple" 
                                value={data.word}
                                onChange={(e) => setData('word',e.target.value)} 
                                required
                            />

                            <label className="block mt-3" htmlFor="word_mean">意味</label>
                            <div className="flex w-full h-10 bg-white border border-gray-300 rounded-lg p-1 focus-within:border-amber-400">

                                {/* カテゴリのデータ、更新関数をコンテキストで渡す */}
                                <CategorySelect selected={data.category_id} setData={setData} />
                                
                                <input type="text" 
                                    id="word_mean"
                                    name="word_mean" 
                                    className="w-full ml-1 pl-2 bg-white rounded-md border-none /outline-transparent" 
                                    placeholder="訳 ex.)りんご" 
                                    value={data.word_mean}
                                    onChange={(e) => setData('word_mean',e.target.value)} 
                                    required
                                />
                            </div>

                            {/* サブの意味 */}
                            <label className="block mt-3" htmlFor="">サブの意味</label>
                            <div className="w-1/2 bg-white border border-gray-300 p-2 rounded-lg">

                                {/* カテゴリのデータ、更新関数をコンテキストで渡す */}
                                {wordmeans && wordmeans.length > 0 && 
                                    wordmeans.map((wordmean: any, index: number) => (
                                        <div key={wordmean.id} className="py-1">
                                            <UpdateSubMeanForm wordmean={wordmean} />
                                        </div>
                                    ))
                                }

                                {wordmeans.length <5 && <UpdateAddSubMeanForm card_id={data.id} /> }
                                
                            </div>


                            <div className="mt-5 mb-5 w-1/2">
                                <label htmlFor="">画像</label>
                                <UpdateImageForm current={data.img_path} id={data.id} />
                            </div>

                            <label htmlFor="sentence">例文</label>
                            <textarea 
                                id="sentence"
                                name="sentence" 
                                rows={3} 
                                className="w-full p-2 border border-gray-300 rounded-lg outline-amber-400" 
                                value={data.sentence ==null ? "": data.sentence}
                                onChange={(e) => setData('sentence',e.target.value)} 
                                placeholder="例文:Apple is red and delicious fruits."
                                >
                            </textarea>

                            <label className="block mt-3" htmlFor="sentence_mean">例文の訳</label>
                            <textarea 
                                id="sentence_mean"
                                name="sentence_mean" 
                                rows={3} 
                                className="w-full p-2 border border-gray-300 rounded-lg outline-amber-400" 
                                value={data.sentence_mean ==null ? "": data.sentence_mean}
                                onChange={(e) => setData('sentence_mean',e.target.value)} 
                                placeholder="例文(訳):りんごは赤くて美味しい果物です。"
                                >
                            </textarea>

                            <label className="block mt-3" htmlFor="link">関連リンク</label>
                            <input type="text" 
                                id="link"
                                name="link" 
                                className="w-full h-10 border border-gray-300 pl-2 rounded-lg outline-amber-400" 
                                placeholder="ex.)Gazotan.com" 
                                value={data.link == null ? "": data.link}
                                onChange={(e) => setData('link',e.target.value)} 
                            />

                            <div className="mt-5">
                                {/* <ButtonWithOnClick text="更新" color="yellow" onclick={UpdateSubmit} /> */}
                                <button onClick={Submit}>更新</button>
                                {/* <DesignedPrimaryButton>更新</DesignedPrimaryButton> */}
                            </div>

                        </form>
                    </CategoryContext.Provider>   
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}
