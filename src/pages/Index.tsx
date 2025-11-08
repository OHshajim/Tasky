import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TaskForm } from "@/components/TaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { WelcomeDialog } from "@/components/WelcomeDialog";
import { Task, TaskStatus, TaskPriority } from "@/types/task";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
AlertDialog,
AlertDialogAction,
AlertDialogCancel,
AlertDialogContent,
AlertDialogDescription,
AlertDialogFooter,
AlertDialogHeader,
AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TaskList from "@/components/TaskList";

const Index = () => {
    const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
    const [filter, setFilter] = useState<TaskStatus>("all");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
    const [hasVisited, setHasVisited] = useLocalStorage("hasVisited", false);
    const [showWelcome, setShowWelcome] = useState(false);
    const { toast } = useToast();

    // Show welcome dialog on first visit
    useEffect(() => {
        if (!hasVisited) {
        setShowWelcome(true);
        setHasVisited(true);
        }
    }, [hasVisited, setHasVisited]);

    const filteredTasks = useMemo(() => {
        let filtered = tasks;
        
        switch (filter) {
        case "active":
            filtered = tasks.filter((task) => !task.completed);
            break;
        case "completed":
            filtered = tasks.filter((task) => task.completed);
            break;
        default:
            filtered = tasks;
        }

        // Sort by priority (high -> medium -> low) and then by deadline
        return filtered.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        
        if (priorityDiff !== 0) return priorityDiff;
        
        // If same priority, sort by deadline (soonest first)
        if (a.deadline && b.deadline) {
            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (a.deadline) return -1;
        if (b.deadline) return 1;
        
        return 0;
        });
    }, [tasks, filter]);

    const counts = useMemo(
        () => ({
        all: tasks.length,
        active: tasks.filter((t) => !t.completed).length,
        completed: tasks.filter((t) => t.completed).length,
        }),
        [tasks]
    );

    const handleCreateTask = (data: { 
        title: string; 
        description?: string; 
        priority: TaskPriority;
        deadline?: Date;
    }) => {
        if (editingTask) {
        setTasks((prev) =>
            prev.map((task) =>
            task.id === editingTask.id
                ? {
                    ...task,
                    title: data.title,
                    description: data.description,
                    priority: data.priority,
                    deadline: data.deadline?.toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                : task
            )
        );
        toast({
            title: "Task updated",
            description: "Your task has been updated successfully.",
        });
        setEditingTask(null);
        } else {
        const newTask: Task = {
            id: crypto.randomUUID(),
            title: data.title,
            description: data.description,
            priority: data.priority,
            deadline: data.deadline?.toISOString(),
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTasks((prev) => [newTask, ...prev]);
        toast({
            title: "Task created",
            description: "Your new task has been added successfully.",
        });
        }
        setIsFormOpen(false);
    };

    const handleDeleteConfirm = () => {
        if (deletingTaskId) {
        setTasks((prev) => prev.filter((task) => task.id !== deletingTaskId));
        toast({
            title: "Task deleted",
            description: "Your task has been removed successfully.",
        });
        setDeletingTaskId(null);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <img src="/logo.png" alt="Tasky Logo" loading="lazy" className="h-20 w-20" />
                        <div>
                            <h1 className="text-4xl font-bold text-foreground">Tasky</h1>
                            <p className="text-muted-foreground mt-1">Organize your work efficiently</p>
                        </div>
                        </div>
                        <Button onClick={() => {
                        setEditingTask(null);
                        setIsFormOpen(true);
                        }} size="sm" className="gap-2">
                        <Plus className="h-5 w-5" />
                        New Task
                        </Button>
                    </div>

                {/* Filters */}
                <TaskFilters activeFilter={filter} onFilterChange={setFilter} counts={counts} />
                </div>

                {/* Task List */}
                <TaskList
                    filteredTasks={filteredTasks}
                    filter={filter}
                    setIsFormOpen={setIsFormOpen}
                    setEditingTask={setEditingTask}
                    setDeletingTaskId={setDeletingTaskId}
                    setTasks={setTasks}
                />
            </div>

        {/* Task Form Dialog */}
            <TaskForm
                open={isFormOpen}
                onOpenChange={(open) => {
                setIsFormOpen(open);
                if (!open) setEditingTask(null);
                }}
                onSubmit={handleCreateTask}
                editingTask={editingTask}
            />

            {/* Welcome Dialog */}
            <WelcomeDialog open={showWelcome} onOpenChange={setShowWelcome} />

        {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deletingTaskId} onOpenChange={() => setDeletingTaskId(null)}>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this task.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600">Delete</AlertDialogAction>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default Index;
