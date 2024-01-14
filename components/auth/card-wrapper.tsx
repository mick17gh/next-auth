"use client"

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import BackButton from "./back-button";
import Header from "./header";
import Social from "./social";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonRef:string;
    showSocial?:boolean;
}

export const CardWrapper =({
    children,
    headerLabel,
    backButtonLabel,
    backButtonRef,
    showSocial
}: CardWrapperProps)=>{
    return(
        <Card className="w-[400px] shadow-md flex flex-col">
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    <Social/>
                </CardFooter>
                
            )}
            <CardFooter>
                <BackButton
                    href={backButtonRef}
                    label={backButtonLabel}
                />
            </CardFooter>
        </Card>
    )
}