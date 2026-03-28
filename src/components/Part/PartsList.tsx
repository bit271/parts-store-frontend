import { useMemo, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Part } from '@/api/api';
import { PartsTable } from '@/components/Part/PartsTable';

interface PartsListProps {
  parts: Part[];
}

export function PartsList({ parts }: PartsListProps) {
  const [partSearch, setSearch] = useState('');

  const filteredParts = useMemo(() => {
    if (!partSearch) return parts;
    const lowerSearch = partSearch.toLowerCase();

    return parts.filter(
      (part) =>
        part.name.toLowerCase().includes(lowerSearch) ||
        part.catalogNum.toLowerCase().includes(lowerSearch) ||
        part.carName.toLowerCase().includes(lowerSearch) ||
        part.categoryName.toLowerCase().includes(lowerSearch)
    );
  }, [parts, partSearch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Parts list</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            placeholder="Search by name, article, car, category"
            value={partSearch}
            onChange={(event) => setSearch(event.target.value)}
          />
          <PartsTable
            parts={filteredParts}
          />
        </div>
      </CardContent>
    </Card>
  );
}
