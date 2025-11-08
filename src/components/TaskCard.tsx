import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/types/task";
import { Pencil, Trash2, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { formatDistanceToNow, isPast, isFuture } from "date-fns";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig = {
  high: { color: "bg-destructive text-destructive-foreground", label: "High" },
  medium: { color: "bg-accent text-accent-foreground", label: "Medium" },
  low: { color: "bg-secondary text-secondary-foreground", label: "Low" },
};

export const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isOverdue, setIsOverdue] = useState(false);
  
  // Fallback to 'medium' priority if undefined or invalid
  const taskPriority = task.priority && priorityConfig[task.priority] ? task.priority : 'medium';

  useEffect(() => {
    if (!task.deadline || task.completed) return;

    const updateCountdown = () => {
      const deadline = new Date(task.deadline!);
      const now = new Date();
      
      if (isPast(deadline)) {
        setIsOverdue(true);
        setTimeLeft(`Overdue by ${formatDistanceToNow(deadline)}`);
      } else {
        setIsOverdue(false);
        setTimeLeft(`Due in ${formatDistanceToNow(deadline)}`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [task.deadline, task.completed]);

  return (
    <Card
      className={cn(
        "p-4 transition-all duration-200 hover:shadow-md border-2",
        task.completed 
          ? "bg-muted/50 border-success/20" 
          : isOverdue && task.deadline
          ? "bg-destructive/5 border-destructive/30"
          : "bg-card border-border"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => onToggleComplete(task.id)}
          className="mt-1"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={cn("text-xs", priorityConfig[taskPriority].color)}>
                  {priorityConfig[taskPriority].label}
                </Badge>
                {isOverdue && !task.completed && (
                  <Badge variant="destructive" className="text-xs flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Overdue
                  </Badge>
                )}
              </div>
              
              <h3
                className={cn(
                  "font-semibold text-lg transition-all",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={cn(
                    "text-sm mt-1 text-foreground/70",
                    task.completed && "line-through text-muted-foreground"
                  )}
                >
                  {task.description}
                </p>
              )}
              
              {task.deadline && (
                <div className={cn(
                  "flex items-center gap-1 mt-2 text-sm",
                  isOverdue && !task.completed ? "text-destructive font-medium" : "text-muted-foreground"
                )}>
                  <Clock className="h-4 w-4" />
                  {timeLeft}
                </div>
              )}
            </div>
            
            <Badge variant={task.completed ? "secondary" : "default"} className="shrink-0">
              {task.completed ? "Completed" : "Active"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs text-muted-foreground">
              Updated: {new Date(task.updatedAt).toLocaleDateString()}
            </span>
            
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(task)}
                className="h-8 w-8 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(task.id)}
                className="h-8 w-8 p-0 text-destructive hover:bg-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
