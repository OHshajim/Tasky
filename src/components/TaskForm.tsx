import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Task } from "@/types/task";

const schema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    priority: z.enum(["low", "medium", "high"]).default("medium"),
    deadline: z.date().optional(),
});

type TaskFormData = z.infer<typeof schema>;

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: TaskFormData) => void;
    editingTask?: Task | null;
}

export const TaskForm = ({ open, onOpenChange, onSubmit, editingTask }: Props) => {
    const { register, handleSubmit, reset, setValue, watch, formState: { errors }, } = useForm<TaskFormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            description: "",
            priority: "medium",
            deadline: undefined,
        },
    })

    useEffect(() => {
        if (editingTask) {
            console.log(editingTask);
            reset({
                title: editingTask.title,
                description: editingTask.description || "",
                priority: editingTask.priority || "medium",
                deadline: editingTask.deadline
                    ? new Date(editingTask.deadline)
                    : undefined,
            });
        } else {
            reset({
                title: "",
                description: "",
                priority: "medium",
                deadline: undefined,
            });
        }
    }, [editingTask, reset, open]);

    const deadline = watch("deadline");

    const handleClose = () => {
        reset({
            title: "",
            description: "",
            priority: "medium",
            deadline: undefined,
        });
        onOpenChange(false);
    };

    const submit = (data: TaskFormData) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader>
                    <DialogTitle>
                        {editingTask ? "Edit Task" : "Add New Task"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingTask
                            ? "Update task details below."
                            : "Fill the details to create a task."}
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="flex flex-col gap-4"
                >
                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium">Title</label>
                        <Input
                            placeholder="Task title"
                            {...register("title")}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-xs">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium">
                            Description
                        </label>
                        <Textarea
                            rows={3}
                            placeholder="Task description"
                            {...register("description")}
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select
                            onValueChange={(val) =>
                                setValue(
                                    "priority",
                                    val as "low" | "medium" | "high"
                                )
                            }
                            defaultValue={editingTask?.priority || "medium"}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="text-sm font-medium">Deadline</label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between text-left",
                                        !deadline && "text-muted-foreground"
                                    )}
                                >
                                    {deadline
                                        ? format(deadline, "PPP")
                                        : "Pick a date"}
                                    <CalendarIcon className="w-4 h-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={deadline}
                                    onSelect={(date) =>
                                        setValue("deadline", date)
                                    }
                                    disabled={(date) =>
                                        date <
                                        new Date(
                                            new Date().setHours(0, 0, 0, 0)
                                        )
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2 pt-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            {editingTask ? "Update Task" : "Create Task"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
