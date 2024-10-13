import { ButtonHTMLAttributes } from 'react';

export default function DesignedPrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `/inline-flex items-center w-full px-4 py-1 bg-amber-400 border border-transparent rounded-full font-semibold text-white dark:text-gray-800 uppercase tracking-widest hover:bg-amber-500 focus:bg-amber-500 dark:focus:bg-white active:bg-amber-600 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
