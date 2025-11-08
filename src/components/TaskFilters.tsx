import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TaskStatus } from "@/types/task";
import { ListTodo, CheckCircle2, Circle } from "lucide-react";

interface TaskFiltersProps {
  activeFilter: TaskStatus;
  onFilterChange: (filter: TaskStatus) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilters = ({ activeFilter, onFilterChange, counts }: TaskFiltersProps) => {
  return (
    <Tabs value={activeFilter} onValueChange={(value) => onFilterChange(value as TaskStatus)}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all" className="flex items-center gap-2">
          <ListTodo className="h-4 w-4" />
          All ({counts.all})
        </TabsTrigger>
        <TabsTrigger value="active" className="flex items-center gap-2">
          <Circle className="h-4 w-4" />
          Active ({counts.active})
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          Completed ({counts.completed})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
