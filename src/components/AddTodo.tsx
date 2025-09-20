import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
        className="flex-1"
      />
      <Button type="submit" size="sm" className="shrink-0">
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </form>
  );
}