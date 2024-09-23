import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <h1 className="text-lg font-bold py-2">パスワードを忘れた</h1>
                {/* Forgot your password? No problem. Just let us know your email address and we will email you a password
                reset link that will allow you to choose a new one. */}
                パスワードをお忘れですか？心配ありません。あなたがEncardに登録しているメールアドレスを
                下記のフォームで送っていただければ、パスワードリセットページへのリンクをメールで送信します。
                リンクにアクセスし、そこでパスワードを再設定できます。
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center justify-end mt-4">
                    {/* <PrimaryButton className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton> */}
                    <DesignedPrimaryButton>
                        パスワードリセットリンク送信
                    </DesignedPrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
