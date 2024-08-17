import { Link, useForm, usePage } from '@inertiajs/react';
import FinishButton from './FinshButton';

export default function Header({turn,cards_length,setMode,flashcard_uuid}:{turn:number,cards_length:any,setMode:any,flashcard_uuid:string}){
    return(
        <header className="flex items-center w-full h-12 border-b border-b-gray-300 z-50">
            <h1 className="w-40 p-3">クイズ</h1>

            <div className="w-full">

                {turn > 0 && turn <= cards_length &&
                    <div className="w-full p-3 text-center /bg-sky-400">{turn} / {cards_length}</div>
                }

                {turn == 0 &&
                    <div className="flex items-center w-fit ml-auto mr-auto  my-0.5 /bg-green-700 border border-gray-300 bg-white px-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 w-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                        </svg>
                        <select name="" id="" className="block /w-32 text-center border-none text-sm bg-white ml-auto mr-auto focus:outline-none cursor-pointer" onChange={(e:any) => setMode(e.target.value)}>
                            <option value={0}>カード順</option>
                            <option value={1}>ランダム</option>
                        </select>     
                    </div>
                }                    
            </div>

            <div className="w-20 /relative">
                <FinishButton uuid={flashcard_uuid} />
            </div>
            
        </header>
    );
}