"use client";

import { useCategories } from "@/functions/navbarapi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loading from "../common/Loading";
import Button from "../common/Button";
import { date } from "@/functions/helper";
import { useSession, signOut } from "@/lib/auth-client";
import CardLayout from "../card_design/CardLayout";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  const { data: navItems, loading: isloading } = useCategories();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [showProfileNav, setShowProfileNav] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);

  const closeMobileNav = () => setShowMobileNav(false);

  const authStatus = (
    <>
      {isPending || !session?.user ? (
        <div className="flex shrink-0 items-center gap-2 sm:gap-5">
          <Link
            href="/sign-in"
            onClick={closeMobileNav}
            className="text-xs font-semibold text-gray-700 hover:text-primary-color sm:text-sm"
          >
            সাইন ইন
          </Link>
          <Link href="/sign-up" onClick={closeMobileNav}>
            <Button>সাইন আপ</Button>
          </Link>
        </div>
      ) : (
        <div className="relative shrink-0">
          <button
            type="button"
            aria-label="প্রোফাইল মেনু"
            aria-expanded={showProfileNav}
            className="flex cursor-pointer items-center gap-2"
            onClick={() => setShowProfileNav(!showProfileNav)}
          >
            {session?.user.image ? (
              <img
                className="h-8 w-8 rounded-[10px] object-cover"
                src={session?.user.image}
                alt="Profile"
              />
            ) : (
              <p className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-primary-color text-white">
                {session?.user.name?.[0]}
              </p>
            )}
            <span className="flex max-w-[110px] items-center gap-1 truncate text-xs font-medium sm:text-sm">
              {session?.user.name}
              <i className="fa-solid fa-caret-down text-secondary-text-color" />
            </span>
          </button>

          {showProfileNav && (
            <div className="absolute right-0 z-55 mt-3 w-[min(280px,calc(100vw-2rem))]">
              <CardLayout>
                <div className="break-words">
                  <p className="text-sm font-semibold">{session?.user.name}</p>
                  <p className="text-xs">{session?.user.email}</p>
                </div>
                <div className="mt-4 flex flex-col gap-3 text-sm">
                  <Link
                    href="/profile"
                    className="py-2"
                    onClick={() => setShowProfileNav(false)}
                  >
                    <i className="fa-solid fa-user mr-2 text-blue-400" />
                    আমার প্রোফাইল
                  </Link>
                  <button
                    type="button"
                    onClick={async () =>
                      await signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            setShowProfileNav(false);
                            setShowMobileNav(false);
                            router.push("/sign-in");
                          },
                        },
                      })
                    }
                    className="cursor-pointer py-1 text-left text-seondary-color"
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket mr-2" />
                    সাইন আউট
                  </button>
                </div>
              </CardLayout>
            </div>
          )}
        </div>
      )}
    </>
  );

  return (
    <header className="relative w-full">
      <div className="mx-auto flex min-h-14 items-center justify-between gap-3 py-2">
        <Link
          href="/"
          onClick={closeMobileNav}
          className="flex min-w-0 items-center gap-2"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-color">
            <img
              className="h-full w-full object-contain"
              src="/logo-icon.png"
              alt="বাজার দর"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <h1 className="text-lg font-bold text-primary-text-color sm:text-xl">
              বাজার দর
            </h1>
            <p className="text-[9px] text-secondary-text-color sm:text-[10px]">
              {date()}
            </p>
          </div>
        </Link>

        <div className="hidden items-center md:flex">{authStatus}</div>

        <div className="flex shrink-0 items-center gap-3 md:hidden">
          {authStatus}
          <button
            type="button"
            aria-label={showMobileNav ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={showMobileNav}
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 text-lg text-primary-text-color transition hover:bg-gray-50"
          >
            <i
              className={`fa-solid ${showMobileNav ? "fa-xmark" : "fa-bars"}`}
            />
          </button>
        </div>
      </div>

      <nav className="hidden border-b border-gray-100 md:block">
        <ul className="mx-auto flex h-10 items-center gap-4 overflow-x-auto whitespace-nowrap sm:gap-6">
          {navItems?.map((item) => (
            <li key={item.id} className="shrink-0">
              <Link
                href={`/category/${item.slug}`}
                className={`flex items-center gap-1.5 text-xs font-semibold transition hover:text-green-600 ${
                  pathname === `/category/${item.slug}`
                    ? "text-primary-color"
                    : "text-primary-text-color"
                }`}
              >
                <span className="text-[10px]">{item.icon}</span>
                {item.nameBn}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {showMobileNav && (
        <div className="absolute left-0 right-0 top-full z-40 border-b border-gray-100 bg-white shadow-lg md:hidden">
          <nav className="max-h-[70vh] overflow-y-auto p-3">
            <p className="mb-2 px-3 text-xs font-semibold text-secondary-text-color">
              ক্যাটাগরি
            </p>
            <ul className="grid grid-cols-2 gap-2">
              {navItems?.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/category/${item.slug}`}
                    onClick={closeMobileNav}
                    className={`flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
                      pathname === `/category/${item.slug}`
                        ? "bg-primary-color/10 text-primary-color"
                        : "text-primary-text-color hover:bg-gray-50"
                    }`}
                  >
                    <span className="shrink-0 text-base">{item.icon}</span>
                    <span className="line-clamp-1">{item.nameBn}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
