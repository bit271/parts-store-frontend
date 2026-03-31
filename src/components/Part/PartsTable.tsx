import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { deletePart } from '@/api/api';
import type { Part } from '@/api/api';

interface PartsTableProps {
  parts: Part[];
}

export function PartsTable({ parts }: PartsTableProps) {
  const [partsState, setPartsState] = useState<Part[]>([]);

  useEffect(() => {
    if (Array.isArray(parts)) {
      setPartsState(parts);
    }
  }, [parts]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deletePart(id);
      setPartsState((prev) => prev.filter((part) => part.id !== id));
    } catch (error) {
      console.error('Failed to delete part:', error);
      alert('Delete error!');
    }
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table className="table-fixed w-full">

        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead className="w-[180px]">Car</TableHead>
            <TableHead className="w-[100px]">Category</TableHead>
            <TableHead className="w-[140px]">Article</TableHead>
            <TableHead className="w-[90px] text-right">Available</TableHead>
            <TableHead className="w-[90px] text-right">Price</TableHead>
            <TableHead className="w-[250px]">Description</TableHead>
            <TableHead className="w-[70px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {partsState.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={8}
                className="h-32 text-center text-muted-foreground"
              >
                No parts found
              </TableCell>
            </TableRow>
          ) : (
            partsState.map((part) => (
              <TableRow key={part.id} className="hover:bg-muted/50">

                {/* Name */}
                <TableCell>
                  <div className="font-medium truncate">
                    {part.name}
                  </div>
                </TableCell>

                {/* Car */}
                <TableCell>
                  <div className="text-sm text-muted-foreground truncate">
                    {part.carName}
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <div className="text-sm text-muted-foreground truncate">
                    {part.categoryName}
                  </div>
                </TableCell>

                {/* Article */}
                <TableCell>
                  <div className="text-sm">
                    {part.catalogNum || "—"}
                  </div>
                </TableCell>

                {/* Available */}
                <TableCell className="text-right">
                  {part.availableCount}
                </TableCell>

                {/* Price */}
                <TableCell className="text-right font-medium">
                  ${part.price.toFixed(2)}
                </TableCell>

                {/* Description */}
                <TableCell>
                  <div
                    className="text-sm text-muted-foreground line-clamp-2"
                    title={part.description}
                  >
                    {part.description || "—"}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <button
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                    onClick={() => handleDelete(part.id)}
                  >
                    Delete
                  </button>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  );
}
