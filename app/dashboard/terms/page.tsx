"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, ScrollText, Edit, Trash2, Eye, CheckCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function TermsPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTerms, setSelectedTerms] = useState<any>(null);
    const [viewMode, setViewMode] = useState<"edit" | "view">("edit");

    // Mock terms data
    const termsData = [
        {
            id: "1",
            title: "Rental Agreement Terms",
            type: "rental" as const,
            version: "2.1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
            effectiveDate: "2024-01-01",
            status: "published" as const,
            isRequired: true,
            acceptanceCount: 1250,
            createdBy: "Admin",
            createdAt: "2023-12-01",
            updatedAt: "2024-01-01",
        },
        {
            id: "2",
            title: "Driver Requirements & Conditions",
            type: "driver" as const,
            version: "1.5",
            content: "All drivers must meet the following requirements...",
            effectiveDate: "2024-02-01",
            status: "published" as const,
            isRequired: true,
            acceptanceCount: 980,
            createdBy: "Admin",
            createdAt: "2024-01-15",
            updatedAt: "2024-02-01",
        },
        {
            id: "3",
            title: "Privacy Policy Update",
            type: "privacy" as const,
            version: "3.0",
            content: "Your privacy is important to us. This policy explains...",
            effectiveDate: "2024-03-15",
            status: "draft" as const,
            isRequired: true,
            acceptanceCount: 0,
            createdBy: "Legal Team",
            createdAt: "2024-03-01",
            updatedAt: "2024-03-10",
        },
        {
            id: "4",
            title: "Cancellation Policy",
            type: "cancellation" as const,
            version: "1.2",
            content: "Cancellation terms and refund policies...",
            effectiveDate: "2023-06-01",
            expiryDate: "2024-01-01",
            status: "archived" as const,
            isRequired: false,
            acceptanceCount: 550,
            createdBy: "Admin",
            createdAt: "2023-05-15",
            updatedAt: "2023-06-01",
        },
    ];

    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTerms = termsData.filter((term) => {
        const matchesStatus = statusFilter === "all" || term.status === statusFilter;
        const matchesSearch = term.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            published: "success",
            draft: "warning",
            archived: "secondary",
        };
        return variants[status];
    };

    const getTypeBadge = (type: string) => {
        const variants: Record<string, any> = {
            rental: "default",
            driver: "success",
            privacy: "warning",
            cancellation: "destructive",
            general: "secondary",
        };
        return variants[type];
    };

    const stats = {
        total: termsData.length,
        published: termsData.filter((t) => t.status === "published").length,
        draft: termsData.filter((t) => t.status === "draft").length,
        totalAcceptances: termsData.reduce((sum, t) => sum + t.acceptanceCount, 0),
    };

    const handleEdit = (terms: any) => {
        setSelectedTerms(terms);
        setViewMode("edit");
        setIsDialogOpen(true);
    };

    const handleView = (terms: any) => {
        setSelectedTerms(terms);
        setViewMode("view");
        setIsDialogOpen(true);
    };

    const handleAdd = () => {
        setSelectedTerms(null);
        setViewMode("edit");
        setIsDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Terms & Conditions
                    </h1>
                    <p className="text-muted-foreground">
                        Manage legal documents and policy versions
                    </p>
                </div>
                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Terms
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {stats.published}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">
                            {stats.draft}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Total Acceptances</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalAcceptances}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Terms Table */}
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle>All Terms & Conditions</CardTitle>
                        <div className="flex flex-col gap-2 sm:flex-row">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search terms..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <Select
                                value={statusFilter}
                                onValueChange={(value) => setStatusFilter(value)}
                            >
                                <SelectTrigger className="w-full sm:w-40">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Document</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Version</TableHead>
                                    <TableHead>Effective Date</TableHead>
                                    <TableHead>Acceptances</TableHead>
                                    <TableHead>Required</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTerms.map((term) => (
                                    <TableRow key={term.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                                                    <ScrollText className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <div className="font-medium">{term.title}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        By {term.createdBy}
                                                    </div>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getTypeBadge(term.type)}>
                                                {term.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono">v{term.version}</TableCell>
                                        <TableCell>{formatDate(term.effectiveDate)}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{term.acceptanceCount}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {term.isRequired ? (
                                                <Badge variant="destructive">Required</Badge>
                                            ) : (
                                                <Badge variant="secondary">Optional</Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusBadge(term.status)}>
                                                {term.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleView(term)}
                                                >
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleEdit(term)}
                                                >
                                                    <Edit className="h-3 w-3" />
                                                </Button>
                                                <Button variant="outline" size="sm">
                                                    <Trash2 className="h-3 w-3 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* View/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {viewMode === "view"
                                ? "View Terms & Conditions"
                                : selectedTerms
                                    ? "Edit Terms & Conditions"
                                    : "Create New Terms & Conditions"}
                        </DialogTitle>
                        <DialogDescription>
                            {viewMode === "view"
                                ? "Review the terms and conditions document"
                                : selectedTerms
                                    ? "Update terms and conditions details below"
                                    : "Fill in the details to create new terms and conditions"}
                        </DialogDescription>
                    </DialogHeader>

                    {viewMode === "view" ? (
                        <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-medium">Type:</span>{" "}
                                    <Badge variant={getTypeBadge(selectedTerms?.type)}>
                                        {selectedTerms?.type}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="font-medium">Version:</span> v{selectedTerms?.version}
                                </div>
                                <div>
                                    <span className="font-medium">Effective Date:</span>{" "}
                                    {formatDate(selectedTerms?.effectiveDate)}
                                </div>
                                <div>
                                    <span className="font-medium">Status:</span>{" "}
                                    <Badge variant={getStatusBadge(selectedTerms?.status)}>
                                        {selectedTerms?.status}
                                    </Badge>
                                </div>
                            </div>
                            <div className="rounded-lg border p-4 bg-muted/50">
                                <h3 className="font-semibold mb-2">{selectedTerms?.title}</h3>
                                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {selectedTerms?.content}
                                </p>
                            </div>
                            <Button onClick={() => setViewMode("edit")} className="w-full">
                                Edit Document
                            </Button>
                        </div>
                    ) : (
                        <Tabs defaultValue="details" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="details">Details</TabsTrigger>
                                <TabsTrigger value="content">Content</TabsTrigger>
                            </TabsList>

                            <TabsContent value="details" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            placeholder="Rental Agreement Terms"
                                            defaultValue={selectedTerms?.title}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Type</Label>
                                        <Select defaultValue={selectedTerms?.type || "general"}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="rental">Rental</SelectItem>
                                                <SelectItem value="driver">Driver</SelectItem>
                                                <SelectItem value="privacy">Privacy</SelectItem>
                                                <SelectItem value="cancellation">Cancellation</SelectItem>
                                                <SelectItem value="general">General</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="version">Version</Label>
                                        <Input
                                            id="version"
                                            placeholder="1.0"
                                            defaultValue={selectedTerms?.version}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="effectiveDate">Effective Date</Label>
                                        <Input
                                            id="effectiveDate"
                                            type="date"
                                            defaultValue={selectedTerms?.effectiveDate}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="status">Status</Label>
                                        <Select defaultValue={selectedTerms?.status || "draft"}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="archived">Archived</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="required"
                                        defaultChecked={selectedTerms?.isRequired}
                                        className="h-4 w-4"
                                    />
                                    <Label htmlFor="required" className="cursor-pointer">
                                        Require user acceptance
                                    </Label>
                                </div>
                            </TabsContent>

                            <TabsContent value="content" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="content">Content</Label>
                                    <textarea
                                        id="content"
                                        className="w-full min-h-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                                        placeholder="Enter terms and conditions content..."
                                        defaultValue={selectedTerms?.content}
                                    />
                                </div>
                            </TabsContent>
                        </Tabs>
                    )}

                    {viewMode === "edit" && (
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setIsDialogOpen(false)}>
                                {selectedTerms ? "Save Changes" : "Create Document"}
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
