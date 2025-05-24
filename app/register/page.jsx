"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarHeart } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Icons } from "@/components/Icons";

// Form validation schema using Zod
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: "You must accept the terms and conditions.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export default function Register() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize form
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
        },
    });

    // Handle form submission
    async function onSubmit(values) {
        setIsLoading(true);

        try {
            console.log(values);
            // Here you would typically:
            // 1. Send the form data to your API
            // 2. Create the user account
            // 3. Log the user in
            // 4. Redirect to dashboard

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Redirect to dashboard after successful signup
            router.push("/dashboard");
        } catch (error) {
            console.error("Signup failed:", error);
            // Handle errors (show error message, etc.)
        } finally {
            setIsLoading(false);
        }
    }

    // Handle social sign-in
    const handleSocialSignIn = (provider) => {
        setIsLoading(true);

        try {
            console.log(`Signing in with ${provider}`);
            // Implement social authentication logic
        } catch (error) {
            console.error(`${provider} sign-in failed:`, error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center pt-10 pb-20">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
                <div className="flex flex-col space-y-2 text-center">
                    <div className="flex justify-center mb-2">
                        <CalendarHeart className="h-10 w-10 text-primary" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your information below to create your account
                    </p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="John Doe" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="john.doe@example.com" type="email" {...field} disabled={isLoading} />
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
                                                <Input placeholder="********" type="password" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="********" type="password" {...field} disabled={isLoading} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="acceptTerms"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled={isLoading}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>
                                                    I agree to the{" "}
                                                    <Link href="/terms" className="text-primary hover:underline">
                                                        Terms of Service
                                                    </Link>{" "}
                                                    and{" "}
                                                    <Link href="/privacy" className="text-primary hover:underline">
                                                        Privacy Policy
                                                    </Link>
                                                </FormLabel>
                                                <FormMessage />
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="w-full" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </Button>
                            </form>
                        </Form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="w-full" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => handleSocialSignIn('google')}
                                disabled={isLoading}
                            >
                                <Icons.google className="mr-2 h-4 w-4" /> Google
                            </Button>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => handleSocialSignIn('github')}
                                disabled={isLoading}
                            >
                                <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="px-6 py-4 border-t flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link href="/login" className="text-primary font-medium hover:underline">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>

                <div className="text-center text-xs text-muted-foreground">
                    By signing up, you agree to our{" "}
                    <Link href="/terms" className="hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="hover:underline">
                        Privacy Policy
                    </Link>
                </div>
            </div>
        </div>
    );
}