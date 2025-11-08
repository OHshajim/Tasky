import { ClipboardList } from "lucide-react";
import { Button } from "./ui/button";
import { TaskCard } from "./TaskCard";
import { Task } from "@/types/task";

const TaskList = ({ filteredTasks, filter, setIsFormOpen, setEditingTask, setDeletingTaskId, setTasks }) => {
    const handleToggleComplete = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                          ...task,
                          completed: !task.completed,
                          updatedAt: new Date().toISOString(),
                      }
                    : task
            )
        );
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };
    return (
        <div className="space-y-3">
            {filteredTasks.length === 0 ? (
                <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-4">
                        <ClipboardList className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                        {filter === "all"
                            ? "No tasks yet"
                            : `No ${filter} tasks`}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        {filter === "all"
                            ? "Create your first task to get started"
                            : `You don't have any ${filter} tasks`}
                    </p>
                    {filter === "all" && (
                        <Button onClick={() => setIsFormOpen(true)}>
                            Create Task
                        </Button>
                    )}
                </div>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={handleToggleComplete}
                        onEdit={handleEdit}
                        onDelete={setDeletingTaskId}
                    />
                ))
            )}
        </div>
    );
};

export default TaskList;