import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';



//データ型宣言
type Flashcards = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
    uuid: string;
};


export default function Index({ auth, flashcards }: PageProps<{ flashcards:Flashcards[] }>) {
    

    // const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
    //     id: flashcard.id,
    //     title: flashcard.title,
    //     access_id: flashcard.access_id,
    //     description: flashcard.description,
    //     _method: "patch",
    // });

    //データ送信
    // const Submit = (e :any) =>{
    //     e.preventDefault();
    //     patch(route("flashcard.update",data.id));
    // }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">単語帳</h2>}
        >
            <Head title="単語帳" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {
                        flashcards.map( (flashcard:any) => (
                        
                            <div  key={flashcard.id} className="block w-full h-fit mb-4 border-2 border-yellow-400 rounded-lg">

                                <div className="flex w-full items-center h-10 /h-fit bg-yellow-400 p-1">
                                    {/* <div className="w-full">
                                        {flashcard.access.type == 0 && <PrivateIcon value={flashcard.access.item}/>}
                                        {flashcard.access.type == 1 && <PublicIcon value={flashcard.access.item} />}
                                    </div>

                                    <OperateFlashCardMenu uuid={flashcard.uuid} id={flashcard.id} Update={Update} /> */}
                                    <div className="flex w-fit items-center ml-auto">
                                        <FlashCardOperationDropDown id={flashcard.uuid} />
                                    </div>
                                    
                                </div>

                                
                                <Link href={route('flashcard.show',flashcard.uuid)} className="block w-full">
                                    <div className="p-2">
                                        <h5 className="text-xl pb-2 break-all">{flashcard.title}</h5>
                                        {flashcard.description != null &&
                                            <div className="wfull p-2 bg-gray-200 rounded-lg text-xs">
                                                <div>
                                                    <b>概要</b>
                                                </div>
                                                <p>
                                                    {flashcard.description}
                                                </p>
                                            </div>
                                        }
                                    </div>
                                        
                                    <div className="text-right pr-2 text-xs">
                                        <small className="mr-2">{flashcard.updated_at}</small>
                                        {/* <small>カード数:{flashcard.cards.length}枚</small> */}
                                    </div>
                                </Link>
                                
                            </div>
                            
               
                        ))
                    } 
                </div>
            </div>
        </AuthenticatedLayout>
    );
}