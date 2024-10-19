import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { title } from 'process';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import FlashCardOperationDropDown from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
//import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
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
    
    return (
        <CommonLayout>
            <Head title="単語帳" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-700 dark:text-white">
                            <GiBookCover size={26} />
                            <h5 className="text-1.5xl ml-1 font-bold">
                                単語帳<span className="ml-2 bg-amber-200 px-2 py-1 rounded-md dark:text-slate-500">{flashcards.length}冊</span>
                            </h5>
                        </div> 
                        <div className="p-5">
                            {flashcards.length == 0 ? 
                                <div className='flex items-center justify-center h-64'>
                                    <p className='text-gray-600 text-sm'>まだ単語帳はありません。</p>
                                    <Link href={route('flashcard.create')} className='text-amber-600 text-sm underline'>つくる</Link>
                                </div>
                            :
                                <div>
                                    {flashcards.map( (flashcard:any) => (
                                        <div key={flashcard.uuid}>
                                            <FlashCard
                                                id={flashcard.id}
                                                uuid={flashcard.uuid}
                                                title={flashcard.title}
                                                description={flashcard.description}
                                                access={flashcard.access.type}
                                                access_name={flashcard.access.name}
                                                access_view={true}
                                                cards_length={flashcard.cardlength}
                                                favorite={flashcard.favorite}
                                                user_name={flashcard.user.name}
                                                user_img={flashcard.user.profile_photo_path}
                                                operation_allow={true}
                                            />
                                        </div>
                                    ))}                                    
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}