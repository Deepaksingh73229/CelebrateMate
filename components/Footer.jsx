import Link from "next/link";
import { CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedinIcon,
} from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/40">
            <div className="container px-4 py-12 mx-auto md:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {/* Logo and About */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <CalendarHeart className="w-6 h-6 text-primary" />
                            <span className="text-xl font-bold">CelebrateMate</span>
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            Never miss important dates with automated birthday and anniversary
                            reminders via SMS and email.
                        </p>
                        <div className="flex space-x-3">
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                <FacebookIcon className="h-4 w-4" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                <TwitterIcon className="h-4 w-4" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                <InstagramIcon className="h-4 w-4" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                                <LinkedinIcon className="h-4 w-4" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contacts"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contacts
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/reminders"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Reminders
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Resources</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/help"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">Newsletter</h3>
                        <p className="mb-4 text-sm text-muted-foreground">
                            Stay updated with our latest features and announcements.
                        </p>
                        <form className="space-y-2">
                            <div className="flex space-x-2">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    className="h-9"
                                    required
                                />
                                <Button type="submit" size="sm">
                                    Subscribe
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                We respect your privacy. Unsubscribe at any time.
                            </p>
                        </form>
                    </div>
                </div>

                <Separator className="my-8" />

                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-xs text-muted-foreground text-center md:text-left">
                        © {currentYear} CelebrateMate. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <Link
                            href="/privacy"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/terms"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Terms
                        </Link>
                        <Link
                            href="/cookies"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}