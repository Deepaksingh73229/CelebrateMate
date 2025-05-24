"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Plus,
    MoreHorizontal,
    Calendar,
    Gift,
    Edit,
    Trash2,
    Upload,
    Download,
    Filter,
    SortAsc,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

import { mockContacts  } from "../../data/contactData";

export default function Contact() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedContact, setSelectedContact] = useState(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [view, setView] = useState("grid");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Filter contacts based on search query and selected filter
    const filteredContacts = mockContacts.filter(contact => {
        // Filter by search query
        const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchQuery.toLowerCase());

        // Filter by category
        const matchesFilter = selectedFilter === "all" || contact.category === selectedFilter;

        return matchesSearch && matchesFilter;
    });

    // Pagination
    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const paginatedContacts = filteredContacts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle page change
    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    // Handle delete contact
    const handleDeleteContact = () => {
        console.log(`Deleting contact: ${selectedContact?.name}`);
        // Here you would normally delete the contact from your database
        setIsDeleteDialogOpen(false);
        setSelectedContact(null);
    };

    return (
        <div className="container px-4 py-8 md:px-6 md:py-12">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
                    <p className="text-muted-foreground">
                        Manage your contacts and their important dates
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button asChild>
                        <Link href="/contacts/new">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Contact
                        </Link>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                                <Upload className="h-4 w-4 mr-2" />
                                Import Contacts
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Export Contacts
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                                Delete Selected
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card className="mb-6">
                <CardContent className="p-4">
                    <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedFilter}>
                        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                            <div className="flex items-center space-x-2">
                                <TabsList>
                                    <TabsTrigger value="all">All Contacts</TabsTrigger>
                                    <TabsTrigger value="family">Family</TabsTrigger>
                                    <TabsTrigger value="friends">Friends</TabsTrigger>
                                    <TabsTrigger value="work">Work</TabsTrigger>
                                </TabsList>
                                <div className="ml-2 hidden md:flex items-center space-x-2">
                                    <Button
                                        variant={view === "grid" ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setView("grid")}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <rect width="7" height="7" x="3" y="3" rx="1" />
                                            <rect width="7" height="7" x="14" y="3" rx="1" />
                                            <rect width="7" height="7" x="3" y="14" rx="1" />
                                            <rect width="7" height="7" x="14" y="14" rx="1" />
                                        </svg>
                                    </Button>
                                    <Button
                                        variant={view === "list" ? "default" : "outline"}
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setView("list")}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-4 w-4"
                                        >
                                            <line x1="8" y1="6" x2="21" y2="6" />
                                            <line x1="8" y1="12" x2="21" y2="12" />
                                            <line x1="8" y1="18" x2="21" y2="18" />
                                            <line x1="3" y1="6" x2="3.01" y2="6" />
                                            <line x1="3" y1="12" x2="3.01" y2="12" />
                                            <line x1="3" y1="18" x2="3.01" y2="18" />
                                        </svg>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex w-full md:w-auto items-center space-x-2">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="search"
                                        placeholder="Search contacts..."
                                        className="w-full pl-8"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    {searchQuery && (
                                        <button
                                            className="absolute right-2.5 top-2.5 rounded-full"
                                            onClick={() => setSearchQuery("")}
                                        >
                                            <X className="h-4 w-4 text-muted-foreground" />
                                            <span className="sr-only">Clear search</span>
                                        </button>
                                    )}
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="icon">
                                            <SortAsc className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                                        <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                                        <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                                        <DropdownMenuItem>Recently Added</DropdownMenuItem>
                                        <DropdownMenuItem>Upcoming Events</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <TabsContent value="all" className="mt-6">
                            {view === "grid" ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {paginatedContacts.map((contact) => (
                                        <Card key={contact.id} className="overflow-hidden">
                                            <CardHeader className="p-4 pb-2">
                                                <div className="flex items-center justify-between">
                                                    <Avatar className="h-12 w-12">
                                                        <AvatarImage src={contact.avatar} alt={contact.name} />
                                                        <AvatarFallback>{contact.initial}</AvatarFallback>
                                                    </Avatar>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/contacts/${contact.id}`}>View Details</Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/contacts/${contact.id}/edit`}>
                                                                    <Edit className="h-4 w-4 mr-2" />Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/reminders/new?contactId=${contact.id}`}>
                                                                    <Calendar className="h-4 w-4 mr-2" />Add Event
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/gifts?contactId=${contact.id}`}>
                                                                    <Gift className="h-4 w-4 mr-2" />Gift Ideas
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-destructive focus:text-destructive"
                                                                onClick={() => {
                                                                    setSelectedContact(contact);
                                                                    setIsDeleteDialogOpen(true);
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <CardTitle className="mt-2 text-lg">{contact.name}</CardTitle>
                                                <CardDescription className="truncate">{contact.email}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="text-sm text-muted-foreground">{contact.phone}</div>
                                                <div className="flex flex-wrap gap-2 mt-3">
                                                    <Badge variant="outline">{contact.category}</Badge>
                                                    {contact.events.map((event, i) => (
                                                        <Badge key={i} variant={event.type === "Birthday" ? "secondary" : "outline"}>
                                                            {event.type}: {event.date}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-2 border-t flex justify-between">
                                                <Button variant="ghost" size="sm" asChild>
                                                    <Link href={`/contacts/${contact.id}`}>
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/contacts/${contact.id}/edit`}>
                                                        Edit
                                                    </Link>
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-md border">
                                    <div className="grid grid-cols-12 p-4 font-medium border-b bg-muted/50">
                                        <div className="col-span-5">Name</div>
                                        <div className="col-span-3 hidden md:block">Email</div>
                                        <div className="col-span-2 hidden md:block">Category</div>
                                        <div className="col-span-5 md:col-span-2">Actions</div>
                                    </div>
                                    {paginatedContacts.map((contact) => (
                                        <div key={contact.id} className="grid grid-cols-12 p-4 items-center border-b last:border-none">
                                            <div className="col-span-5">
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={contact.avatar} alt={contact.name} />
                                                        <AvatarFallback>{contact.initial}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{contact.name}</div>
                                                        <div className="text-sm text-muted-foreground md:hidden truncate">{contact.email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-3 hidden md:block text-sm truncate">{contact.email}</div>
                                            <div className="col-span-2 hidden md:block">
                                                <Badge variant="outline">{contact.category}</Badge>
                                            </div>
                                            <div className="col-span-5 md:col-span-2 flex items-center justify-end md:justify-start space-x-1">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/contacts/${contact.id}`}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="h-4 w-4"
                                                        >
                                                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                        <span className="sr-only">View</span>
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/contacts/${contact.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                                                    <Link href={`/reminders/new?contactId=${contact.id}`}>
                                                        <Calendar className="h-4 w-4" />
                                                        <span className="sr-only">Add Event</span>
                                                    </Link>
                                                </Button>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">More</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/gifts?contactId=${contact.id}`}>
                                                                <Gift className="h-4 w-4 mr-2" />Gift Ideas
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            className="text-destructive focus:text-destructive"
                                                            onClick={() => {
                                                                setSelectedContact(contact);
                                                                setIsDeleteDialogOpen(true);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </TabsContent>

                        {/* Duplicate TabsContent for each category with filtered data */}
                        <TabsContent value="family" className="mt-6">
                            {/* Same structure as "all" tab but filtered for family */}
                        </TabsContent>

                        <TabsContent value="friends" className="mt-6">
                            {/* Same structure as "all" tab but filtered for friends */}
                        </TabsContent>

                        <TabsContent value="work" className="mt-6">
                            {/* Same structure as "all" tab but filtered for work */}
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
                        <DialogTitle>Are you sure you want to delete this contact?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete the contact and all associated events and reminders.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-3 py-4">
                        {selectedContact && (
                            <>
                                <Avatar>
                                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                                    <AvatarFallback>{selectedContact.initial}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{selectedContact.name}</div>
                                    <div className="text-sm text-muted-foreground">{selectedContact.email}</div>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteContact}>
                            Delete Contact
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}