import UsersList from "./UsersList";
import { Suspense } from "react";
import Logout from "./Logout";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
        <div>
            {/* @ts-ignore */}
            <Suspense fallback={<p>Loading users..</p>}>
                {/* @ts-ignore */}
                <UsersList />
            </Suspense>
        </div>
        <div className="flex-1">

            <Logout />
            {children}
        </div>
    </div>
  );
}