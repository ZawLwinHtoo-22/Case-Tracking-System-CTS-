import { useEffect, useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCategories, addCategory, removeCategory } from "@/lib/categories";

export default function CategorySetup() {
  const [list, setList] = useState<string[]>(() => getCategories());
  const [value, setValue] = useState("");

  useEffect(() => {
    setList(getCategories());
  }, []);

  const onAdd = () => {
    const v = value.trim();
    if (!v) return;
    addCategory(v);
    setList(getCategories());
    setValue("");
  };

  const onRemove = (cat: string) => {
    removeCategory(cat);
    setList(getCategories());
  };

  return (
    <div className="space-y-6 animate-in">
      <Card>
        <CardHeader>
          <CardTitle>Category Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Label>New category</Label>
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter category name" />
              </div>
              <Button onClick={onAdd} className="h-10 mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            </div>

            <div>
              <Label>Existing categories</Label>
              <div className="mt-2 space-y-2">
                {list.length === 0 && <div className="text-sm text-muted-foreground">No categories defined yet.</div>}
                {list.map((c) => (
                  <div key={c} className="flex items-center justify-between rounded-md border p-2">
                    <div className="text-sm">{c}</div>
                    <Button variant="ghost" onClick={() => onRemove(c)}>
                      <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
