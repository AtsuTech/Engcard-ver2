import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
//import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { devNull } from "os";
import CategorySelect from "./CategorySelect";
import CreateSubMeanForm from "./CreateSubMeanForm";
import { GiSmallFire } from "react-icons/gi";

export default function CreateCardForm({id,action}: { id: number,action:any }) {

    //サムネイル画像URL
    const [imgThumbnail,setImgThumbnail] = useState<string|null>();

    //フォームからの画像ファイル参照
    const fileInputRef= useRef<any>(null);

    //fileの入力処理関数(サムネイルとformへのセットを行う)
    const handleInputFile =(e:any)=>{
        //画像をformにセット
        setData('img_path',e.target.files?.[0]);

        //サムネイル画像の設定処理
        if(e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (e: any) => {
                //フォームからの画像のパスを取得
                setImgThumbnail(e.target.result);
            }
            reader.readAsDataURL(file);
        }
    }


    //セットした画像ファイルを消す関数
    const resetFileInput = () => {
        if (fileInputRef.current) {
            // fileのinput要素が存在していたらリセットする
            fileInputRef.current.value = null;
        }
        // stateをリセット(※フォームの削除だけだとstateに残ってしまうため必要)
        setImgThumbnail(null);
        setData('img_path',null);
    };

    const { data, setData, post, put, reset, errors, processing, recentlySuccessful } = useForm({
        flashcard_id: id,
        img_path: null,
        category_id: 1,
        word: '',
        word_mean: '',
        sentence: '',
        sentence_mean: '',
        memory: '',
        link: '',
        sub_means: '',//サブの意味(配列をJSONに変換して送る)
    });

    //データ保存処理
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('card.store'),{
            onFinish: () => reset(),
            onSuccess: ()=> action(),
        });
        
    };

    return (
        <div>

            <form className="w-full bg-white p-2">

                <div className="relative py-4">
                    <div className="text-center font-bold text-slate-700">単語カード作成</div>

                    {/* <button className="absolute top-1 right-1" onClick={closeModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button> */}
                </div>


                <div className="md:flex mb-1">

                    {/* 英単語+画像 */}
                    <div className="flex w-full p-1 h-10 border border-gray-300 rounded-lg mr-1 mb-1 md:mb-0 focus-within:border-amber-400">
                    
                        <input type="text" 
                            name="word" 
                            className="w-full pl-2 mr-1 border-none rounded-md focus:border-transparent" 
                            placeholder="単語 ex.)Apple" 
                            value={data.word}
                            //onChange={(e) => setData('word',e.target.value)} 
                            onChange={(e) => {
                                // Allow input only if the length is less than or equal to 3 or if characters are being removed
                                if (e.target.value.length <= 50 || e.target.value.length < data.word.length) {
                                    setData('word', e.target.value);
                                }
                            }}
                            required
                        />


                        <div className="flex w-8 h-full border border-gray-300 rounded-lg bg-cover bg-center"  style={{ backgroundImage: `url(${imgThumbnail})` }}>

                            <label htmlFor="example1" className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md /bg-amber-400 text-white /p-2 transition-all">
                                {data.img_path == null &&
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-300">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                    </svg>
                                }
                            </label>
                            
                            {/* この中に余白いる */}
                            <input id="example1" 
                                type="file" 
                                accept="image/*" multiple
                                onChange={handleInputFile}
                                ref={fileInputRef}
                                className="block sr-only text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                            />

                        </div>

                        {data.img_path != null &&
                            <div>
                                <button onClick={resetFileInput} className="flex items-center justify-center w-7 h-full bg-gray-300 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="/text-2xl text-white w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        } 

                    </div>            

                    {/* 英単語の意味＋カテゴリ */}
                    <div className="flex w-full h-10 p-1 border border-gray-300 rounded-lg focus-within:border-amber-400">
                        <CategorySelect selected={data.category_id} setData={setData} />
                        <input type="text" 
                            name="word_mean" 
                            className="block w-full h-full pl-2 ml-1 border-none rounded-md /outline-transparent" 
                            placeholder="訳 ex.)りんご" 
                            value={data.word_mean}
                            //onChange={(e) => setData('word_mean',e.target.value)} 
                            onChange={(e) => {
                                // Allow input only if the length is less than or equal to 3 or if characters are being removed
                                if (e.target.value.length <= 30 || e.target.value.length < data.word_mean.length) {
                                    setData('word_mean', e.target.value);
                                }
                            }}
                            required
                        />
                    </div>

                </div> 

                <div className="px-1 text-rose-600">
                    <p>{data.word.length >= 50 && <small>英単語は50字以下で入力ください</small>}</p>
                    <p>{data.word_mean.length >= 30 && <small>意味は30字以下で入力ください</small>}</p>
                </div>

                {/* サブの意味 */}
                <CreateSubMeanForm setData={setData} />

                <div className="md:flex md:mb-1">
                    <textarea 
                        name="sentence" 
                        rows={3} 
                        className="w-full p-2 border border-gray-300 rounded-lg md:mr-1" 
                        onChange={(e) => setData('sentence',e.target.value)} 
                        value={data.sentence}
                        placeholder="例文:Apple is red and delicious fruits.">
                    </textarea>

                    <textarea 
                        name="sentence_mean" 
                        rows={3} 
                        className="w-full p-2 border border-gray-300 rounded-lg" 
                        onChange={(e) => setData('sentence_mean',e.target.value)} 
                        value={data.sentence_mean}
                        placeholder="例文(訳):りんごは赤くて美味しい果物です。">
                    </textarea>
                </div> 

                <input type="text" 
                    name="link" 
                    className="w-full h-10 border border-gray-300 rounded-lg pl-2" 
                    placeholder="サイトのULR ex.)eng-card.com" 
                    value={data.link}
                    onChange={(e) => setData('link',e.target.value)} 
                />

                <div className="flex mt-2">
                    {/* <div className="w-full mr-1">
                        <ButtonWithOnClick color={'gray'} text={'キャンセル'} onclick={closeModal} />
                    </div> */}
                    <div className="w-full">
                        <button 
                            className="items-center w-full px-4 py-2 bg-amber-400 dark:bg-gray-200 border border-transparent rounded-full font-semibold text-sm text-white dark:text-gray-800 uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-white focus:bg-amber-500 dark:focus:bg-white active:bg-amber-600 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150" 
                            onClick={submit}
                            disabled={data.word =="" || data.word_mean =="" ? true : false }
                        >
                            追加
                        </button>
                    </div>
                </div>

            </form>
        </div>
    );
}
