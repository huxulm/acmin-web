"use client";
import { useAuthState } from "@/contexts/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { MenusContext } from "@/contexts/MenusContext";

export default function HomeContent() {
  const { isLogin } = useAuthState();
  const { menus } = useContext(MenusContext);
  return (
    <div className="home">
      {isLogin && <div>Yeah!Now you are logged in</div>}
      {!isLogin && (
        <div>
          {`Haven't login, Go to`} <Link href="/login">Login</Link>
        </div>
      )}
      {menus && <pre>{JSON.stringify(menus, null, 2)}</pre>}
    </div>
  );
}
