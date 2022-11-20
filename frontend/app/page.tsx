'use client';
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from 'next/navigation';
// import { Home } from "../components/Home";

const loginApi = async (data: any) => {
    const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    return res.json();
}

export default function Page() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, addProfile, addToken } = useAuthStore()
    const router = useRouter();

    useEffect(() => {
        console.log(token)
    }, [token])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            email,
            password
        }

        const res = await loginApi(data);

        if (res.status) {
            addProfile(res.data.user)
            addToken(res.data.token)

            router.push('/dashboard')
        }
        
        setEmail('')
        setPassword('')
        setIsLoading(false);
    }

    return (
        <div>
            <h1 className="mb-5 text-3xl font-bold underline">
                Sign In
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-500 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input type="email" name="email" placeholder="Input Your Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                        className="appaerance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-500 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="Input Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        className="appaerance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {isLoading ? "Loading.." : 'Login'}
                </button>
            </form>
        </div>
    )
}
  