import { FC } from "react";
import { useState} from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

export default function FlashCardOperationDropDown (
    {
        id, 
        uuid,
        item,
    }
    :
    {
        id:any,
        uuid:string,
        item:string,
    }
){ 


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

    //削除ダイアログ制御
    const [deleteDialog,setDeleteDialog] = useState(false);

    //削除処理
    const Destroy = (e :any) =>{
        e.preventDefault();

        destroy(route('flashcard.destroy',id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    }

    return (
        <>
        <Menu>
            <MenuButton>
                <div className="/bg-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 w-10 h-5 text-gray-700">
                    <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>
                </div>
            </MenuButton>
        
            <MenuItems anchor="bottom end"  className="bg-white p-1 rounded-lg shadow-lg w-32">
                <MenuItem>
                    <Link href={route('flashcard.edit',uuid)} className="block w-full data-[focus]:bg-amber-100 p-2 rounded-lg">
                        編集
                    </Link>
                </MenuItem>
                <MenuItem>
                    <button onClick={() => setDeleteDialog(true)} className="block w-full data-[focus]:bg-amber-100 p-2 rounded-lg text-rose-600 text-left">
                        削除
                    </button>
                </MenuItem>
            </MenuItems>        
        
        </Menu>
        {/* 削除確認ダイアログ */}
        <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4 dark:bg-black/60">
            <DialogPanel className="max-w-lg space-y-4 p-12 rounded-lg shadow-md bg-white dark:bg-gray-800 dark:text-white">
                <DialogTitle className="font-bold">単語帳削除</DialogTitle>
                <Description className="text-xs">
                    "{item}"を削除します。<br/>
                    本当によろしいですか？
                </Description>
                <div className="flex space-x-2">
                    <button type="button" className="block px-3 h-8 bg-gray-400 text-white rounded-full font-bold" onClick={() => setDeleteDialog(false)}>
                        キャンセル
                    </button>
                    <button type="button" className="block px-3 h-8 bg-rose-600 text-white rounded-full font-bold" onClick={Destroy}>
                        削除
                    </button>
                </div>
            </DialogPanel>
            </div>
        </Dialog> 
        </>
    )
}


