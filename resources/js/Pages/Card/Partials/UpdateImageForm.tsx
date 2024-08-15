import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';


export default function UpdateImageForm({id, current}: { id:number, current:any }) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: id,
        img_path: current,
        _method: "put",
    });

        //サムネイル画像URL
        const [imgThumbnail,setImgThumbnail] = useState<any>();

        //フォームからの画像ファイル参照
        const fileInputRef= useRef<any>(null);
    
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
    
        //fileの入力処理関数(サムネイルとformへのセットを行う)
        const handleInputFile =(e:any)=>{
            const file = e.target.files?.[0];
            //画像をformにセット
            setData({
                ...data,
                img_path:file
            });
    
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

        //サーバにアップ
        const Upload =(e:any)=>{
            e.preventDefault();
            post(route('card.photo_update'));
        }

        //削除
        const Delete =(e:any)=>{
            e.preventDefault();
            post(route('card.photo_delete'));
        }

    return(
        <>

            <div>
                <div className="flex items-center h-18 border border-slate-300 bg-white p-2 rounded-md">
                    {current != null ?
                        <div className="flex items-center">
                            <img src={location.protocol + '//' + window.location.host + data.img_path} alt="" className="block /w-full h-10 rounded-lg" /> 
                            <p className="text-xs ml-2 w-32">現在の画像</p>
                        </div>
                    :
                        <div className="">
                            <p className="text-xs w-32">画像はありません</p>
                        </div>
                    }
                    <div className="flex justify-end w-full">
                        <button className="block w-32 h-10 ml-2 bg-amber-400 text-white rounded-md font-bold">画像を編集</button>
                    </div>
                </div>


                    {/* <label htmlFor="example1" className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md /bg-amber-400 text-white /p-2 transition-all">
                        {data.img_path == null &&
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-300">
                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                            </svg>
                        }
                    </label>
                    
                    <input id="example1" 
                        type="file" 
                        accept="image/*" multiple
                        onChange={handleInputFile}
                        ref={fileInputRef}
                        className="block sr-only text-sm file:mr-4 file:rounded-md file:border-0 file:bg-yellow-500 file:py-2.5 file:p-2 file:text-sm file:font-semibold file:text-white hover:file:bg-yellow-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                    /> */}
                

                <input 
                    id="" 
                    type="file" 
                    accept="image/*" multiple
                    onChange={handleInputFile}
                    ref={fileInputRef}
                    className="block"
                />

                <img src={imgThumbnail} alt="" className="w-32 h-20" />

                <div className="flex py-2 justify-end">
                    {current != null &&
                        <button type="button" className="block w-16 h-8 bg-rose-600 mr-1 text-white rounded-full font-bold" onClick={Delete}>
                            削除
                        </button>
                    }                     
                    <button type="button" className="block w-32 h-8 bg-amber-400 text-white rounded-full font-bold" onClick={Upload}>
                        {current == null ? '画像を追加' : '画像を変更'}
                    </button>
                </div>

                
                {/* {data.img_path != null &&
                    <div>
                        <button onClick={resetFileInput} className="flex items-center justify-center w-7 h-full bg-gray-300 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="/text-2xl text-white w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                }  */}
            </div>
        </>
    );
}