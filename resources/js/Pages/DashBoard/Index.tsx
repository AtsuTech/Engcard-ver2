import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import CardStatusPie from './Partials/CardStatusPie';
import FlashcardStatusBar from './Partials/FlashcardStatusBar';
import NeedReviewCards from './Partials/NeedReviewCards';
import LessViewCards from './Partials/LessViewCards';
import { MdDashboard } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

export default function Index({
        auth, 
        all_cards,
        meoryed_card,
        flashcards,
        need_review_cards,
        less_review_cards,
    }: 
    PageProps<{
        all_cards:any
        meoryed_card:any,
        flashcards:any,
        need_review_cards:any,
        less_review_cards:any,
    }>) 
    {
        console.log(need_review_cards)
    return (
        <CommonLayout>
            <Head title="ダッシュボード" />

            <div className="md:py-12 py-0">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-600">
                            {/* <MdEdit size={26} /> */}
                            <MdDashboard size={26} />
                            {/* <AiFillDashboard size={26} /> */}
                            <h5 className="font-bold">ダッシュボード</h5>
                        </div> 

                        <div className='p-5 '>

                            <section className=" /bg-black md:flex md:space-x-4 md:space-y-0 space-y-4 mb-4">

                                <CardStatusPie all_cards={all_cards} meoryed_card={meoryed_card} />

                                <div className="relative w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
                                    <h5 className="bg-yellow-200 w-full p-2 text-slate-700 absolute top-0">
                                        単語帳総数
                                    </h5>
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        <div>
                                            <span className='text-8xl font-bold'>{flashcards.length}</span>
                                            <span className='text-2xl'>冊</span>   
                                        </div>
                                    </div>
                                </div>

                                <div className="relative w-full border border-gray-300 rounded-md shadow-md overflow-hidden">
                                    <h5 className="bg-yellow-200 w-full p-2 text-slate-700 absolute top-0">
                                        カード総数
                                    </h5>
                                    <div className="flex items-center justify-center h-full text-slate-500">
                                        <div>
                                            <span className='text-8xl font-bold'>{all_cards}</span>
                                            <span className='text-2xl'>枚</span>  
                                        </div>
                                    </div>
                                </div>
                               
                            </section>
                            
                            <FlashcardStatusBar flashcards={flashcards} />

                            <section className='md:flex md:space-x-3 py-4'>
                                <NeedReviewCards cards={need_review_cards} />
                                <LessViewCards cards={less_review_cards} />
                            </section>



                        </div>


                        
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
