import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { GrLinkNext } from "react-icons/gr";

export default function DeleteAccountForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

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

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`/space-y-6 ${className}`}>
            <header>
                {/* <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">アカウント削除します</h2> */}

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    一度アカウントを削除すると、全てのデータが削除されます。データを復元することもできません。
                </p>
            </header>

            <div className="flex items-center justify-center h-32">
                <button onClick={confirmUserDeletion} className="flex items-center bg-rose-600 text-white p-3 rounded-md /text-rose-600 w-fit ml-auto mr-auto space-x-1">
                    <span>アカウント削除に進む</span>
                    <GrLinkNext />
                </button>                
            </div>



            {/* <DangerButton onClick={confirmUserDeletion}>アカウンち</DangerButton> */}

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-rose-600 dark:text-gray-100">
                        本当にアカウントを削除してもよろしいですか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                       問題なければ、パスワードを入力してアカウントを削除ボタンを押して下さい。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <input 
                            id="password"
                            type="password"
                            name="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="パスワード"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end space-x-2">
                        {/* <SecondaryButton onClick={closeModal}>キャンセル</SecondaryButton> */}
                        <button 
                            className="rounded-full border border-gray-300 text-slate-600 px-3 py-2 text-xs font-semibold"
                            type="button"
                            onClick={closeModal}
                        >
                            キャンセル
                        </button>

                        <button 
                            className="rounded-full border border-rose-700 text-white bg-rose-700 px-3 py-2 text-xs font-semibold"
                            onClick={deleteUser}
                        >
                            アカウント削除
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
