import { MdPushPin } from "react-icons/md";
import { MdTextSnippet } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import Bage from "../Bage";
import Sound from "./Sound";

export default function Card(
    {
        memory,
        img_path,
        word,
        word_mean,
        category,
        sub_word_mean,
        sentence,
        sentence_mean,
        link
    }: 
    {memory:any,img_path:any,word:any,word_mean:any,category:any,sub_word_mean:[],sentence:any,sentence_mean:any,link:any})
{
    console.log(sub_word_mean)
    return(
        <div className="w-full">
            <div className="w-full md:w-96 mx-auto /border rounded-lg bg-white overflow-hidden">

                <div className="relative">

                    <div className="absolute top-2 right-2">
                        <Sound text={word} />
                    </div>
                    
                    <div className="absolute top-1 left-1 rounded-full ">
                        {memory?
                        <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-amber-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>                              
                        :
                            <div className="">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="/size-6 w-6 text-gray-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                </svg>                        
                            </div>       
                        }                        
                    </div>

                    {img_path ?

                        <div>
                            <div style={{ backgroundImage: `url(${img_path})` }} className="bg-cover bg-center w-full h-[130px] md:h-[160px]">
                            </div>     
                            <h2 className="flex p-1 /text-2xl md:text-3xl items-center justify-center">
                                <div className="flex items-center"> 
                                    <div className="flex items-center justify-center pr-1">
                                        {/* <SoundAction value={word} /> */}
                                    </div>
                                    <div className="w-full /text-wrap flex items-center py-3 font-semibold">
                                        {word.length > 40 ?
                                            <span className="text-[16px] text-slate-800">{word}</span>
                                        :
                                            <span className="text-slate-800">{word}</span>
                                        }
                                    </div>                                
                                </div> 
                            </h2>                           
                        </div>


                    :
                        <h2 className="flex p-1 h-36 md:h-64 text-2xl md:text-3xl items-center justify-center">
                            <div className="flex"> 
                                <div className="w-full text-center font-semibold /ml-2 /bg-green-400">
                                    {word.length > 40 ?
                                        <span className="text-[16px] text-slate-800">{word}</span>
                                    :
                                        <span className="text-slate-800">{word}</span>
                                    }
                                </div>                                
                            </div> 
                        </h2>                  
                    }
                </div>

                <div className="w-full h-fit">
                    <div className="flex items-center w-full pl-2 bg-yellow-400 text-xs text-orange-800">
                        <MdPushPin />
                        意味
                    </div>

                    <div className="text-sm px-2 py-1">

                        <div className="flex items-center py-1 text-xs">
                            <div>
                                {category != null && <Bage text={category} /> }
                                <span className="text-slate-800">{word_mean}</span>                               
                            </div>
                        </div>

                        <hr />

                        {/* サブの意味 */}
                        {sub_word_mean && sub_word_mean.length > 0 && 
                            sub_word_mean.map((sub_mean: any, index: number) => (
                                <div key={index}>
                                    <div className="flex items-center py-1 text-xs">
                                        <div>
                                            {sub_mean.category != null && sub_mean.category_id != 1 && <Bage text={sub_mean.category} /> }
                                            <span className="text-slate-800">{sub_mean.word_mean}</span>                              
                                        </div>
                                    </div>
                                    <hr />                                
                                </div>

                            ))
                        }

                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="flex items-center w-full pl-2 bg-yellow-400 text-xs text-orange-800">
                        <MdTextSnippet />
                        例文
                    </div>
                    <div className="px-2 py-1 divide-y divide-dashed divide-yellow-400">
                        
                        <div className="text-xs">
                            <div className="text-slate-800">[ 英文 ]</div>
                            <p className="py-1 text-slate-800">{sentence ? <>{sentence}</> : "英文はありません"}</p>
                        </div>
                        
                        <div className="text-xs">
                            <div className="text-slate-800">[ 和訳 ]</div>
                            <p className="py-1 text-slate-800">{sentence_mean ? <>{sentence_mean}</> : "和訳はありません"}</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-fit">
                    <div className="flex items-center w-full pl-2 bg-yellow-400 text-xs text-orange-800">
                        <FaLink />
                        外部リンク
                    </div>
                    <div className="p-2 text-xs">
                        {link ?
                            <a href={link} className="w-full /break-words text-yellow-400 line-clamp-1 /truncate /text-left" target="_blank">{link}</a>
                            :
                            <div className="text-xs text-gray-500">
                                <i>リンクはありません</i>
                            </div>
                        }                        
                    </div>

                    
                </div>

            </div>
        </div>
    );
}