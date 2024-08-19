import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function DeleteFlashcardFavoriteForm({id}: { id: number }) {

    const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
        flashcard_id: id,
    });

    //データ保存処理
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // destroy(route('flashcardfavorite.destroy',id));


        post(route('flashcardfavorite.delete'), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    return (
        <div>
            <form action="">
                <button onClick={submit}>UnFavorite</button>
            </form>
        </div>
    );
}
