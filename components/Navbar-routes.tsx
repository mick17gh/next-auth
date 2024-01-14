"use client"
import { UserButton } from "@/components/auth/user-button";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import SearchInput from "./search-input";
import { useCurrentUser } from "@/hooks/use-current-user";

const NavbarRoutes = () => {
   const pathname = usePathname();
   const router = useRouter();
   const user = useCurrentUser();
   const isSearchPage = pathname === "/search";



    return ( 
        <>
        {
            isSearchPage && (
                <div className="hidden md:block">
                    <SearchInput />
                </div>
            )
        }
        <div className="flex gap-x-2 ml-auto items-center">
            <div>
                <p className="font-medium text-sky-700 text-sm">
                    {user?.name}
                </p>
                 
            </div>

            <UserButton/>
        </div>

        </>
     );
}
 
export default NavbarRoutes;