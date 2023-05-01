"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";

const Authentication = () => {
  const [authentication, setAuthentication] = useState();
  const router = useRouter();

  async function fetchAuthentication() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (res.ok) {
      const json = await res.json();
      setAuthentication(json);
    } else {
      await router.push("/login");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  }

  return (
    <div>

    </div>
  )
}

export default Authentication;