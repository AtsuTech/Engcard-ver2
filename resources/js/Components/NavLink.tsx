import { Link, InertiaLinkProps } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-xs font-bold leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-transparent text-gray-900 dark:text-gray-100 drop-shadow-2xl'
                    : 'border-transparent text-gray-500 dark:text-gray-400 focus:text-gray-700 dark:focus:text-gray-300 focus:border-gray-300 dark:focus:border-gray-700 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
