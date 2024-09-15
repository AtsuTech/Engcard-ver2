import { useRef, useState, FormEventHandler } from 'react';
// import DangerButton from '@/Components/DangerButton';
// import InputError from '@/Components/InputError';
// import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'


export default function DeletePhotoForm({ }: {  }) {
    //const { auth } :any= usePage().props;  

    let [isOpen, setIsOpen] = useState(false)

    const DialogOpen =()=>{setIsOpen(true)};
    const DialogClose =()=>{setIsOpen(false)};



    //InertiaのuseFormでデータをサーバに送る
    const { data, setData, patch, put, post, delete: destroy, errors, processing, recentlySuccessful } = useForm({});

    //サーバにアップ
    const Delete =()=>{
        destroy(route('profile.photo_update'));
        DialogClose();
    }

    return (
        <section className="">

            <button className="flex items-center w-fit cursor-pointer appearance-none justify-center rounded-full bg-rose-600 text-white px-5 py-2 transition-all" type="button" onClick={DialogOpen}>削除</button>

                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4 /bg-black">
                    <DialogPanel className="max-w-lg space-y-4 border bg-white p-12 rounded-lg shadow-md">
                        <DialogTitle className="font-bold text-slate-600">プロフィール画像を削除</DialogTitle>
                        <Description className="text-sm">
                            画像を削除します。本当によろしいですか？
                        </Description>
                        <div className="">
                            
                            <div className="flex mt-6 justify-end">
                                <button className="block w-24 h-10 bg-slate-400 text-white rounded-full font-bold mr-2" onClick={() => setIsOpen(false)}>キャンセル</button>
                                <button className="block w-20 h-10 bg-rose-600 text-white rounded-full font-bold" onClick={Delete}>削除</button>
                            </div>                              
                        </div>
                    </DialogPanel>
                    </div>
                </Dialog> 
        </section>
    );
}
