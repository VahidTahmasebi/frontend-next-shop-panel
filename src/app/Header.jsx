"use client";

import Link from "next/link";

import { useGetUser } from "@/hooks/useAuth";

function Header() {
  const { data, error, isLoading } = useGetUser();
  const { user, cart } = data || {};

  return (
    <header
      className={`sticky top-0 mb-10 bg-white shadow-md transition-all duration-200 ${
        isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-0"
      }`}>
      <nav>
        <ul className="xl:max-w-screen-xl container flex items-center justify-between py-2">
          <li>
            <Link className="block py-2" href="/">
              خانه
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/products">
              محصولات
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/profile">
              پنل کاربر
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/admin">
              پنل ادمین
            </Link>
          </li>
          <li>
            <Link className="block py-2" href="/cart">
              سبد خرید - ({cart ? cart?.payDetail?.productIds.length : 0})
            </Link>
          </li>
          {user ? (
            <span>{user?.name}</span>
          ) : (
            <li>
              <Link className="block py-2" href="/auth">
                ورود
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
