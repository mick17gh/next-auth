"use client";

import { CardWrapper } from "./card-wrapper";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";


const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already exist with another provider" : "";
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [uriError, setUriError] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>("");
  

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    if(urlError){
      setUriError(true)
    }
    setError("");
    setSuccess("");
    startTransition(()=>{
      login(values, callbackUrl)
      .then((data)=>{
        if(data?.error){
          form.reset();
          setError(data?.error);
        }

        if(data?.success){
          form.reset();
          setSuccess(data?.success);
        }

        if(data?.twoFactor){
          setShowTwoFactor(true);
        }

      }).catch(()=> setError("something went wrong")) 
    })
  }

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Dont have an account? Register"
      backButtonRef="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      placeholder="123456"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            )}
            { !showTwoFactor && (
              <>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      {...field}
                      type="email"
                      placeholder="someone@123.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input disabled={isPending} {...field} type="password" placeholder="*******" />
                  </FormControl>
                  <Button size="sm" variant="link" asChild className="px-0 font-normal flex justify-end">
                    <Link href="/auth/reset">Forgot password? </Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            </>
            )}
          </div>
          <FormError message={error || uriError ? "" : urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} className="w-full" type="submit">
            {showTwoFactor ? "Confirm":"Login"}
            
            </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
