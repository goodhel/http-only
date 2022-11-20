import { cookies } from 'next/headers';

type PageProps = {
    params: {
        userId: string
    }
}

const FetchUser = async (userId: string) => {
    const nextCookies = cookies();
    const token = nextCookies.get('token');

    const res = await fetch(`http://localhost:5001/api/users/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
        },
    }).then(res => res.json())

    return res
}

const DetailUser = async ({ params: { userId }}: PageProps) => {
    const user = await FetchUser(userId)

    return (
        <div className='p-5 bg-yellow-400 m-2 rounded-md shadow-lg'>
            <p>Id: {user.data.id}</p>
            <p>Name: {user.data.name}</p>
            <p>Email: {user.data.email}</p>
        </div>
    )
}

export default DetailUser