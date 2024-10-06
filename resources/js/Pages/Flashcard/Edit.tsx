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

    //データ送信
    const Submit = (e :any) =>{
        e.preventDefault();
        patch(route("flashcard.update",data.id));
        setFlashCardDialog(false);
    }


    return (
        <CommonLayout>
            <Head title="単語帳を編集" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            <MdEdit size={26} />
                            <h5 className="font-bold">単語帳編集</h5>
                        </div> 

                        <div className="/p-5 border border-slate-300 m-5 overflow-hidden rounded-lg">
                            
                            <div className="relative flex items-center bg-amber-200 p-2 /py-2 /border-b-2 border-b-amber-400">
                                <h5 className="font-bold">{data.title}</h5>
                                <button
                                    className="absolute right-1 px-2 text-slate-500"
                                    onClick={() => setFlashCardDialog(true)}>
                                    <MdEdit size={20} />
                                </button>
                            </div>
                            <div className="/bg-slate-200 /mt-2 p-3 /rounded-md text-sm">
                                
                                <div>概要</div>
                                <p>{data.description}</p>
                            </div>
                        </div>


                        <Dialog open={flashcardDialog} onClose={() => setFlashCardDialog(false)} className="relative z-50">
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                            <DialogPanel className="max-w-lg space-y-4 border bg-white px-1 py-10 sm:px-10 rounded-lg shadow-md">
                                <DialogTitle className="font-bold">単語帳編集</DialogTitle>
                                <Description>This will permanently deactivate your account</Description>
                                <form onSubmit={Submit} className="px-5">
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

                                                        <label htmlFor={access.id} className="w-20 h-10 text-xs text-center focus:outline-none peer-checked:bg-amber-400 peer-checked:text-white flex items-center justify-center">
                                                            {access.name}
                                                        </label>

                                                    </li>
                                                )) }
                                            </ul> 
                                        </div>

                                    </div>
                                        
                                    <label htmlFor="" className="block mt-3 text-sm">タイトル</label>
                                    <input type="text" 
                                        className="w-full h-10 border border-gray-300 rounded-lg pl-2" 
                                        placeholder="タイトル" 
                                        value={data.title}
                                        name="title"
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    /> 

                                    <label htmlFor="" className="block mt-3 text-sm">概要</label>
                                    <textarea 
                                        name="description" 
                                        id="" 
                                        className="w-full h-32 border border-gray-300 rounded-lg pl-2 /mt-1"
                                        onChange={(e) => setData('description', e.target.value)}
                                        value={data.description==null ? "":data.description}
                                    >
                                    </textarea>

                                    <div className="mt-2">
                                        <DesignedPrimaryButton>保存</DesignedPrimaryButton>
                                    </div>
                                                        
                                </form> 
                            </DialogPanel>
                            </div>
                        </Dialog>     

                        <div className="flex items-center justify-center px-5 py-2">
                            単語カード
                            <span className="bg-slate-200 ml-2 px-2 rounded-full">
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

                        {/* 削除確認ダイアログ */}
                        <Dialog open={createCardDialog} onClose={() => setCreateCardDialog(false)} className="relative z-50">
                            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-slate-200/70">
                                <DialogPanel className="/max-w-lg /space-y-4 border bg-white p-2 rounded-lg shadow-md overflow-hidden">
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
