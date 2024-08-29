import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { useForm } from 'laravel-precognition-react-inertia'; //ライブバリデー
import { ChangeEvent } from 'react';//ライブバリデーション

type Form = {
    personal_id: string;
};

export default function UpdateUserIdForm({ className = '' }: { className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const form = useForm<Form>('post', route('profile.update_personal_id'), { 
        personal_id: user.personal_id,
    });

    const Submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        form.submit({
            preserveScroll: true,
            onSuccess: () => {
                //form.reset();
            },
            onError: (errors: object) => {
                console.error(errors);
            },
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        form.setData('personal_id', e.target.value);
        form.forgetError('personal_id');
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    ユーザーID
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    ユーザーIDを変更します。
                </p>
            </header>

            <form onSubmit={Submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    {form.data.personal_id}
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={form.data.personal_id}
                        onChange={handleChange}
                        onBlur={() => form.validate('personal_id')}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    
                    {/* ライブバリデーション */}
                    {form.invalid('personal_id') && (
                        <InputError message={form.errors.personal_id} className="mt-2" />
                    )}
                    
                </div>

                <PrimaryButton disabled={form.processing}>Save</PrimaryButton>
            </form>
        </section>
    );
}
