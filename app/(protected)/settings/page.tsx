"use client"
import * as z from "zod";
import {useForm} from "react-hook-form";
import { settings } from "@/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2, Settings2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
import { SettingsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { 
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { UserRole } from "@prisma/client";
import { Switch } from "@/components/ui/switch";
import { Loader } from "@/components/loader";

const SettingsPage = () => {
    const user = useCurrentUser();
    const {update} = useSession();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues:{
            password:undefined,
            newPassword:undefined,
            name:user?.name || undefined,
            email:user?.email || undefined,
            role:user?.role || undefined,
            isTwoFactorEnabled:user?.isTwoFactorEnabled || undefined,


        }

    }); 
   
   
    const onSubmit = (values: z.infer<typeof SettingsSchema>) =>{
        startTransition(()=>{
            settings(values).then((data)=>{
                if(data.error){
                    setSuccess("");
                    setError(data.error);
                }

                if(data.success){
                    update();
                    setError("");
                    setSuccess(data.success);
                    
                }
                
            })
            .catch(()=>setError("something went wrong!"));
        })
        
    }
   
    return ( 
        <div className="p-6 bg-slate-100 ">

        
        <Card className="w-[600px]">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <Settings2Icon />
                    <p className="text-xl font-medium text-slate-600">
                    Settings
                    </p>
                </div>
                
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form className="space-y-6"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                        <FormField 
                            control={form.control}
                            name="name"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="John doe"
                                            disabled={isPending}
                                            type="text"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    {user?.isOAuth === false && (
                        <>
                            <FormField 
                                control={form.control}
                                name="email"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="someone@123.com"
                                                disabled={isPending}
                                                type="email"
                                            />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="password"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                disabled={isPending}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            <FormField 
                                control={form.control}
                                name="newPassword"
                                render={({field})=>(
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="******"
                                                disabled={isPending}
                                                type="password"
                                            />
                                        </FormControl>
                                        <FormMessage />

                                    </FormItem>
                                )}
                            />
                        </>
                        )}

                        <FormField 
                            control={form.control}
                            name="role"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        disabled={isPending}
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={UserRole.ADMIN}>
                                                Admin
                                            </SelectItem>

                                            <SelectItem value={UserRole.USER}>
                                                User
                                            </SelectItem>
                                        </SelectContent>

                                    </Select>
                                    <FormMessage />

                                </FormItem>
                            )}
                        />
                         {user?.isOAuth === false && (
                        <FormField 
                            control={form.control}
                            name="isTwoFactorEnabled"
                            render={({field})=>(
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Two Factor Authentication</FormLabel>
                                        <FormDescription>
                                            Enable two factor authentication for your account
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch 
                                            disabled={isPending}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                         )}
                    </div>
                    <FormError message={error} />
                    <FormSuccess message={success} />

                    <Button type="submit" className="w-[150px]" disabled={isPending}>
                    {isPending ? <Loader /> : "Save Changes"}
                        
                    </Button>

                    </form>
                </Form>
            </CardContent>
        </Card>
        </div>
     );
}
 
export default SettingsPage;