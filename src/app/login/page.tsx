"use client";
import {lazy} from "react"
import { useAuthDispatch } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { onLoginFormChange, onLogin } = useAuthDispatch();
  const router = useRouter();
  return (
    <div>
      <div className="login">
        <input
          name="email"
          placeholder="email"
          onChange={onLoginFormChange}
        ></input>
        <input
          name="password"
          placeholder="password"
          onChange={onLoginFormChange}
        ></input>
        <button
          onClick={() => {
            onLogin().then(() => {
              router.push("/dashboard");
            });
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}
