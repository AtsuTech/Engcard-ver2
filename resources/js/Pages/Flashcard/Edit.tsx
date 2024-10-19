//import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import CreateCardForm from '../Card/Partials/CreateCardForm';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
//import { createContext } from 'react';
import { CardList } from '../Card/Partials/CardList';
import { CardOperation } from '../Card/Partials/CardOperation';
import { CategoryContext } from '../Category/Partials/CategoryContext';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

//データ型宣言
type Access = {
    id: number;
    name: string;
};

//データ型宣言
type Category = {
    id: number;
    item: string;
};

//データ型宣言
type Flashcard = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
    uuid: any;
    access: any;
};

//データ型宣言
type Card = {
    id: number;
    uuid: string;
    word: string;
    word_mean: string;
};

//孫コンポーネントにコンテキストでカテゴリのデータ渡す
//export const CategoryContext = createContext({});

export default function Edit({ auth, accesses, categories, flashcard, cards }: PageProps<{ accesses:Access[], categories:Category[], flashcard:Flashcard, cards:Card[] }>) {

    const { data, setData, patch, put, post, reset, errors, processing, recentlySuccessful } = useForm({
        id: flashcard.id,
        title: flashcard.title,
        access_id: flashcard.access_id,
        description: flashcard.description,
        uuid: flashcard.uuid,
        //access: flashcard.access.name,
        _method: "patch",
    });

    //console.log(data);

    let [flashcardDialog, setFlashCardDialog] = useState(false);
    const [createCardDialog,setCreateCardDialog] = useState(false);

    const EditFormClose = () =>{
        
        // setData('access_id', Number(flashcard.access_id));
        // setData('title', flashcard.title);
        // setData('description', flashcard.description);
        //reset();
        setFlashCardDialog(false)
    }

    //単語帳バリデーション
    const [disabled ,setDisabled] = useState(false);
    const [maxTitleLength,setMaxTitleLength] = useState(20);

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        patch(route("flashcard.update",data.id),{
            //onSuccess: () => reset(),
        });
        setFlashCardDialog(false);
    }


    return (
        <CommonLayout>
            <Head title="単語帳を編集" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                            <MdEdit size={26} />
                            <h5 className="font-bold">単語帳編集</h5>
                        </div> 

                        <div className="/p-5 border border-slate-300 m-5 overflow-hidden rounded-lg">
                            
                            <div className="relative flex items-center bg-amber-200 p-2 /py-2 /border-b-2 border-b-amber-400">
                                <h5 className="font-bold">{flashcard.title}</h5>
                                <button
                                    className="absolute right-1 px-2 text-slate-500"
                                    onClick={() => setFlashCardDialog(true)}>
                                    <MdEdit size={20} />
                                </button>
                            </div>
                            <div className="/bg-slate-200 /mt-2 p-3 /rounded-md text-sm">
                                {data.description != null ?
                                    <div className="w-full text-xs dark:text-white">
                                        <p>
                                            {flashcard.description}
                                        </p>
                                    </div>
                                    :
                                    <div className="text-xs text-slate-500 dark:text-white">
                                        <i>概要はありません</i>
                                    </div>
                                }
                            </div>
                        </div>


                        <Dialog open={flashcardDialog} onClose={EditFormClose} className="relative z-50 dark:text-white">
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
                            <DialogPanel className="mb-6 bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition-all mx-auto w-[90%] sm:w-96 p-5 sm:mx-auto">
                                <div className="w-full">
                                    <button 
                                        onClick={EditFormClose}
                                        className='block ml-auto'
                                    >
                                        <RxCross1 size={26} />
                                    </button>
                                </div>
                                <DialogTitle className="font-bold">単語帳編集</DialogTitle>
                                {/* <Description>This will permanently deactivate your account</Description> */}

                                <form onSubmit={Submit} className="/px-5">
                                    <div className="flex py-2">

                                        <div className="w-fit">
                                            <ul className="flex w-fit h-8 text-sm text-gray-700 border border-gray-300 rounded-lg overflow-hidden" aria-labelledby="dropdownDefaultButton">
                                                {accesses.map( (access:any) =>(
                                                    <li className="flex items-center w-fit" key={access.id}>
                                                        <input type="radio" name="access" value={access.id}
                                                            onChange={(e) => setData('access_id', Number(e.target.value))}
                                                            checked={data.access_id == access.id } 
                                                            required 
                                                            className="sr-only peer"
                                                            id={access.id}
                                                        />

                                                        <label htmlFor={access.id} className="w-20 h-10 text-xs text-center focus:outline-none peer-checked:bg-amber-400 peer-checked:text-slate-900 flex items-center justify-center">
                                                            {access.name}
                                                        </label>

                                                    </li>
                                                )) }
                                            </ul> 
                                        </div>

                                    </div>
                                        
                                    <label htmlFor="" className="block mt-3 text-xs">タイトル</label>
                                    <input type="text" 
                                        className="w-full h-10 border border-gray-300 rounded-lg pl-2" 
                                        placeholder="タイトル" 
                                        value={data.title}
                                        name="title"
                                        //onChange={(e) => setData('title', e.target.value)}
                                        onChange={(e) => {
                                            // 入力文字数制限
                                            if (e.target.value.length <= maxTitleLength || e.target.value.length < data.title.length) {
                                                setData('title', e.target.value);
                                            }
                                            if(e.target.value.length >= maxTitleLength){
                                                setDisabled(true);
                                            }else{
                                                setDisabled(false);
                                            }
                                        }}
                                        required
                                    /> 
                                    <div className="px-1 text-rose-600">
                                        <p>{data.title.length >= maxTitleLength && <small>{maxTitleLength}字以下で入力ください</small>}</p>
                                    </div>  

                                    <label htmlFor="" className="block mt-3 text-xs">概要</label>
                                    <textarea 
                                        name="description" 
                                        id="" 
                                        className="w-full h-32 border border-gray-300 rounded-lg pl-2 /mt-1"
                                        onChange={(e) => setData('description', e.target.value)}
                                        value={data.description==null ? "":data.description}
                                    >
                                    </textarea>

                                    <div className="mt-2">
                                        <DesignedPrimaryButton disabled={disabled}>保存</DesignedPrimaryButton>
                                    </div>
                                                        
                                </form> 
                            </DialogPanel>
                            </div>
                        </Dialog>     

                        <div className="flex items-center justify-center px-5 py-2 dark:text-white">
                            単語カード
                            <span className="bg-slate-200 ml-2 px-2 rounded-full dark:text-slate-600">
                                {cards.length}
                            </span>

                            <button 
                                onClick={() => setCreateCardDialog(true)}
                                className="flex items-center ml-auto py-2 px-5 bg-amber-200 text-slate-700 rounded-full /shadow-lg"
                            >
                                <FaPlus size={22} />
                                <span>単語カード作成</span>
                            </button>
                        </div>

                        <div className="px-5 space-y-2 py-4">
                            {cards.map( (card:any) =>(
                                <div className="flex" key={card.id}>
                                    <div className="w-[calc(100%-30px)]">

                                    
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
                                    <div className="pl-1 h-12 w-[30px]">
                                        <CardOperation id={card.id} uuid={card.uuid} reload={""} />
                                    </div>                           
                                </div>

                            )) }                            
                        </div>
                        {cards.length == 0 &&
                            <div className='flex items-center justify-center h-[500px] text-sm'>
                                <p>単語カードを追加するには<span className='underline text-amber-500 cursor-pointer' onClick={() => setCreateCardDialog(true)}>単語カード作成ボタン</span>を押してください</p>
                            </div>
                        }

                        {/* カード作成ダイアログ */}
                        <Dialog open={createCardDialog} onClose={() => setCreateCardDialog(false)} className="relative z-50">
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-slate-200/70 dark:bg-black/60">
                                <DialogPanel className="bg-white dark:bg-gray-800 dark:text-white p-2 rounded-lg shadow-md overflow-hidden">
                                    <div className="flex w-full">
                                        <button 
                                            onClick={() => setCreateCardDialog(false)}
                                            className="ml-auto"
                                        >
                                            <RxCross1 size={22} />
                                        </button>                                        
                                    </div>
                                    <CategoryContext.Provider value={categories}>
                                        <CreateCardForm id={data.id} action={() => setCreateCardDialog(false)} />
                                    </CategoryContext.Provider>       
                                </DialogPanel>
                            </div>
                        </Dialog> 

                        <button 
                            onClick={() => setCreateCardDialog(true)}
                            className="fixed bottom-5 right-5 flex items-center py-2 px-5 bg-amber-200 text-slate-700 rounded-full shadow-lg"
                        >
                            <FaPlus size={22} />
                            <span>単語カード作成</span>
                        </button>


                        {/* <CategoryContext.Provider value={categories}>
                            <CreateCardForm id={data.id} />
                        </CategoryContext.Provider>                     */}
                    </div>
                </div>
            </div>
            
        </CommonLayout>
    );
}
