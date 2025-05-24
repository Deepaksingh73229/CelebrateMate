"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    Calendar,
    Gift,
    Bell,
    MoreHorizontal,
    Filter,
    Check,
    X,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash2,
    CalendarDays,
    Cake,
    Heart,
    CalendarX
} from "lucide-react";
import { format, parseISO, isAfter, isBefore, addDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

import { mockReminders } from "../../data/reminderData";

export default function Reminders() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTab, setSelectedTab] = useState("upcoming");
    const [selectedReminder, setSelectedReminder] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [timeRange, setTimeRange] = useState("30days");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Get current date for comparison
    const currentDate = new Date();
    const thirtyDaysFromNow = addDays(currentDate, 30);
    const ninetyDaysFromNow = addDays(currentDate, 90);

    // Function to filter reminders based on tab and search query
    const getFilteredReminders = () => {
        let filtered = mockReminders;

        // Filter by tab
        if (selectedTab !== "all") {
            filtered = filtered.filter(reminder => {
                if (selectedTab === "upcoming") {
                    const date = parseISO(reminder.date);

                    // Filter by time range
                    if (timeRange === "30days") {
                        return isAfter(date, currentDate) && isBefore(date, thirtyDaysFromNow);
                    } else if (timeRange === "90days") {
                        return isAfter(date, currentDate) && isBefore(date, ninetyDaysFromNow);
                    } else {
                        return isAfter(date, currentDate);
                    }
                } else if (selectedTab === "birthdays") {
                    return reminder.eventType === "Birthday" && reminder.status === "upcoming";
                } else if (selectedTab === "anniversaries") {
                    return reminder.eventType === "Anniversary" && reminder.status === "upcoming";
                } else if (selectedTab === "completed") {
                    return reminder.status === "completed";
                }
                return true;
            });
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(reminder =>
                reminder.contactName.toLowerCase().includes(query) ||
                reminder.eventType.toLowerCase().includes(query)
            );
        }

        return filtered;
    };

    const filteredReminders = getFilteredReminders();

    // Pagination
    const totalPages = Math.ceil(filteredReminders.length / itemsPerPage);
    const paginatedReminders = filteredReminders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Handle delete reminder
    const handleDeleteReminder = () => {
        console.log(`Deleting reminder: ${selectedReminder?.id}`);
        // Here you would normally delete the reminder from your database
        setIsDeleteDialogOpen(false);
        setSelectedReminder(null);
    };

    // Get appropriate icon for event type
    const getEventIcon = (eventType) => {
        switch (eventType.toLowerCase()) {
            case 'birthday':
                return <Cake className="h-5 w-5" />;
            case 'anniversary':
                return <Heart className="h-5 w-5" />;
            default:
                return <CalendarDays className="h-5 w-5" />;
        }
    };

    // Calculate days until event
    const getDaysUntil = (dateString) => {
        const date = parseISO(dateString);
        const diffTime = date.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Format date for display
    const formatDate = (dateString) => {
        return format(parseISO(dateString), 'MMMM d, yyyy');
    };

    return (
        <div className="container px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Reminders</h1>
                    <p className="text-muted-foreground">
                        Keep track of birthdays, anniversaries, and other special events
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/reminders/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Reminder
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                        <Cake className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockReminders.filter(r => r.status === "upcoming").length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {mockReminders.filter(r => {
                                const date = parseISO(r.date);
                                return isAfter(date, currentDate) && isBefore(date, thirtyDaysFromNow);
                            }).length} in the next 30 days
                        </p>
                        <Progress
                            value={70}
                            className="h-2 mt-2"
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Birthdays</CardTitle>
                        <Gift className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockReminders.filter(r => r.eventType === "Birthday" && r.status === "upcoming").length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {mockReminders.filter(r => {
                                const date = parseISO(r.date);
                                return r.eventType === "Birthday" && isAfter(date, currentDate) && isBefore(date, thirtyDaysFromNow);
                            }).length} in the next 30 days
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Anniversaries</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {mockReminders.filter(r => r.eventType === "Anniversary" && r.status === "upcoming").length}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {mockReminders.filter(r => {
                                const date = parseISO(r.date);
                                return r.eventType === "Anniversary" && isAfter(date, currentDate) && isBefore(date, thirtyDaysFromNow);
                            }).length} in the next 30 days
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <Tabs defaultValue="upcoming" onValueChange={setSelectedTab}>
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
                            <TabsList>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="birthdays">Birthdays</TabsTrigger>
                                <TabsTrigger value="anniversaries">Anniversaries</TabsTrigger>
                                <TabsTrigger value="completed">Past Events</TabsTrigger>
                            </TabsList>
                            <div className="flex items-center space-x-2">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search reminders..."
                                        className="w-full pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            className="absolute right-2.5 top-2.5"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <X className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Clear search</span>
                                        </button>
                                    )}
                                </div>
                                <Select value={timeRange} onValueChange={setTimeRange}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Time Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30days">Next 30 days</SelectItem>
                                        <SelectItem value="90days">Next 90 days</SelectItem>
                                        <SelectItem value="all">All upcoming</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <TabsContent value="upcoming">
                            {paginatedReminders.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {paginatedReminders.map((reminder) => {
                                        const daysUntil = getDaysUntil(reminder.date);
                                        return (
                                            <Card key={reminder.id} className="overflow-hidden">
                                                <CardHeader className="p-4 pb-2">
                                                    <div className="flex items-center justify-between">
                                                        <Badge
                                                            variant={reminder.eventType === "Birthday" ? "secondary" : "outline"}
                                                            className="mb-2"
                                                        >
                                                            {reminder.eventType}
                                                        </Badge>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => {
                                                                    setSelectedReminder(reminder);
                                                                    setIsDetailsDialogOpen(true);
                                                                }}>
                                                                    View Details
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/reminders/${reminder.id}/edit`}>
                                                                        <Edit className="h-4 w-4 mr-2" />Edit
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={`/gifts?contactId=${reminder.contactId}`}>
                                                                        <Gift className="h-4 w-4 mr-2" />Gift Ideas
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem
                                                                    className="text-destructive focus:text-destructive"
                                                                    onClick={() => {
                                                                        setSelectedReminder(reminder);
                                                                        setIsDeleteDialogOpen(true);
                                                                    }}
                                                                >
                                                                    <Trash2 className="h-4 w-4 mr-2" />Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div className="flex items-center space-x-3 mt-2">
                                                        <Avatar>
                                                            <AvatarImage src={reminder.contactAvatar} alt={reminder.contactName} />
                                                            <AvatarFallback>{reminder.contactInitial}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <CardTitle className="text-lg">{reminder.contactName}</CardTitle>
                                                            <CardDescription>{formatDate(reminder.date)}</CardDescription>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4 pt-2">
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex items-center space-x-1">
                                                            <Bell className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-sm text-muted-foreground">
                                                                {reminder.reminderDays.join(', ')} days before
                                                            </span>
                                                        </div>
                                                        <Badge
                                                            variant={daysUntil <= 7 ? "destructive" : "outline"}
                                                        >
                                                            {daysUntil === 0
                                                                ? "Today"
                                                                : daysUntil === 1
                                                                    ? "Tomorrow"
                                                                    : `${daysUntil} days`}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="p-4 pt-2 border-t flex justify-between">
                                                    <Button variant="ghost" size="sm" onClick={() => {
                                                        setSelectedReminder(reminder);
                                                        setIsDetailsDialogOpen(true);
                                                    }}>
                                                        Details
                                                    </Button>
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/reminders/${reminder.id}/edit`}>
                                                            Edit
                                                        </Link>
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <div className="rounded-full bg-muted p-4 mb-4">
                                        <CalendarX className="h-10 w-10 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">No reminders found</h3>
                                    <p className="text-muted-foreground max-w-sm">
                                        {searchQuery
                                            ? "No reminders match your search query. Try adjusting your search."
                                            : "You don't have any upcoming reminders in this time range."}
                                    </p>
                                    <Button className="mt-4" asChild>
                                        <Link href="/reminders/new">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Your First Reminder
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </TabsContent>

                        <TabsContent value="birthdays">
                            {/* Similar layout as "upcoming" but filtered for birthdays */}
                        </TabsContent>

                        <TabsContent value="anniversaries">
                            {/* Similar layout as "upcoming" but filtered for anniversaries */}
                        </TabsContent>

                        <TabsContent value="completed">
                            {/* Similar layout as "upcoming" but showing past events */}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                    </Button>
                    <div className="flex items-center text-sm">
                        Page {currentPage} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                    </Button>
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you sure you want to delete this reminder?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the reminder and all associated notifications.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-3 py-4">
                        {selectedReminder && (
                            <>
                                <Avatar>
                                    <AvatarImage src={selectedReminder.contactAvatar} alt={selectedReminder.contactName} />
                                    <AvatarFallback>{selectedReminder.contactInitial}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{selectedReminder.contactName}</div>
                                    <div className="text-sm text-muted-foreground">
                                        {selectedReminder.eventType} - {formatDate(selectedReminder.date)}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteReminder}>
                            Delete Reminder
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Reminder Details Dialog */}
            <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    {selectedReminder && (
                        <>
                            <DialogHeader>
                                <DialogTitle>{selectedReminder.eventType} Details</DialogTitle>
                                <DialogDescription>
                                    Information about this event and reminder settings
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={selectedReminder.contactAvatar} alt={selectedReminder.contactName} />
                                        <AvatarFallback>{selectedReminder.contactInitial}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-lg font-medium">{selectedReminder.contactName}</h3>
                                        <Link href={`/contacts/${selectedReminder.contactId}`} className="text-sm text-primary hover:underline">
                                            View Contact
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Event Type</h4>
                                            <p className="mt-1">{selectedReminder.eventType}</p>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
                                            <p className="mt-1">{formatDate(selectedReminder.date)}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Reminder Schedule</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedReminder.reminderDays.map((days, i) => (
                                                <Badge key={i} variant="secondary">
                                                    {days} days before
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Notes</h4>
                                        <p className="mt-1 text-sm">{selectedReminder.notes || "No notes added"}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-medium text-muted-foreground">Suggested Gifts</h4>
                                        <Link href={`/gifts?contactId=${selectedReminder.contactId}`} className="text-primary hover:underline text-sm">
                                            View gift suggestions
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="flex space-x-2">
                                <Button variant="outline" className="flex-1" asChild>
                                    <Link href={`/reminders/${selectedReminder.id}/edit`}>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Reminder
                                    </Link>
                                </Button>
                                <Button className="flex-1">
                                    <Bell className="h-4 w-4 mr-2" />
                                    Send Test Notification
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}