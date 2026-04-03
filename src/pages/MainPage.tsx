import { useState } from 'react';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useParts } from '@/hooks/useParts';
import { useCars } from '@/hooks/useCars';
import { useCategories } from '@/hooks/useCategories';

export default function MainPage() {
  const { parts } = useParts();
  const { cars } = useCars();
  const { categories } = useCategories();

  // Filters
  const [brand, setBrand] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);
  const [availability, setAvailability] = useState('in');
  const [search, setSearch] = useState('');

  // Filtered parts
  const filteredParts = parts.filter(part => {
    let ok = true;
    if (brand && !part.carName.toLowerCase().includes(brand.toLowerCase())) ok = false;
    if (model && !part.carName.toLowerCase().includes(model.toLowerCase())) ok = false;
    if (category && part.categoryName !== category) ok = false;
    if (priceFrom !== null && part.price < priceFrom) ok = false;
    if (priceTo !== null && part.price > priceTo) ok = false;
    if (availability === 'in' && part.availableCount <= 0) ok = false;
    if (availability === 'out' && part.availableCount > 0) ok = false;
    if (search && !(
      part.name.toLowerCase().includes(search.toLowerCase()) ||
      part.catalogNum.toLowerCase().includes(search.toLowerCase())
    )) ok = false;
    return ok;
  });

  // Unique brands/models from cars
  const brands = Array.from(new Set(cars.map(c => c.brandName)));
  const models = Array.from(new Set(cars.map(c => c.modelName)));

  return (

    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b bg-card gap-4">
        <div className="flex items-center gap-8 min-w-[320px]">
          <span className="text-4xl font-extrabold tracking-tight">PartStore</span>
          <div className="flex flex-col gap-0.5 text-right text-base font-medium text-muted-foreground">
            <span>+38 (050) 123-45-67</span>
            <span>+38 (067) 987-65-43</span>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <Input
            className="w-[800px] h-14 text-lg px-10 py-4 border border-primary shadow-md"
            style={{ fontSize: '1.25rem', height: '3.5rem' }}
            placeholder="Search by name or article..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div>
          <Button variant="outline" className="h-14 px-6 text-lg">
            <span className="material-icons align-middle mr-2">Shopping cart</span>
          </Button>
        </div>
      </header>

      <main className="flex gap-10 px-8 py-10">
        {/* Sidebar */}
        <aside className="w-72 space-y-8 bg-card/70 border border-border rounded-xl p-6 h-fit sticky top-8 self-start shadow-md text-base">
          <div>
            <Label className="mb-3 block text-lg font-semibold">Brand</Label>
            <div className="mt-4">
              <Select value={brand} onValueChange={(value) => {
                setBrand(value);
                setModel("");
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map(b => (
                    <SelectItem key={b} value={b}>{b}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-lg font-semibold">Model</Label>
            <div className="mt-4">
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map(m => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-lg font-semibold">Category</Label>
            <div className="mt-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-lg font-semibold">Price</Label>
            <div className="mt-5">
              <Slider
                min={0}
                max={1000}
                step={10}
                value={[
                  priceFrom ?? 0,
                  priceTo ?? 1000
                ]}
                onValueChange={([min, max]) => {
                  setPriceFrom(min);
                  setPriceTo(max);
                }}
              />
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Input
                type="number"
                placeholder="from"
                min={0}
                value={priceFrom ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setPriceFrom(value ? Number(value) : null);
                }}
                className="w-full"
              />
              <span className="mx-1">—</span>
              <Input
                type="number"
                placeholder="to"
                min={0}
                value={priceTo ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  setPriceTo(value ? Number(value) : null);
                }}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <Label className="mb-3 block text-lg font-semibold">Availability</Label>
            <div className="mt-4">
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in">In stock</SelectItem>
                  <SelectItem value="out">Out of stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setBrand("");
              setModel("");
              setCategory("");
              setPriceFrom(null);
              setPriceTo(null);
              setAvailability("in");
            }}
          >
            Reset filters
          </Button>
        </aside>

        {/* Products grid */}
        <section className="flex-1">
          {/* <div className="flex w-full flex-wrap justify-center gap-2">
            {brand && <Badge>{brand}</Badge>}
            {model && <Badge>{model}</Badge>}
            {category && <Badge>{category}</Badge>}
            {priceFrom !== null && <Badge>{priceFrom + " — " + priceTo}</Badge>}
          </div> */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredParts.map(part => (
              <Card key={part.id} className="flex flex-col">
                <CardHeader className="flex flex-col items-center">
                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden rounded-md">
                    {part.imageUrl ? (
                      <img
                        src={part.imageUrl}
                        alt={part.name}
                        className="object-cover w-full h-full"
                        style={{ objectFit: 'contain', objectPosition: 'center' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    ) : (
                      <span className="text-muted-foreground">No image</span>
                    )}
                  </div>
                  <CardTitle className="mt-2 text-center w-full truncate">{part.name}</CardTitle>
                  <div className="text-base text-muted-foreground w-full text-center truncate font-semibold">Article: {part.catalogNum}</div>
                  <div className="text-base text-muted-foreground w-full text-center truncate font-semibold">In stock: {part.availableCount}</div>
                </CardHeader>
                <CardFooter className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg">${part.price.toFixed(2)}</span>
                  <Button>Add to cart</Button>
                </CardFooter>
                <div className="px-6 pb-3 pt-1">
                  <span className="inline-block bg-secondary text-secondary-foreground rounded px-2 py-0.5 text-xs">{part.carName}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
