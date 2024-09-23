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
    user:any;
}

export default function Index({ flashcards }: {flashcards:Flashcard[]}) {
    console.log(flashcards);
    return (
        <CommonLayout>
            <Head title="ライブラリ" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            <GiBookshelf size={26} />
                            <h5 className="font-bold">ライブラリ</h5>
                        </div> 

                        <div className="px-3 py-10 space-y-2">

                            {flashcards.map((flashcard)=>(
                                <FlashCard
                                    id={0}
                                    uuid={flashcard.uuid}
                                    title={flashcard.title}
                                    description={flashcard.description}
                                    access={flashcard.access.type}
                                    access_name={flashcard.access.name}
                                    access_view={false}
                                    cards_length={123}
                                    user_name={flashcard.user.name}
                                    user_img={flashcard.user.profile_photo_path}
                                />
                            ))}                            
                        </div>

                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
