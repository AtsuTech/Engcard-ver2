import { FC } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export const FlashCardOperationDropDown:FC<{id:any}> = ({id})=> {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    //削除処理
    const Destroy = (e :any) =>{
        e.preventDefault();

        destroy(route('flashcard.destroy',id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }

    return (
        <Menu>
            <MenuButton>
                <div className="/bg-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-10 h-5 text-gray-700">
                    <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>
                </div>
            </MenuButton>
        
            <MenuItems anchor="bottom end">
                <div className="bg-white p-1 rounded-lg shadow-lg w-32">
                    <MenuItem>
                        <Link href={`/flashcard/${id}/edit`} className="block w-full data-[focus]:bg-amber-200 px-2 rounded-lg">
                            編集
                        </Link>
                    </MenuItem>
                    <MenuItem>
                        <button onClick={Destroy} className="block w-full data-[focus]:bg-rose-200 px-2 rounded-lg text-rose-600 text-left">
                            削除
                        </button>
                    </MenuItem>
                </div>    
            </MenuItems>        
        
        </Menu>
    )
}


