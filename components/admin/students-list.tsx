import { useState } from "react";
import { Student } from "@/types/admin";
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
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StudentDetailSheet } from "./student-detail-sheet";
import { Download, Search, Eye } from "lucide-react";
import * as XLSX from "xlsx";

interface StudentsListProps {
    students: Student[];
    onExportStudentPdf: (userId: string) => void;
}

export function StudentsList({ students, onExportStudentPdf }: StudentsListProps) {
    const [filterLevel, setFilterLevel] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    // Filter students based on level and search query
    const filteredStudents = students.filter(student => {
        const matchesLevel = filterLevel === "all" || student.level === filterLevel;
        const matchesSearch = student.email.toLowerCase().includes(searchQuery.toLowerCase()); // Searching by email for now
        return matchesLevel && matchesSearch;
    });

    const uniqueLevels = Array.from(new Set(students.map(s => s.level)));

    const handleViewDetails = (student: Student) => {
        setSelectedStudent(student);
        setIsSheetOpen(true);
    };

    const handleExport = () => {
        const dataToExport = filteredStudents.map(s => ({
            "Email": s.email,
            "Niveau": s.level,
            "Langue": s.preferred_language,
            "Date Inscription": new Date(s.created_at).toLocaleDateString()
        }));

        const ws = XLSX.utils.json_to_sheet(dataToExport);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Etudiants");
        XLSX.writeFile(wb, "etudiants_export.xlsx");
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-[300px]">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher par email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                    <Select value={filterLevel} onValueChange={setFilterLevel}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filtrer par niveau" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tous les niveaux</SelectItem>
                            {uniqueLevels.map(level => (
                                <SelectItem key={level} value={level} className="capitalize">{level}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="outline" onClick={handleExport} className="w-full sm:w-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Exporter Excel
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Niveau</TableHead>
                            <TableHead>Langue</TableHead>
                            <TableHead>Date Inscription</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <TableRow key={student.user_id}>
                                    <TableCell className="font-medium">{student.email}</TableCell>
                                    <TableCell className="capitalize">{student.level}</TableCell>
                                    <TableCell className="uppercase">{student.preferred_language}</TableCell>
                                    <TableCell>{new Date(student.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleViewDetails(student)}
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            Détails
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Aucun étudiant trouvé.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <StudentDetailSheet
                student={selectedStudent}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                onExportPdf={onExportStudentPdf}
            />
        </div>
    );
}
