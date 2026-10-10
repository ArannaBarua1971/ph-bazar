"use client";
import { useCategories } from "@/functions/navbarapi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../common/Loading";
import Button from "../common/Button";
import { date } from "@/functions/helper";
import { useSession } from "@/lib/auth-client";
import CardLayout from "../card_design/CardLayout";
import { signOut } from "@/lib/auth-client";
import { useState } from "react";
function Navbar() {
  const router=useRouter()
  const { data: navItems, loading: isloading } = useCategories();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [showProfileNav, setShowProfileNav] = useState(false);
  if (isPending) {
    return <Loading />;
  }

  const authStatus = (
    <>
      {!session?.user ? (
        <div className="flex items-center gap-5">
          <Link
            href="/sign-in"
            className="text-sm font-semibold text-gray-700 hover:text-primary-color"
          >
            সাইন ইন
          </Link>

          <Link href="/sign-up">
            <Button>সাইন আপ</Button>
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button
            className="cursor-pointer flex gap-2 "
            onClick={() => setShowProfileNav(!showProfileNav)}
          >
            <div className="image">
              {session?.user?.image ? (
                <img className="w-8 h-8 rounded-[10px] object-cover" src={session?.user?.image}></img>
              ) : (
                <p className="bg-primary-color text-white w-8 h-8 rounded-[10px] flex justify-center items-center">
                  {session?.user?.name[0]}
                </p>
              )}
            </div>
            <div className="name text-sm font-medium flex justify-center items-center">
              {session?.user?.name}
              <i className="text-secondary-text-color fa-solid fa-caret-down"></i>
            </div>
          </button>
          <div
            className={`content absolute right-1 z-50 mt-3 ${showProfileNav ? "" : "hidden"}`}
          >
            <CardLayout>
              <div className="user_info">
                <p className="text-sm font-semibold">{session?.user?.name}</p>
                <p className="text-xs">{session?.user?.email}</p>
              </div>
              <div className="links text-sm  mt-4">
                <Link href={"/profile"} className="py-2 cursor-pointer" onClick={()=>setShowProfileNav(false)}>
                  <i className="fa-solid fa-user text-blue-400"></i> আমার
                  প্রোফাইল
                </Link>
                <button
                  onClick={async () =>
                    await signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          router.push("/sign-in"); // redirect to login page
                        },
                      },
                    })
                  }
                  className="text-seondary-color py-1 cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left-long"></i> সাইন আউট
                </button>
              </div>
            </CardLayout>
          </div>
        </div>
      )}
    </>
  );
  return (
    <div>
      <div className="mx-auto flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-color">
            <span className="text-sm">
              <img src="./logo-icon.png" alt="" />
            </span>
          </div>

          <div className="leading-tight">
            <h1 className="text-[20px] font-bold text-primary-text-color">
              বাজার দর
            </h1>
            <p className="text-[10px] text-secondary-text-color">{date()}</p>
          </div>
        </Link>

        {authStatus}
      </div>
      {isloading ? (
        <Loading />
      ) : (
        <nav className="border-b border-gray-100">
          <div className="mx-auto ">
            <ul className="flex h-9 items-center gap-6 overflow-x-auto">
              {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={`/category/${item.slug}`}
                    className={`${pathname == `/category/${item.slug}` ? "text-primary-color" : ""} flex items-center gap-1.5 text-[12px] font-semibold  transition hover:text-green-600`}
                  >
                    <span className="text-[9px]">{item.icon}</span>
                    {item.nameBn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

export default Navbar;
