/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";

import Link from "next/link";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigate-menu";
import Image from "next/image";
interface Component {
  title: string;
  path: string;
  description?: string;
}

interface NavbarLinkProps {
  Home?: Component[];  
  name: string;
  link: string;
  path: string;
}
const NavbarLink = ({ Home, name, link, path }:NavbarLinkProps) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Link href={link}>
              <span
                className={`text-gray-700 font-bold text-[20px] ${
                  path === "/" && link === "/"
                    ? "text-green-700 text-[20px]"
                    : path === "/shop" && link === "/shop"
                    ? "text-green-700 text-[20px]"
                    : path === "/shop" && link === "/"
                    ? "text-gray-500 text-[20px]"
                    : ""
                }`}
              >
                {name}
              </span>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="left-0 grid w-[200px] p-2 md:w-[200px] md:grid-cols-1 lg:w-[200px] text-[20px]">
              {Home?.map((component:any) => (
                <li key={component.title}>
                  <NavigationMenuLink asChild>
                    <a
                      href={component.path}
                      className={`block rounded-md p-2 hover:bg-green-100`}
                    >
                      <div className={`font-medium text-[14px]`}>{component.title}</div>
                      <p className="text-sm text-muted-foreground">
                        {component.description}
                      </p>
               
                    </a>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavbarLink;
