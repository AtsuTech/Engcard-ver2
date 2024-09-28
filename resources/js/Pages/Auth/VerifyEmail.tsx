import GuestLayout from '@/Layouts/GuestLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Email Verification" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                <h1 className="text-lg my-3 font-bold">
                    Engcardにご登録いただきありがとうございます。
                </h1>
                {/* Thanks for signing up! Before getting started, could you verify your email address by clicking on the
                link we just emailed to you? If you didn't receive the email, we will gladly send you another. */}
                
                ご利用を始める前に、メールアドレスにユーザー認証用のメールを送信しましたので、
                届いたメールからユーザー認証を完了させてください。
                メールが届かない場合は、下の"メール再送信"を押してください。
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
                    A new verification link has been sent to the email address you provided during registration.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="my-10">
                    {/* <PrimaryButton disabled={processing}>Resend Verification Email</PrimaryButton> */}
                    <DesignedPrimaryButton disabled={processing}>メール再送信</DesignedPrimaryButton>
                </div>
                <div>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        ログアウト
                    </Link>                        
                </div>
            </form>
        </GuestLayout>
    );
}
