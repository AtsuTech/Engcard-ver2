import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PageBack } from '@/Components/PageBack';



//データ型宣言
type Flashcard = {
    id: number;
    title: string;
    access_id: number;
    description: string | null;
};


export default function Show({ auth, flashcard }: PageProps<{ flashcard:Flashcard }>) {
    

    const { data, setData, patch, put, post, errors, processing, recentlySuccessful } = useForm({
        id: flashcard.id,
        title: flashcard.title,
        access_id: flashcard.access_id,
        description: flashcard.description,
    });


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{data.title}</h2>}
        >
            <Head title="show" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    <div className="flex">
                        <div className="mr-3">
                            <PageBack />
                        </div>
                        {/* <FlashcardBreadcrumbs current={flashcard.title} user={flashcard.user_id} /> */}
                    </div>

                    <div className="relative h-10 px-2 text-xs">
                        <div className="absolute flex right-2 mt-1">

                            <div className="w-32 py-2 text-center /bg-blue-500 text-xs">
                                編集:{flashcard.id}
                            </div>
                            <Link href={`/profile/${flashcard.id}`}>
                                <div className="flex w-fit /bg-rose-500">
                                    
                                    <div className="py-2">
                                        {flashcard.id ?
                                            <img src={location.protocol + '//' + window.location.host +'/storage/images/profile/' + flashcard.id} className="w-4 block rounded-full" />
                                        :
                                            <img src={location.protocol + '//' + window.location.host + "/material/images/icon-no-img.png" } className="w-4 block rounded-full" />
                                        }                                    
                                    </div>
                                    
                                    <div className="pl-0.5 py-2 truncate">{flashcard.id}</div>
                                    
                                </div>    
                            </Link>                    
                        </div>
                    </div>

                    <div className="w-full h-fit border-2 border-yellow-400 mb-5 rounded-lg">

                        <div className="relative flex w-full h-10 pl-2 pt-1 bg-yellow-400 text-sm">

                            <div className="flex w-20 h-6 mt-1 text-xs items-center justify-center rounded-full bg-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                                </svg>
                                単語帳
                            </div>

                            <div className="absolute top-1.5 right-2">
                                {/* <FlashcardFavorite id={flashcard_id} /> */}
                            </div>

                        </div>

                        <div className="p-2">
                            {/* <h5 className="text-2xl h-fit /mb-2 text-wrap bg-purple-600">{flashcard.title}</h5> */}
                            <h5 className="text-2xl h-fit text-wrap break-all">
                                {flashcard.title}
                            </h5>                            
                        </div>


                    </div>


                    {flashcard.description &&
                        <div className="w-full  p-2 text-xs border bg-gray-200 rounded-lg">
                            <div className="text-sm font-bold">概要</div>
                            {flashcard.description}
                        </div>
                    }

                </div>
            </div>
        </AuthenticatedLayout>
    );
}