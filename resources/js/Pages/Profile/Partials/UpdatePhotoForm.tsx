/*
This is Profile Photo Crooper.
improve and fix for SSR.
*/

import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';


//プロフィール画像の切り抜きコンポーネント
export const UpdatePhotoForm: FC = () => {
    const canvasInnerRef = useRef<HTMLCanvasElement>(null);
    const canvasOuterRef = useRef<HTMLCanvasElement>(null);
    const [canvasW,setCanvasW] = useState(288); //canvas幅 (=tailwindcss w-72)
    const [canvasH,setCanvasH] = useState(288); //canvas高さ(=tailwindcss w-72)
    const [x, setX] = useState<number>(0);//x位置
    const [y, setY] = useState<number>(0);//y位置
    const [w, setW] = useState<number>(0);//横幅
    const [h, setH] = useState<number>(0);//高さ
    const [aspect, setAspect] = useState<number>(1);//アスペクト比
    const [drag, setDrag] = useState<boolean>(false);//ドラック有効or無効状態管理
    const [moveY,setMoveY] = useState<boolean>(false);
    const [moveX,setMoveX] = useState<boolean>(false);
    const [initialImgSize, setInitialImgSize] = useState<boolean>(true);//画像サイズの初期状態管理
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadImgSrc, setUploadImgSrc] = useState<string | null>(null);//画像データ
    const dialogRef = useRef<HTMLDialogElement>(null);

    //InertiaのuseFormでデータをサーバに送る
    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        profile_photo_path: "",
        _method: "put",
    });

    //モーダルOPEN
    const openDialog = () => dialogRef.current?.showModal();

    //モーダルCLOSE
    const closeDialog = () => dialogRef.current?.close();


    // Inputからファイルアップロード
    const loadLocalImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const fileData = fileInput.files?.[0];

        if (fileData && fileData.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = () => {
                setUploadImgSrc(reader.result as string);

                //画像をセット後にモーダルを開く
                openDialog();
            };
            reader.readAsDataURL(fileData);
        } else {
            alert('画像を選択してください');
        }
    };


    useEffect(() => {
        //canvas要素の取得に失敗
        if (!canvasInnerRef.current) {
            throw new Error("canvas要素の取得に失敗しました");
        }
        const canvasInner = canvasInnerRef.current;
        const ctxInner = canvasInner.getContext("2d");
        if (!ctxInner) {
            throw new Error("context取得失敗");
        }        

        if (!canvasOuterRef.current) {
            throw new Error("canvas要素の取得に失敗しました");
        }
        const canvasOuter = canvasOuterRef.current;
        const ctxOuter = canvasOuter.getContext("2d");
        if (!ctxOuter) {
            throw new Error("context取得失敗");
        }


        // 描画前に既に描画済みのものを消してリセット
        ctxInner.clearRect(0, 0, ctxInner.canvas.width, ctxInner.canvas.height);

        // 画像がある場合に描画
        if (uploadImgSrc) {

            //イメージインスタンスを作成し、inputから読み込まれた画像データをセットする
            const img = new Image();
            img.src = uploadImgSrc;

            //imgが読み込まれたらcanvasに描画イベント発生させる
            img.onload = () => {
                
                //初期サイズ表示が有効であれば、初期サイズに設定
                if(initialImgSize){
                    if(img.height > img.width){
                        setH(canvasH);
                        setW(canvasH*(img.width /img.height));
                        setAspect(img.width /img.height);
                        setY(0);

                        if(!moveX){
                            setMoveY(false);//画像を新たに読み込み直した際に以前の状態を初期化(false)にする
                            setX((canvasW - w) / 2 );
                        }
                        //
                    }else if(img.height < img.width){
                        setW(canvasW);
                        setH(canvasW*(img.height / img.width));
                        setAspect(img.height / img.width);  
                        setX(0); 

                        if(!moveY){
                            setMoveX(false);//画像を新たに読み込み直した際に以前の状態を初期化(false)にする
                            setY((canvasH - h) / 2 );  
                        }
                                        
                    }else if(img.height == img.width){
                        setW(canvasW);
                        setH(canvasH);
                        setX(0);
                        setY(0);                    
                    }
                }

                //画像を表示
                ctxInner.drawImage(img, x, y, w, h);

                //フィルタ部分
                var copyImg: ImageData = ctxInner.getImageData(0, 0, canvasW, canvasH);
                ctxOuter.putImageData(copyImg, 0, 0 );

                // 半透明の白いフィルターを追加
                ctxOuter.globalAlpha = 0.7;
                ctxOuter.fillStyle = '#000';
                ctxOuter.fillRect(0, 0, canvasW, canvasH);
                ctxOuter.globalAlpha = 1; // アルファを元に戻す
                

            };
            //読み込んだ後も継続して画像を表示
            ctxInner.drawImage(img, x, y, w, h);



            //キャンバスの最新の描画状態をサーバーに送る準備をする
            if(canvasInnerRef.current){
                const url:any = canvasInnerRef.current.toDataURL("image/png");
                const bin = atob(url.split(",")[1]);
                const buffer = new Uint8Array(bin.length);
                for (let i = 0; i < bin.length; i++) {
                    buffer[i] = bin.charCodeAt(i);
                }
                const blob :any= new Blob([buffer.buffer], {type: "image/png"});
                const convertFile :any = new File([blob], 'profile_photo.png', { type: 'image/png' });
                //setData('profile_photo_path', "");
                setData('profile_photo_path', convertFile);
            }
        }

    }, [x, y, w, h, uploadImgSrc]);


    //ドラック開始
    const startMove = () => {
        setDrag(true);
    };

    //ドラック終了
    const endMove = () => {
        setDrag(false);
    };

    //画像ドラック
    const move = (e: React.MouseEvent<HTMLCanvasElement>) => {
        //ドラックが有効状態のみドラックさせる
        if (drag) {

            if(w > h){
                setMoveY(true);
            }else if(w < h){
                setMoveX(true);
            }else if(w == h){
                setMoveY(false);
                setMoveX(false);
            }

            
            const canvas = canvasInnerRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();

                if(moveY && initialImgSize){
                    //Y方向移動OK(横長)かつ画像サイズが初期状態の時はX方向へ移動禁止
                    setX(0);
                }else{
                    setX(e.clientX - rect.left - w / 2);
                }

                if(moveX && initialImgSize){
                    //X方向移動OK(縦長)かつ画像サイズが初期状態の時はY方向へ移動禁止
                    setY(0);
                }else{
                    setY(e.clientY - rect.top - h / 2);
                }
            
            }
        }
    };

    const zoom = (e: React.ChangeEvent<HTMLInputElement>) => {
        //初期サイズ表示を無効にする
        setInitialImgSize(false);

        const value = parseInt(e.target.value);

        if(w>h){
            setW(value);
            setH(value*aspect);
        }else if(h>w){
            setH(value);
            setW(value*aspect);
        }else if(w == h){
            setW(value);
            setH(value);
        }
    };


    //サーバにアップ
    const Upload =()=>{
        post(route('profile.photo_update'));
        closeDialog();
    }

    return (
        <div>

            <label className="flex items-center w-fit cursor-pointer appearance-none justify-center rounded-full bg-amber-400 text-white p-2 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="block w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <div className="px-1">画像を選択</div>
                <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*"
                    ref={fileInputRef}
                    className="sr-only block w-full"
                    onChange={loadLocalImage}
                    onClick={ () => setInitialImgSize(true)}
                />                    
            </label>            
            <dialog ref={dialogRef} className="w-72 rounded-lg shadow-lg">
                <div className="/bg-orange-600 /p-3">
                    
                    <h1 className="font-semibold py-3 text-center /text-2xl">プロフィール写真</h1>

                    <div className="w-72 h-72">
                        <div className="relative">

                            <canvas
                                ref={canvasOuterRef}
                                width={canvasW}
                                height={canvasH}
                                className="absolute top-0"
                            />

                            <canvas
                                ref={canvasInnerRef}
                                width={canvasW}
                                height={canvasH}
                                onMouseDown={startMove}
                                onMouseUp={endMove}
                                onMouseMove={move}
                                className="absolute top-0 z-10 rounded-full /border /border-white bg-white"
                            />
                        </div>                    
                    </div>
                    
                    <div className="w-full h-10 flex items-center justify-center">
                        <button className="w-16 text-center text-xs">元サイズ</button>
                        <input type="range" name="scale" min="300" max="1200" className="w-fit" onInput={(e:any) => zoom(e)}/> 
                        <button className="w-16 text-center text-xs">拡大</button>
                    </div>

                    <div className="flex p-2">
                        <button 
                            className="w-1/2 text-white bg-slate-400 py-1 px-2 rounded-full mr-1"
                            onClick={closeDialog}
                        >
                            キャンセル
                        </button>

                        <button 
                            className="w-1/2 text-white bg-yellow-400 py-1 px-2 rounded-full ml-1"
                            onClick={Upload}
                        >
                            保存
                        </button>                    
                    </div>

                </div>
            </dialog>
        </div>
    );
}

