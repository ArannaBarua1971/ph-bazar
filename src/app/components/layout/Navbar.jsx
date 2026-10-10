"use client";
import { useCategories } from "@/functions/navbarapi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "../common/Loading";
import Button from "../common/Button";
import { date } from "@/functions/helper";
function Navbar() {
  const { data: navItems, loading: isloading } = useCategories();
  const pathname = usePathname();

  return (
    <div >
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
            <p className="text-[10px] text-secondary-text-color">
              {date()}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-sm font-semibold text-gray-700 hover:text-primary-color"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
          >
            <Button>সাইন আপ</Button>
          </Link>
        </div>
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
