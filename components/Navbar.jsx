"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/ModeToggle";
import {
    CalendarHeart,
    Bell,
    UserCircle2,
    Menu,
    X,
    LogIn,
    UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NavLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Contacts", href: "/contacts" },
    { name: "Reminders", href: "/reminders" },
    { name: "About", href: "/about" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with actual auth state

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 z-50 w-full transition-all duration-300 border-b",
                isScrolled
                    ? "bg-background/80 backdrop-blur-md shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <CalendarHeart className="w-8 h-8 text-primary" />
                    <span className="hidden text-xl font-bold md:inline-block">
                        CelebrateMate
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex md:items-center md:space-x-6">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === link.href
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Right Actions */}
                <div className="hidden md:flex md:items-center md:space-x-4">
                    <ModeToggle />
                    {isLoggedIn ? (
                        <>
                            <Button size="icon" variant="ghost">
                                <Bell className="w-5 h-5" />
                            </Button>
                            <Avatar className="h-8 w-8 cursor-pointer">
                                <AvatarImage src="/avatars/user.png" alt="User" />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" asChild>
                                <Link href="/login">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/register">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Sign Up
                                </Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="flex items-center md:hidden">
                    <ModeToggle />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size="icon" variant="ghost">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between pb-4 border-b">
                                    <Link
                                        href="/"
                                        className="flex items-center space-x-2"
                                        onClick={() => setOpen(false)}
                                    >
                                        <CalendarHeart className="w-6 h-6 text-primary" />
                                        <span className="font-bold">CelebrateMate</span>
                                    </Link>
                                    <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                        <X className="h-5 w-5" />
                                        <span className="sr-only">Close</span>
                                    </SheetClose>
                                </div>

                                <div className="flex flex-col space-y-6 py-6">
                                    {NavLinks.map((link) => (
                                        <SheetClose asChild key={link.name}>
                                            <Link
                                                href={link.href}
                                                className={cn(
                                                    "text-sm font-medium transition-colors hover:text-primary flex items-center",
                                                    pathname === link.href
                                                        ? "text-primary"
                                                        : "text-muted-foreground"
                                                )}
                                            >
                                                {link.name}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>

                                <div className="mt-auto border-t pt-4">
                                    {isLoggedIn ? (
                                        <div className="flex items-center space-x-3 mb-6">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/avatars/user.png" alt="User" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm font-medium">My Account</div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col space-y-3">
                                            <SheetClose asChild>
                                                <Button asChild variant="secondary" className="w-full">
                                                    <Link href="/login">Sign In</Link>
                                                </Button>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Button asChild className="w-full">
                                                    <Link href="/register">Create Account</Link>
                                                </Button>
                                            </SheetClose>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </nav>
    );
}