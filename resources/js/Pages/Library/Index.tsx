import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { GiBookshelf } from "react-icons/gi";

type Flashcard = {
    id: number;
    title: string;

}

export default function Index({ flashcards }: {flashcards:Flashcard[]}) {
    return (
        <CommonLayout>
            <Head title="ライブラリ" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex items-center w-full p-3 bg-amber-200 /bg-gradient-to-b /from-amber-400 /to-white text-slate-700 /shadow-sm">
                            <GiBookshelf size={26} />
                            <h5 className="text-xl /ml-1 font-bold">ライブラリ</h5>
                        </div> 

                        <div className="px-3 py-10 space-y-2">

                            {flashcards.map((flashcard)=>(
                                // <div className="border border-slate-400 m-2">
                                //     {flashcard.id}{flashcard.title}
                                // </div>
                                <div className="block w-full hover:drop-shadow-md" >
                                    <div className="block w-full h-fit border border-gray-300 rounded-lg /overflow-hidden">

                                        <div className="relative flex p-2">
                                            <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                            <div className="absolute right-2 /w-32 /py-2 text-center /bg-blue-500 text-xs">
                                                {/* 編集:{date} */}
                                            </div>
                                        </div>
                                    
                                        <div className="px-4 h-12 flex items-center">
                                            <div className="w-full">
                                                <h5 className="w-full /text-xl font-bold line-clamp-1">{flashcard.title}</h5>
                                                {/* {description &&
                                                    <div className="w-full line-clamp-1 mt-1 text-xs">
                                                        <p>
                                                            {description}
                                                        </p>
                                                    </div>
                                                } */}
                                            </div>
                                        </div>
                                            
                                        <div className="relative h-10 px-2 text-xs">
                                            <div className="absolute flex right-2 mt-1">

                                                <div className="w-fit /px-2 py-2 text-center /bg-amber-500 text-xs">
                                                    <div className="flex">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400 pr-0.5">
                                                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                                        </svg>
                                                        {/* {favorite} */}
                                                    </div>
                                                </div>

                                                <div className="py-2 px-2">
                                                    <div className="flex w-fit px-2 /py-1 text-xs rounded-full bg-gray-200">{length}枚</div>
                                                </div>

                                                <div className="flex w-fit /bg-rose-500">
                                                    <div className="py-2">
                                                        {/* {user_img ?
                                                            <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + user_img} className="w-4 block rounded-full" />
                                                        :
                                                            <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="w-4 block rounded-full" />
                                                        }                            */}
                                                    </div>
                                                    {/* <div className="pl-0.5 py-2 truncate">{user_name}</div> */}
                                                </div>                        
                                            </div>


                                        </div>
                                        
                                    
                                    </div>
                                </div>
                            ))}                            
                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
