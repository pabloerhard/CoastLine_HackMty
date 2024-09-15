import { getAuthenticatedAppForUser as getUser } from "@/lib/firebase/server";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-screen h-screen">{children}</div>;
}
