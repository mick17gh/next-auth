"use client"
import { FcGoogle } from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const Social = () => {

    const onclick = (provider: "google" | "github") =>{
        signIn(provider, {
            callbackUrl:DEFAULT_LOGIN_REDIRECT,
        });
    }

    return ( 
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=>onclick("google")}
            >
                <FcGoogle />
            </Button>
            <Button
                size="lg"
                className="w-full"
                variant="outline"
                onClick={()=>onclick("github")}
            >
                <FaGithub />
            </Button>
            
        </div>
     );
}
 
export default Social;