import React, { useEffect, useRef, FC, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { CategoryContext } from "@/Pages/Flashcard/Edit"; //他ファイルで宣言されたコンテキストをインポート
import { useContext } from 'react';//コンテキストで渡されたデータを扱う


export default function CategorySelect({setData}: { setData: any }) {

    //コンテキストからカテゴリのデータを使用
    const categories:any = useContext(CategoryContext);
    
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);


    const handleChange = (category: any) => {
        setSelectedCategory(category);
        setData('category_id', category.id);
    };

    return(
        <Listbox value={selectedCategory} onChange={handleChange}>
            <ListboxButton className={"flex items-center justify-center bg-white text-xs w-32 border border-slate-300 rounded-md px-1"}>
                <div className="mr-1">
                    {selectedCategory.item}
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </ListboxButton>
            <ListboxOptions anchor="bottom" className={"bg-white text-xs w-32 border border-slate-300 rounded-md"}>
            {categories.map((category:any) => (
                <ListboxOption key={category.id} value={category} className="data-[focus]:bg-blue-100 px-2 py-1">
                {category.item}
                </ListboxOption>
            ))}
            </ListboxOptions>
        </Listbox>
    );
}