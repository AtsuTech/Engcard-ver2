import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
import CreateFlashcardFavoriteForm from '../FlashcardFavorite/Partials/CreateFlashcardFavoriteForm';
import { GiBookCover } from "react-icons/gi";
import FlashCard from '@/Components/Special/FlashCard';


//データ型宣言
type Flashcard = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
    uuid: string;


    access: any;
    user:any;
};


export default function Index({ auth, flashcards }: PageProps<{ flashcards:Flashcard[] }>) {
    

    // const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
    //     id: flashcards.id,
    //     title: flashcards.title,
    //     access_id: flashcards.access_id,
    //     description: flashcards.description,
    //     _method: "patch",
    // });

    //データ送信
    // const Submit = (e :any) =>{
    //     e.preventDefault();
    //     patch(route("flashcard.update",data.id));
    // }


    return (
        <CommonLayout>
            <Head title="単語帳" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-700">
                            <GiBookCover size={26} />
                            <h5 className="text-1.5xl ml-1 font-bold">単語帳</h5>
                        </div> 
                        <div className="p-5">
                            <div>
                                {flashcards.length}冊
                            </div>
                            {flashcards.map( (flashcard:any) => (
                                <div key={flashcard.uuid}>
                                    <FlashCard
                                        id={0}
                                        uuid={flashcard.uuid}
                                        title={flashcard.title}
                                        description={flashcard.description}
                                        access={flashcard.access.type}
                                        access_name={flashcard.access.name}
                                        access_view={true}
                                        cards_length={123}
                                        favorite={flashcard.favorite}
                                        user_name={flashcard.user.name}
                                        user_img={flashcard.user.profile_photo_path}
                                        operation_allow={true}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}