import { cn } from "@/lib/utils";

interface SelectableListProps<T extends { id: number; name: string }> {
  items: T[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  emptyMessage: string;
  className?: string;
}

export function SelectableList<T extends { id: number; name: string }>({
  items = [],
  selectedId,
  onSelect,
  emptyMessage,
  className,
}: SelectableListProps<T>) {
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className={cn("border rounded-md h-48 overflow-y-auto", className)}>
      {safeItems.length === 0 ? (
        <div className="p-4 text-sm text-muted-foreground text-center">
          {emptyMessage}
        </div>
      ) : (
        <div className="divide-y">
          {safeItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`p-2 cursor-pointer hover:bg-accent ${selectedId === item.id ? 'bg-accent' : ''
                }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

