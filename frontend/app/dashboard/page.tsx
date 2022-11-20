import { cookies } from 'next/headers';
import Logout from './Logout';

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

const Dashboard = async () => {
    const users = await FecthUser()

    console.log(users)

    return (
        <div>
            This is Dsahboard Server
            <div>
                {users.data.map((user: any) => {
                    return (
                        <div key={user.id}>
                            <p>{user.name}</p> 
                            <p>
                                {user.email}
                            </p>
                        </div>
                    )
                })}
            </div>

            <Logout />
        </div>
    )
}

export default Dashboard