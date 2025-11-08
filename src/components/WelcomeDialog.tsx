import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle, Calendar } from "lucide-react";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeDialog = ({ open, onOpenChange }: WelcomeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Tasky ! 🎯</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Your personal productivity companion to organize and track your tasks efficiently.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex gap-3">
            <div className="p-2 bg-primary/10 rounded-lg h-fit">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Set Priorities</h4>
              <p className="text-sm text-muted-foreground">
                Mark tasks as High, Medium, or Low priority to focus on what matters most.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 bg-accent/10 rounded-lg h-fit">
              <Calendar className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Track Deadlines</h4>
              <p className="text-sm text-muted-foreground">
                Set target dates and watch the countdown. Never miss a deadline again!
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="p-2 bg-destructive/10 rounded-lg h-fit">
              <AlertCircle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Overdue Alerts</h4>
              <p className="text-sm text-muted-foreground">
                Get visual alerts for overdue tasks to stay on top of your work.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={() => onOpenChange(false)} size="lg">
            Get Started
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
