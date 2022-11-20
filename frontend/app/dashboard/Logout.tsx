'use client'

import useAuthStore from "../../store/authStore"
import { useRouter } from "next/navigation"

// import useSWR from "swr"

const Logout = () => {
    const { token, addToken } = useAuthStore()
    const router = useRouter()

    const handleLogout = async () => {
        await fetch('http://localhost:5001/api/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            },
        }).then(res => {
            router.push('/')
            addToken('')
        }).catch(error => {
            console.log('logout error', error)
        })
    }

    return (
        <div>
            <button
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    )
}

export default Logout