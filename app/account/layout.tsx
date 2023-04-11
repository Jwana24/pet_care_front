import React from "react";
import SidebarAccount from "@/app/components/SidebarAccount/SidebarAccount";

const SidebarAccountLayout = ({ children }: any) => {
  return (
    <main className="flex flex-1">
      <SidebarAccount />
      {children}
    </main>
  )
}

export default SidebarAccountLayout;