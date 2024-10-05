import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import React, { useEffect, useRef, FC, useState } from "react";
import { FlashCardOperationDropDown } from '@/Pages/Flashcard/Partials/FlashCardOperationDropDown';
import { MdFavorite } from "react-icons/md";

export default function NameAvotor
    ({
        name,
    }
    : 
    {
        name:string,
    })

{
    var text = name.substr(0,1)
    return(
        <div className="flex items-center justify-center w-5 h-5 ml-1 text-xs text-white rounded-full bg-slate-900">
            {text}
        </div>
    );
}