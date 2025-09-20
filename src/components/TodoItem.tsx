import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ id, text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
      <Checkbox
        checked={completed}
        onCheckedChange={() => onToggle(id)}
        className="shrink-0"
      />
      <span 
        className={`flex-1 ${completed ? 'line-through text-muted-foreground' : ''}`}
      >
        {text}
      </span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(id)}
        className="shrink-0 text-destructive hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}