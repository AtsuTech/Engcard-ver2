import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { MdFavoriteBorder } from "react-icons/md";

export default function CreateFlashcardFavoriteForm({id}: { id: number }) {

    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        flashcard_id: id,
    });

    //データ保存処理
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('flashcardfavorite.store'));
    };

    return (
        <div>
            <form action="">
                <button onClick={submit} className="block"><MdFavoriteBorder size={18} color={'gray'} /></button>
            </form>
        </div>
    );
}
