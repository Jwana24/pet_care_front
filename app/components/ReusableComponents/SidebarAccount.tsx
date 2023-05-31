import React, { ReactElement } from 'react';
import Link from 'next/link';
import {
  BookOpenIcon,
  DocumentPlusIcon,
  IdentificationIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface IMenuElement {
  category: string
  items: Array<IMenuElementItem>
}

interface IMenuElementItem {
  iconMenu: ReactElement
  nameLinkMenu: string
  href: string
}

const SidebarAccount = () => {
  const menuElements: Array<IMenuElement> = [
    {category : 'Animal', items : [
      { iconMenu: <BookOpenIcon width={20} />,     nameLinkMenu: 'Carnet de santé',   href: '/account/health-book' },
      { iconMenu: <DocumentPlusIcon width={20} />, nameLinkMenu: 'Ajouter un animal', href: '/account/add-animal' },
    ]},
    {category : 'Paramètres', items : [
      {
        iconMenu: <IdentificationIcon width={20} />,
        nameLinkMenu: 'Informations personnelles',
        href: '/account/personnal-informations'
      },
      {
        iconMenu: <Cog6ToothIcon width={20} />,
        nameLinkMenu: 'Paramètres du compte',
        href: '/account/account-parameters'
      },
      // {
      //   iconMenu: <ArrowRightOnRectangleIcon />,
      //   nameLinkMenu: 'Déconnexion',
      //   href: '/logout'
      // },
    ]}
  ]

  return (
    <div className="flex text-gray-800">
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
                        href={item.href}
                        className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600
                          hover:text-gray-800 border-l-4 border-transparent hover:border-main-color pr-6"
                      >
                        <span className="inline-flex justify-center items-center ml-4">{item.iconMenu}</span>
                        <span className="ml-2 text-sm tracking-wide truncate">{item.nameLinkMenu}</span>
                      </Link>
                    </li>
                  </div>
                ))}
              </div>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-center h-14 border-t hover:text-red-600">
          <Link href='/logout' className="flex items-center">
            <ArrowRightOnRectangleIcon width={20} className="inline-flex justify-center items-center mr-2" />
            Déconnexion
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SidebarAccount;