'use client'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Page() {
    const { data, error } = useSWR('http://localhost:5001/api/users', fetcher)

    console.log(data, error)
    return (
        <div>
            <h1 className="text-blue-500">Users</h1>
        </div>
    )
}