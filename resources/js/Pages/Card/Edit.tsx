import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/CommonLayout';
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
import { router } from '@inertiajs/react';
import { FaDeleteLeft } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { MdOutlineClear } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import ClosePageBack from '@/Components/ClosePageBack';


//データ型宣言
type Category = {
    id: number;
    item: string;
};


type WordMean = {
    id: number;
    card_id: number;
    category_id: number;
    category: string;
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
export default function Edit({ auth, flashcard_uuid, categories, card, wordmeans }: PageProps<{ flashcard_uuid:string, categories:Category[], card:Card, wordmeans:WordMean[] }>) {

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
        img_delete: false,
        _method: "post",
    });

    const [imgPreview,setImgPreview] = useState<any>();

    const imageClear = () =>{
        setImgPreview(null); 
        setData('img_path',null);
    }

    const hendleFile =(e:any)=>{
        const file = e.target.files?.[0];
        const previewUrl:any = URL.createObjectURL(file);
        setImgPreview(previewUrl); 
        setData('img_path',file);
    }

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        console.log(data);
        post(route("card.update_with_image"));
    }

    console.log(card)


    return (
        <CommonLayout>
            <Head title="単語カード編集" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 sm:shadow sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                            <Link href={route('flashcard.show',flashcard_uuid)} className="block w-fit text-lg p-1 mr-2 bg-slate-200 rounded-full dark:text-slate-600">
                                <IoArrowBack />
                            </Link>
                            <MdEdit size={26} />
                            <h5 className="font-bold">単語カード編集</h5>
                            <div className='ml-auto sm:hidden flex items-center justify-center'>
                                <ClosePageBack />
                            </div>
                        </div> 

                        <CategoryContext.Provider value={categories}>
                            <form onSubmit={Submit} encType="multipart/form-data" className="px-3">

                                <label className="block mt-3 text-xs dark:text-white" htmlFor="word">単語</label>
                                <input type="text" 
                                    id="word"
                                    name="word" 
                                    className="w-full h-10 border border-gray-300 pl-2 rounded-lg outline-amber-400" 
                                    placeholder="単語 ex.)Apple" 
                                    value={data.word}
                                    onChange={(e) => setData('word',e.target.value)} 
                                    required
                                />

                                <label className="block mt-3 text-xs dark:text-white" htmlFor="word_mean">意味</label>
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
                                <label className="block mt-3 text-xs dark:text-white" htmlFor="">サブの意味</label>
                                <div className="flex items-center w-full bg-white border border-gray-300 p-1 rounded-lg">
                                    {wordmeans.length == 0 &&
                                        <div className="w-full">
                                            <p className="text-xs text-slate-500">登録されていません</p>
                                        </div>
                                    }
                                    <div className="w-full">
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
                                </div>

                                {/* 画像 */}
                                <label htmlFor="img" className="block mt-3 text-xs dark:text-white">画像</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg bg-white p-1 space-x-2">
                                    {imgPreview != null ?
                                        <img src={imgPreview} className="block w-8 h-8 border border-gray-300 rounded-md" />
                                    :
                                        <>
                                        {data.img_path != null ?
                                        <img src={data.img_path} alt="" className="block w-8 h-8 border border-gray-300 rounded-md" />
                                        :
                                        <p className="text-xs">画像なし</p>
                                        }
                                        </>
                                    }
                                    {/* <input
                                        id="img"
                                        type="file"
                                        accept="image/*" multiple
                                        onChange={hendleFile}
                                    />    */}
                                    <label
                                        htmlFor="card-image-file"
                                        className="flex flex-col items-center justify-center w-fit cursor-pointer"
                                        >
                                        <div className="flex items-center justify-center text-lg border p-2 bg-amber-300 text-slate-600 rounded-full">
                                            <div className="block">
                                                <CiImageOn />    
                                            </div>
                                            <span className="block text-xs">開く</span>
                                        </div>
                                        {/* <input id="card-image-file" type="file" className="hidden" /> */}
                                        <input
                                            id="card-image-file"
                                            className="hidden"
                                            type="file"
                                            accept="image/*" multiple
                                            onChange={hendleFile}
                                        /> 
                                    </label>
                                    {imgPreview  && 
                                        <button onClick={imageClear} type="button" className="flex items-center justify-center text-lg border p-2 bg-slate-300 text-slate-600 rounded-full">
                                            <MdOutlineClear />
                                            <span className="block text-xs">クリア</span>
                                        </button>
                                    }
                                    <div className="flex items-center justify-center text-lg border border-rose-600 p-2 /bg-rose-600 rounded-full">

                                        <input 
                                            type="checkbox" 
                                            id="huey" 
                                            name="drone" 
                                            className="block w-3 h-3 border border-gray-300 rounded-sm text-rose-600 ring-white"
                                            value={1} 
                                            onChange={(e:any)=>setData('img_delete',e.target.value)}
                                        />
                                        <label className="flex items-center space-x-1 /block ml-1 /text-xs text-rose-600">
                                            {/* <FaDeleteLeft /> */}
                                            <span className="block text-xs">削除</span>
                                        </label>   
                                    </div>
                                        
                                    {/* <UpdateImageForm current={data.img_path} id={data.id} /> */}
                                </div> 

                                <label htmlFor="sentence" className="text-xs dark:text-white">例文</label>
                                <textarea 
                                    id="sentence"
                                    name="sentence" 
                                    rows={3} 
                                    className="w-full p-2 border border-gray-300 rounded-lg outline-amber-400" 
                                    value={data.sentence ==null ? "": data.sentence}
                                    onChange={(e) => setData('sentence',e.target.value)} 
                                    placeholder="Apple is red and delicious fruits."
                                    >
                                </textarea>

                                <label className="block mt-3 text-xs dark:text-white" htmlFor="sentence_mean">例文の訳</label>
                                <textarea 
                                    id="sentence_mean"
                                    name="sentence_mean" 
                                    rows={3} 
                                    className="w-full p-2 border border-gray-300 rounded-lg outline-amber-400" 
                                    value={data.sentence_mean ==null ? "": data.sentence_mean}
                                    onChange={(e) => setData('sentence_mean',e.target.value)} 
                                    placeholder="りんごは赤くて美味しい果物です。"
                                    >
                                </textarea>

                                <label className="block mt-3 text-xs dark:text-white" htmlFor="link">関連リンク</label>
                                <input type="text" 
                                    id="link"
                                    name="link" 
                                    className="w-full h-10 border border-gray-300 pl-2 rounded-lg outline-amber-400" 
                                    placeholder="https://eng-card.com/" 
                                    value={data.link == null ? "": data.link}
                                    onChange={(e) => setData('link',e.target.value)} 
                                />

                                <div className="py-10">
                                    <DesignedPrimaryButton>更新</DesignedPrimaryButton>
                                </div>

                            </form>
                        </CategoryContext.Provider>   
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
