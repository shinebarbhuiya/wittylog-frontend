'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent } from 'react';

export default function Form() {
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const response = await fetch(`http://localhost:8000/auth/users/`, {
            method: 'POST',
            body: JSON.stringify({
                first_name : formData.get('first_name'),
                last_name : formData.get('last_name'),
                email: formData.get('email'),
                password: formData.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log({ response });

        router.push('/login');
    };
    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 mx-auto max-w-md mt-10"
        >
            <input
                name="first_name"
                className="border border-black text-black"
                type="text"
            />
            <input
                name="last_name"
                className="border border-black text-black"
                type="text"
            />
            <input
                name="email"
                className="border border-black text-black"
                type="email"
            />
            <input
                name="password"
                className="border border-black  text-black"
                type="password"
            />
            <button type="submit">Register</button>
        </form>
    );
}