import Link from "next/link";
import { Home } from "../components/Home";

export default function Page() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <Home />
            <Link href="/todos">Todos</Link>
        </div>
    )
}
  