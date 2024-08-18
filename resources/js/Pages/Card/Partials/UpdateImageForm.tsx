import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

// 使わないのでいずれ削除する
export default function UpdateImageForm({id, current}: { id:number, current:any }) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: id,
        img_path: current,
        _method: "put",
    });



    const [currentImgSrc,setCurrentImgSrc] = useState<any>(location.protocol + '//' + window.location.host + current);
    const [createDialog,setCreateDialog] = useState(false);
    const [deleteDialog,setDeleteDialog] = useState(false);
    const [updateDialog,setUpdateDialog] = useState(false);

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
            setData(
                'img_path',file
            );
    
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
            setCurrentImgSrc(imgThumbnail);
        }

        //削除
        const Delete =(e:any)=>{
            e.preventDefault();
            post(route('card.photo_delete'));
            //setChangeImg(false);
            setData('img_path',null);
            setImgThumbnail(null);
            setCurrentImgSrc(null);
        }

    return(
        <>
            <div>
                <div className="flex items-center h-18 border border-slate-300 bg-white p-2 rounded-md">
                    {currentImgSrc != null &&
                        <img src={currentImgSrc} alt="" className="block /w-full h-10 rounded-lg" />
                    }
                    
                    <p className="w-full text-sm">
                        {currentImgSrc != null ? <p>画像なし</p>: <p>あり</p>}
                    </p>
                   
                    <div className="flex items-center justify-end w-full">
                        {/* <button className="block w-32 h-10 ml-2 bg-amber-400 text-white rounded-md font-bold">
                            <p>画像を編集</p>
                        </button> */}

                        {data.img_path != null &&
                            <>
                                <button type="button" className="block w-16 h-8 bg-rose-600 mr-1 text-white rounded-full font-bold" onClick={() => setDeleteDialog(true)}>
                                    削除
                                </button> 
                                <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} className="relative z-50">
                                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                                        <DialogTitle className="font-bold">サブの意味を編集</DialogTitle>
                                        <Description>This will permanently deactivate your account</Description>
                                        <div className="">
                                            <button type="button" className="block w-16 h-8 bg-rose-600 mr-1 text-white rounded-full font-bold" onClick={Delete}>
                                                削除
                                            </button> 
                                        </div>
                                    </DialogPanel>
                                    </div>
                                </Dialog>                         
                            </>                        
                        }

                        <>
                            <button type="button" className="block w-32 h-8 bg-amber-400 text-white rounded-full font-bold" onClick={() => setUpdateDialog(true)}>
                                画像を変更
                            </button>
                            <Dialog open={updateDialog} onClose={() => setUpdateDialog(false)} className="relative z-50">
                                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                                <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                                    <DialogTitle className="font-bold">サブの意味を編集</DialogTitle>
                                    <Description>This will permanently deactivate your account</Description>
                                    <div className="">
                                        <input 
                                            id="" 
                                            type="file" 
                                            accept="image/*" multiple
                                            onChange={handleInputFile}
                                            ref={fileInputRef}
                                            className="block"
                                        />
                                        <img src={imgThumbnail} alt="" className="w-32 h-20" />
                                        
                                        <button type="button" className="block w-32 h-8 bg-amber-400 text-white rounded-full font-bold" onClick={Upload} disabled={data.img_path === null}>
                                            画像を変更
                                        </button>
                                    </div>
                                </DialogPanel>
                                </div>
                            </Dialog> 
                        </>
                            
                    </div>
                </div>




                <div className="flex py-2 justify-end">

                           
                </div>

            </div>
        </>
    );
}