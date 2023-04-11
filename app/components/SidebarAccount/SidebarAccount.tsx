import React, { ReactElement } from "react";
import Link from "next/link";
import {
  BookOpenIcon,
  DocumentPlusIcon,
  IdentificationIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

interface IMenuElement {
  category: string
  items: Array<IMenuElementItem>
}

interface IMenuElementItem {
  iconMenu: ReactElement
  nameLinkMenu: string
}

const SidebarAccount = () => {
  const menuElements: Array<IMenuElement> = [
    {category : "Animal", items : [
      { iconMenu: <BookOpenIcon />, nameLinkMenu: "Carnet de santé" },
      { iconMenu: <DocumentPlusIcon />, nameLinkMenu: "Ajouter un animal" },
    ]},
    {category : "Paramètres", items : [
      { iconMenu: <IdentificationIcon />, nameLinkMenu: "Informations personnelles" },
      { iconMenu: <Cog6ToothIcon />, nameLinkMenu: "Paramètres du compte" },
      { iconMenu: <ArrowRightOnRectangleIcon />, nameLinkMenu: "Déconnexion" },
    ]}
  ]

  return (
    <div className="flex text-gray-800 mr-5">
      <div className="flex flex-col top-0 left-0 w-64 bg-gray-50 border-r">
        <div className="flex items-center justify-center h-14 border-b">
          <div>Mon compte</div>
        </div>
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            {menuElements.map((menu, index) => (
              <div key={index}>
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">{menu.category}</div>
                  </div>
                </li>
                {menu?.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <li>
                      <Link
                        href="#"
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600
                          hover:text-gray-800 border-l-4 border-transparent hover:border-main-color pr-6"
                      >
                        <span className="w-5 inline-flex justify-center items-center ml-4">{item.iconMenu}</span>
                        <span className="ml-2 text-sm tracking-wide truncate">{item.nameLinkMenu}</span>
                      </Link>
                    </li>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarAccount;