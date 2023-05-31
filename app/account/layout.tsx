import React from "react";
import SidebarAccount from "@/app/components/ReusableComponents/SidebarAccount";
import UserProvider from "@/app/components/Private/UserProvider";

const SidebarAccountLayout = ({ children }: any) => {
  return (
    <main className="flex flex-1">
      <UserProvider>
        <SidebarAccount />
        {children}
      </UserProvider>
    </main>
  )
}

export default SidebarAccountLayout;