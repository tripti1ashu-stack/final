import { Button } from "./ui/button";

type FilterType = 'all' | 'active' | 'completed';

interface TodoFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  completedCount: number;
}

export function TodoFilters({ currentFilter, onFilterChange, activeCount, completedCount }: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 border-t">
      <div className="flex gap-1">
        <Button
          variant={currentFilter === 'all' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('all')}
        >
          All
        </Button>
        <Button
          variant={currentFilter === 'active' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('active')}
        >
          Active ({activeCount})
        </Button>
        <Button
          variant={currentFilter === 'completed' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onFilterChange('completed')}
        >
          Completed ({completedCount})
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
      </div>
    </div>
  );
}