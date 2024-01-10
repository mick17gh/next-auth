"use client"
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import FormError  from "@/components/form-error";
import FormSuccess from "@/components/form-success";

import { HashLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import { newVerification } from "@/actions/new-verification";


const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(()=>{
        if(success || error) return;
        if(!token){
            setError("Missing Token");
            return;
        }
        newVerification(token)
        .then((data)=>{
            setSuccess(data.success);
            setError(data.error);
        })
    }, [token, success, error]);

    useEffect(()=>{
        onSubmit();
    },[onSubmit]);


    return ( 
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonRef="/auth/login"
        backButtonLabel="Back to login"
      >
        <div className="w-full flex justify-center items-center">
            {!success && !error && (
                  <HashLoader />
            )}
          
            <FormSuccess message={success} />

            {!success &&(
                <FormError message={error} /> 
            )}
           

        </div>
      </CardWrapper>
     );
}
 
export default NewVerificationForm;