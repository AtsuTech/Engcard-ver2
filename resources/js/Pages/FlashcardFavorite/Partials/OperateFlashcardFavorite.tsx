import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import CreateFlashcardFavoriteForm from "./CreateFlashcardFavoriteForm";
import DeleteFlashcardFavoriteForm from "./DeleteFlashcardFavoriteForm";

export default function OperateFlashcardFavorite({id,count,has}: { id: number, count: number,has: number }) {

    // const { data, setData, patch, put, post, delete: destroy, reset, errors, processing, recentlySuccessful } = useForm({
    //     flashcard_id: id,
    // });

    //データ保存処理
    // const submit: FormEventHandler = (e) => {
    //     e.preventDefault();
    //     // destroy(route('flashcardfavorite.destroy',id));


    //     post(route('flashcardfavorite.delete'), {
    //         preserveScroll: true,
    //         onFinish: () => reset(),
    //     });
    // };

    return (
        <div className="flex items-center space-x-1 bg-white p-1 rounded-md">
            {has == 0 ? 
                <div>
                    <CreateFlashcardFavoriteForm id={id} />
                </div>
                
            :
                <div>
                    <DeleteFlashcardFavoriteForm id={id} />
                </div>
            }
            <div>{count}</div>
        </div>
    );
}
