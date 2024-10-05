import CommonLayout from '@/Layouts/CommonLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import FlashCard from '@/Components/Special/FlashCard';

// type User{
//     name:string
// }

export default function Show({ auth, user, flashcards }: PageProps<{user:any,flashcards:[]}>) {
    console.log(flashcards);
    return (
        <CommonLayout>
            <Head title="プロフィール" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="/p-4 /sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="flex items-center w-full px-3 py-4 border-b border-b-slate-300 text-slate-700">
                            {/* <GiBookCover size={26} /> */}
                            <h5 className="text-1.5xl ml-1 font-bold">プロフィール</h5>
                        </div> 
                        <div className="p-5">

                            {auth.user.id === user.id &&
                                <div className="w-full flex flex-row-reverse">
                                    <Link href={route('profile.edit')} className="text-amber-500">
                                        編集
                                    </Link>
                                </div>
                            }    

                            <div>
                                <div className="flex relative">

                                    <div className="w-fit">

                                        {user.profile_photo_path != null ?
                                            <img src={'/storage/images/profile/' + auth.user.profile_photo_path} alt="s" className='w-12 h-12 border border-slate-300 rounded-full' />
                                        :
                                            <div className="flex items-center justify-center w-12 h-12 ml-1 text-white bg-slate-900  border border-slate-300 rounded-full">
                                                {auth.user.name.substr(0,1)}
                                            </div>
                                        } 
                                    </div>

                                    <div className="pl-2">
                                        <div className="text-2xl">{user.name}</div>
                                        <div className="text-xs text-gray-400">@{user.personal_id}</div>
                                    </div>

                                    <div className="w-32 absolute right-0">
                                        {/* 
                                        {my_id != user.id &&
                                            <div>
                                                <Following id={user.id} update={Update} />
                                            </div>                                
                                        } */}
        
                                    </div>

                                </div>

                                <div className="flex py-2">
                                    {/* <div className="p-1">
                                        <Link to={`/following/${user.personal_id}`}>
                                            <b>{user.following.length}</b> フォロー
                                        </Link>
                                    </div>
                                    <div className="p-1">
                                        <Link to={`/followed/${user.personal_id}`}>
                                            <b>{user.followed.length}</b> フォロワー
                                        </Link>
                                    </div> */}
                                </div>
                            
                                <div className="py-1">{user.comment}</div>
                            </div>
                            <div className="py-2 text-center">公開している単語帳</div>

                            <div className="/flex flex-wrap /py-2">
                                {flashcards.map( (flashcard:any) => (
                                    // <Link href={route('flashcard.show',flashcard.uuid)} className="block w-full p-3 border border-slate-300 rounded-lg">
                                    //     {flashcard.title}
                                    // </Link>
                                    <div key={flashcard.uuid}>
                                        <FlashCard
                                            id={flashcard.id}
                                            uuid={flashcard.uuid}
                                            title={flashcard.title}
                                            description={flashcard.description}
                                            access={1}
                                            access_name={''}
                                            access_view={false}
                                            cards_length={flashcard.cardlength}
                                            favorite={flashcard.favorite}
                                            user_name={auth.user.name}
                                            user_img={auth.user.profile_photo_path}
                                            operation_allow={false}
                                        />                                    
                                    </div>


                                ))}                             
                            </div>                                
                        </div>
                                        
                    </div>
                </div>
            </div>
        </CommonLayout>
    );
}
