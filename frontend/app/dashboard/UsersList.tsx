import { cookies } from 'next/headers';
import Link from 'next/link';

const FecthUser = async () => {
    const nextCookies = cookies();
    const token = nextCookies.get('token');

    const res = await fetch('http://localhost:5001/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(res => res.json())

    return res
}


const UsersList = async () => {
    const users = await FecthUser()

    return (
        <div className='p-2 bg-blue-200 border-2 m-2 shadow-lg'>
            {users.data.map((user: any) => {
                return (
                    <p key={user.id}>
                        <Link href={`/dashboard/${user.id}`}>User {user.name}</Link>
                    </p>
                )
            })}
        </div>
    )

}

export default UsersList