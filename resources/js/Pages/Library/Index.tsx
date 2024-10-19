import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { GiBookshelf } from "react-icons/gi";
import FlashCard from '@/Components/Special/FlashCard';

type Flashcard = {
    id: number;
    uuid: string;
    title: string;
    description: string;
    access: any;
    favorite: number;
    cardlength: number;
    user:any;
}

export default function Index({ flashcards, hi_watch_flashcards }: {flashcards:Flashcard[],hi_watch_flashcards:Flashcard[]}) {
    console.log(flashcards);
    return (
        <CommonLayout>
            <Head title="ライブラリ" />

            <div className="py-0 sm:py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden sm:shadow sm:rounded-lg">

                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600 dark:text-white">
                            <GiBookshelf size={26} />
                            <h5 className="font-bold">ライブラリ</h5>
                        </div> 

                        
                        <div className="px-3 py-10 space-y-2">

                            <h1 className='text-2xl dark:text-white'>最新の単語帳</h1>
                            {flashcards.length != 0 ? 
                                <>
                                    {flashcards.map((flashcard)=>(
                                        <FlashCard
                                            id={0}
                                            uuid={flashcard.uuid}
                                            title={flashcard.title}
                                            description={flashcard.description}
                                            access={flashcard.access.type}
                                            access_name={flashcard.access.name}
                                            access_view={false}
                                            cards_length={flashcard.cardlength}
                                            favorite={flashcard.favorite}
                                            user_name={flashcard.user.name}
                                            user_img={flashcard.user.profile_photo_path}
                                            operation_allow={false}
                                        />
                                    ))} 
                                </>    
                            : 
                                <div className="flex items-center justify-center w-full h-[200px] text-slate-500">
                                    <div className="text-xs">
                                        表示できる単語帳が存在しません
                                    </div>
                                </div>
                            }                       
         
                            <h1 className='text-2xl dark:text-white'>注目の単語帳</h1>
                            {hi_watch_flashcards.length != 0 ? 
                                <>
                                    {hi_watch_flashcards.map((flashcard)=>(
                                        <FlashCard
                                            id={0}
                                            uuid={flashcard.uuid}
                                            title={flashcard.title}
                                            description={flashcard.description}
                                            access={flashcard.access.type}
                                            access_name={flashcard.access.name}
                                            access_view={false}
                                            cards_length={flashcard.cardlength}
                                            favorite={flashcard.favorite}
                                            user_name={flashcard.user.name}
                                            user_img={flashcard.user.profile_photo_path}
                                            operation_allow={false}
                                        />
                                    ))} 
                                </>    
                            : 
                                <div className="flex items-center justify-center w-full h-[200px] text-slate-500">
                                    <div className="text-xs">
                                        表示できる単語帳が存在しません
                                    </div>
                                </div>
                            } 

                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
