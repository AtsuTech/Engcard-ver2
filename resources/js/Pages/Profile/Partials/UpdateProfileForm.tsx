import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { FormEventHandler } from 'react';
import { PageProps } from '@/types';
import { UpdatePhotoForm } from './UpdatePhotoForm';
import DeletePhotoForm from './DeletePhotoForm';
import DesignedPrimaryButton from '@/Components/DesignedPrimaryButton';

export default function UpdateProfileForm({ mustVerifyEmail, status, className = '' }: { mustVerifyEmail: boolean, status?: string, className?: string }) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        profile_photo_path: user.profile_photo_path,
        comment: user.comment,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className="">

            <h6 className="py-1">プロフィール画像編集</h6>
            <div className='flex items-center sm:w-1/2 space-x-3 border border-gray-300 rounded-md py-2'>
                <div>
                {user.profile_photo_path != null ?
                    <img src={'/storage/images/profile/' + user.profile_photo_path} alt="s" className='w-12 h-12 ml-1 rounded-full' />
                :
                    <div className="flex items-center justify-center w-12 h-12 ml-1 rounded-full bg-cyan-200 te">
                        {data.name.substr(0,1)}
                    </div>
                } 
                </div>
                <UpdatePhotoForm /> 
                {user.profile_photo_path != null &&
                    <DeletePhotoForm />
                }
            </div>

            <h6 className="py-1 mt-4">プロフィール情報編集</h6>
            <form onSubmit={submit} className="space-y-3 border border-gray-300 rounded-md p-2">
                <div>

                    <label htmlFor="" className="text-xs">お名前</label>
                    <input 
                        type="text" 
                        id="name"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>

                    <label htmlFor="" className="text-xs">メールアドレス</label>
                    <input 
                        id="email"
                        type="email"
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <label htmlFor="" className="text-xs">コメント</label>
                    <textarea 
                        className="mt-1 block w-full border border-gray-300 rounded-md"
                        name="comment" 
                        id="comment"
                        value={data.comment}
                        onChange={(e) => setData('comment', e.target.value)}
                        autoComplete="ご自由にコメントをどうぞ"
                    >
                    </textarea>
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            あなたのメールアドレスはまだ認証されていません
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                認証メールを送る
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                認証リンクが送信されました
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <DesignedPrimaryButton disabled={processing}>更新</DesignedPrimaryButton>

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
