"use client";

import { useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    Gift,
    Bell,
    Search,
    Plus,
    Calendar,
    User,
    Clock,
    ChevronRight,
    PieChart,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { upcomingEvents, recentContacts, stats  } from "../../data/dashboardData";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("upcoming");

    return (
        <div className="flex-1 space-y-6 p-6 md:p-8">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's what's happening with your CelebrateMate account.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalContacts}</div>
                        <p className="text-xs text-muted-foreground">
                            +2 added this month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
                        <p className="text-xs text-muted-foreground">
                            Next 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Sent Reminders</CardTitle>
                        <Bell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.sentReminders}</div>
                        <p className="text-xs text-muted-foreground">
                            This month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completionRate}%</div>
                        <Progress value={stats.completionRate} className="h-2 mt-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-6">
                <Card className="md:col-span-4">
                    <CardHeader className="flex flex-row items-center">
                        <div className="flex-1">
                            <CardTitle>Upcoming Events</CardTitle>
                            <CardDescription>
                                Birthdays and anniversaries in the next 30 days
                            </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/reminders">
                                    View All
                                </Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link href="/reminders/new">
                                    <Plus className="h-4 w-4 mr-1" />
                                    Add Event
                                </Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-3 mb-4">
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="birthdays">Birthdays</TabsTrigger>
                                <TabsTrigger value="anniversaries">Anniversaries</TabsTrigger>
                            </TabsList>
                            <TabsContent value="upcoming" className="space-y-0">
                                {upcomingEvents.map((event) => (
                                    <div key={event.id} className="flex items-center justify-between py-4 border-b last:border-0">
                                        <div className="flex items-center space-x-4">
                                            <Avatar>
                                                <AvatarImage src={event.avatar} alt={event.name} />
                                                <AvatarFallback>{event.initial}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium">{event.name}</div>
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <Badge variant={event.type === "Birthday" ? "secondary" : "outline"} className="mr-2">
                                                        {event.type}
                                                    </Badge>
                                                    {event.date}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm font-medium">
                                                {event.daysLeft === 0
                                                    ? "Today"
                                                    : event.daysLeft === 1
                                                        ? "Tomorrow"
                                                        : `${event.daysLeft} days`}
                                            </span>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>View Details</DropdownMenuItem>
                                                    <DropdownMenuItem>Send Reminder Now</DropdownMenuItem>
                                                    <DropdownMenuItem>Gift Suggestions</DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="birthdays" className="space-y-4">
                                {upcomingEvents
                                    .filter((e) => e.type === "Birthday")
                                    .map((event) => (
                                        <div key={event.id} className="flex items-center justify-between py-4 border-b last:border-0">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={event.avatar} alt={event.name} />
                                                    <AvatarFallback>{event.initial}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{event.name}</div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Badge variant="secondary" className="mr-2">
                                                            {event.type}
                                                        </Badge>
                                                        {event.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium">{event.daysLeft} days left</div>
                                        </div>
                                    ))}
                            </TabsContent>
                            <TabsContent value="anniversaries" className="space-y-4">
                                {upcomingEvents
                                    .filter((e) => e.type === "Anniversary")
                                    .map((event) => (
                                        <div key={event.id} className="flex items-center justify-between py-4 border-b last:border-0">
                                            <div className="flex items-center space-x-4">
                                                <Avatar>
                                                    <AvatarImage src={event.avatar} alt={event.name} />
                                                    <AvatarFallback>{event.initial}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium">{event.name}</div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <Badge variant="outline" className="mr-2">
                                                            {event.type}
                                                        </Badge>
                                                        {event.date}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm font-medium">{event.daysLeft} days left</div>
                                        </div>
                                    ))}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                    <CardFooter className="border-t pt-4 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between w-full">
                            <span>Showing {upcomingEvents.length} of {upcomingEvents.length} events</span>
                            <Link href="/reminders" className="flex items-center text-primary hover:underline">
                                View all events
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </CardFooter>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Recent Contacts</CardTitle>
                        <CardDescription>
                            Your recently added contacts
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-0">
                        <div className="mb-4">
                            <Input
                                placeholder="Search contacts..."
                                className="w-full"
                                icon={<Search className="h-4 w-4" />}
                            />
                        </div>
                        {recentContacts.map((contact) => (
                            <div key={contact.id} className="flex items-center space-x-4 py-3 border-b last:border-0">
                                <Avatar>
                                    <AvatarImage src={contact.avatar} alt={contact.name} />
                                    <AvatarFallback>{contact.initial}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{contact.name}</p>
                                    <p className="text-sm text-muted-foreground truncate">
                                        {contact.email}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <Link
                            href="/contacts"
                            className="flex items-center justify-center w-full text-sm text-primary hover:underline"
                        >
                            View all contacts
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </CardFooter>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <div>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>Common tasks you might want to perform</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 pt-4">
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" asChild>
                            <Link href="/contacts/new">
                                <User className="h-6 w-6 mb-1" />
                                <span>Add Contact</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" asChild>
                            <Link href="/reminders/new">
                                <Calendar className="h-6 w-6 mb-1" />
                                <span>Add Event</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" asChild>
                            <Link href="/settings/notifications">
                                <Bell className="h-6 w-6 mb-1" />
                                <span>Manage Reminders</span>
                            </Link>
                        </Button>
                        <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-4 space-y-2" asChild>
                            <Link href="/gifts">
                                <Gift className="h-6 w-6 mb-1" />
                                <span>Gift Ideas</span>
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Upcoming Reminder Schedule</CardTitle>
                        <CardDescription>
                            Next reminders to be sent
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingEvents.slice(0, 3).map((event, i) => (
                            <div key={i} className="flex items-center space-x-4">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <Clock className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="font-medium leading-none">
                                        {event.name}'s {event.type}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {event.daysLeft < 3
                                            ? `Reminder scheduled for today`
                                            : `Reminder scheduled for ${new Date(
                                                new Date().setDate(new Date().getDate() + event.daysLeft - 3)
                                            ).toLocaleDateString()}`}
                                    </p>
                                </div>
                                <Button variant="ghost" size="sm">
                                    Edit
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                        <Link
                            href="/settings/notifications"
                            className="flex items-center justify-center w-full text-sm text-primary hover:underline"
                        >
                            Manage reminder settings
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}