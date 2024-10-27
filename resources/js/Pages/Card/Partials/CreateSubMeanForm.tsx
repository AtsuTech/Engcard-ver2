import React, { useEffect, useRef, FC, useState } from "react";
import SubMeanCategorySelect from "./SubMeanCategorySelect";



export default function CreateSubMeanForm({setData}: { setData:any}) {

    // サブの意味を配列で保管
    const [subWordMeans, setSubWordMeans] = useState<any>([
        //５まで登録可能
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
        { category_id:1, word_mean: '' },
    ]);

    //テキストフィールドのデータをセット
    const handleInputSub = (index: number, name: string, value: string) => {
        //元の配列をコピーして、それを編集するようにする
        const newSubWordMeans = [...subWordMeans];
        if (!newSubWordMeans[index]) {
            newSubWordMeans[index] = { category_id: '', word_mean: '' };
        }
        newSubWordMeans[index][name] = value;
        setSubWordMeans(newSubWordMeans);
        setData('sub_means',JSON.stringify(subWordMeans));
    }

    //カテゴリのデータをセット
    const handleCategory = (index: number, value: string) => {
        //元の配列をコピーして、それを編集するようにする
        const newSubWordMeans = [...subWordMeans];
        if (!newSubWordMeans[index]) {
            newSubWordMeans[index] = { category_id: '', word_mean: '' };
        }
        newSubWordMeans[index]['category_id'] = value;
        setSubWordMeans(newSubWordMeans);
        setData('sub_means',JSON.stringify(subWordMeans));
    }

    return(
        <section className="space-y-1">
             {subWordMeans.map((dummy:any,index:any) => (
                <div className="flex w-full h-8 p-0.5 border border-gray-300 rounded-lg" key={'#' + index}>
                    
                    <SubMeanCategorySelect index={index} selected={1} setCategory={handleCategory} />
                    <input type="text"
                        name={`word_mean[${index}][word_mean]`}
                        value={subWordMeans[index].word_mean}
                        className="w-full ml-1 border-none rounded-md pl-1"
                        placeholder="サブの意味"
                        onChange={(e) => handleInputSub(index, 'word_mean', e.target.value)}
                        required
                    />
                </div>
            ))} 
        </section>
    );
}