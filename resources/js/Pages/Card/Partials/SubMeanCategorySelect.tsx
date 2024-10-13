import React, { useEffect, useRef, FC, useState } from "react";
import { Link, useForm, usePage } from '@inertiajs/react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CategoryContext } from "@/Pages/Category/Partials/CategoryContext";
import { useContext } from 'react';//コンテキストで渡されたデータを扱う
import CreateCategoryForm from "@/Pages/Category/Partials/CreateCategoryForm";


export default function SubMeanCategorySelect({index, selected, setCategory}: { index:number, selected:number, setCategory: any }) {

    //コンテキストからカテゴリのデータを使用
    const categories:any = useContext(CategoryContext);

    //現在の選択されているカテゴリをフィルタ
    const selectedItem = categories.find((category:any) => category.id === selected);

    //ドロップダウンUIに現在の選択されているカテゴリをセット
    const [selectedCategory, setSelectedCategory] = useState(selectedItem);

    //カテゴリをセットする
    const handleChange = (category: any) => {
        setSelectedCategory(category);
        setCategory(index,category.id);
    };

    return(
        <Listbox value={selectedCategory} onChange={handleChange}>
            <ListboxButton className={"flex items-center justify-center bg-white text-slate-700  text-xs w-[90px] border border-slate-300 rounded-md px-1"}>
                <div className="mr-1 w-[50px] truncate">
                    {selectedCategory && <span>{selectedCategory.item}</span>}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </ListboxButton>
            <ListboxOptions anchor="bottom" className={"bg-white text-xs w-32 border border-slate-300 rounded-md"}>
            {categories.map((category:any) => (
                <ListboxOption key={category.id} value={category} className="data-[focus]:bg-amber-100 px-5 py-3 truncate">
                {category.item}
                </ListboxOption>
            ))}
            <div className="p-2 border-t border-t-slate-300">
                <CreateCategoryForm />
            </div>            
            </ListboxOptions>
        </Listbox>
    );
}