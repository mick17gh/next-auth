"use client"

import { BarChart, Compass, Layout, List, Settings2Icon } from "lucide-react";
import SidebarItem from "./Sidebar-item";
import { usePathname } from "next/navigation";


const SidebarRoutes = () => {

    const guestRoutes = [
        {
        icon: Layout,
        label:"Dashboard",
        href:"/dashboard",
    },

    {
        icon: Settings2Icon,
        label:"Settings",
        href:"/settings",
    }

];

const teacherRoutes = [
    {
    icon: List,
    label:"Courses",
    href:"/teacher/courses",
},

{
    icon: BarChart,
    label:"Analytics",
    href:"/teacher/analytics",
}

];

    const pathname = usePathname();

    const isTeacherPage = pathname?.includes("/teacher");

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;
    return ( 
        

        <div className="flex flex-col w-full">
            {
                routes.map((route)=>(
                    <SidebarItem 
                        key={route.href}
                        icon = {route.icon}
                        label = {route.label}
                        href={route.href}
                    />
                ))
            }
        </div>
     );
}
 
export default SidebarRoutes;