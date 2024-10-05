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
import { router } from '@inertiajs/react';
// import { FaDeleteLeft } from "react-icons/fa6";
// import { CiImageOn } from "react-icons/ci";
// import { MdOutlineClear } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import { IoArrowBack } from "react-icons/io5";
import Card from '@/Components/Special/Card';

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
    category: string;
    category_id: number;
    sentence: string;
    sentence_mean: string;
    link: string;
    wordmeans: WordMean[];
};

//export default function Edit({ auth, categories, card }: PageProps<{ categories:Category[], card:Card }>) {
export default function Show({ auth, flashcard_uuid, categories, card, wordmeans }: PageProps<{ flashcard_uuid:string, categories:Category[], card:Card, wordmeans:any }>) {

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: card.id,
        uuid: card.uuid,
        flashcard_id: card.flashcard_id,
        word: card.word,
        word_mean: card.word_mean,
        img_path: card.img_path,
        category: card.category,
        category_id: card.category_id,
        sentence: card.sentence,
        sentence_mean: card.sentence_mean,
        link: card.link,
        img_delete: false,
        _method: "post",
    });



    console.log(card)


    return (
        <CommonLayout>
            <Head title={data.word} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 /space-y-6">
                        <Card
                            memory="Apple"
                            //imgflag={true}
                            img_path={data.img_path}
                            word={data.word}
                            word_mean={data.word_mean}
                            category={data.category}
                            sub_word_mean={wordmeans}
                            sentence={data.sentence}
                            sentence_mean={data.sentence_mean}
                            link={data.link}
                        />                    
                </div>
            </div>
        </CommonLayout>
    );
}
