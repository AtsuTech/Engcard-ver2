import { useRef, FormEventHandler } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

export default function ChangePasswordForm({ className = '' }: { className?: string }) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <section className={className}>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label htmlFor="" className="text-xs dark:text-white">現在のパスワード</label>
                    <input 
                        type="password"  
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        required
                        autoComplete="現在のパスワード"
                    />

                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="" className="text-xs dark:text-white">新しいパスワード</label>
                    <input 
                        type="password" 
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        autoComplete="新しいパスワード"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label htmlFor="" className="text-xs dark:text-white">新しいパスワード(確認)</label>
                    <input 
                        type="password" 
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                        autoComplete="新しいパスワード(確認)"
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <DesignedPrimaryButton disabled={processing}>変更</DesignedPrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
