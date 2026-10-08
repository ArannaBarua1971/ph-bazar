"use client";
import { useCategories } from "@/functions/navbarapi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Loading from "../common/Loading";

function Navbar() {
  const { data: navItems, loading: isloading } =useCategories();
  const pathname=usePathname();
  
  return (
    <div>
      <div className="mx-auto flex h-14 items-center justify-between px-4">
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
              বুধবার, ৮ অক্টোবর, ২০২৬
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-5">
          <Link
            href="/login"
            className="text-xs font-medium text-gray-700 hover:text-green-600"
          >
            লগইন
          </Link>

          <Link
            href="/subscribe"
            className="rounded-md bg-green-600 px-4 py-2 text-[11px] font-medium text-white hover:bg-green-700"
          >
            সাবস্ক্রাইব
          </Link>
        </div>
      </div>
      {isloading ? (
        <Loading/>
      ) : (
        <nav className="border-b border-gray-100">
          <div className="mx-auto px-4">
            <ul className="flex h-9 items-center gap-6 overflow-x-auto">
              {navItems.map((item) => (
                <li key={item.id} className="shrink-0">
                  <Link
                    href={`/category/${item.slug}`}
                    className={`${pathname==`/category/${item.slug}`?"text-primary-color":""} flex items-center gap-1.5 text-[12px] font-semibold  transition hover:text-green-600`}
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
