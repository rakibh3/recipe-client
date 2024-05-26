import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from '@/components/ui/select';
import { FilterIcon, SearchIcon } from 'lucide-react';

export default function Search() {
  return (
    <div className="bg-white dark:bg-gray-950 px-4 md:px-6 py-6 md:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">All Recipes</h1>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="Search recipes..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex items-center gap-2" variant="outline">
                    <FilterIcon className="w-5 h-5" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[300px] p-4">
                  <div className="grid gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Category</h3>
                      <div className="grid gap-2">
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-breakfast" />
                          Breakfast
                        </Label>
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-lunch" />
                          Lunch
                        </Label>
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-dinner" />
                          Dinner
                        </Label>
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-dessert" />
                          Dessert
                        </Label>
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-appetizer" />
                          Appetizer
                        </Label>
                        <Label className="flex items-center gap-2">
                          <Checkbox id="category-snack" />
                          Snack
                        </Label>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Country</h3>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="canada">Canada</SelectItem>
                          <SelectItem value="mexico">Mexico</SelectItem>
                          <SelectItem value="italy">Italy</SelectItem>
                          <SelectItem value="france">France</SelectItem>
                          <SelectItem value="japan">Japan</SelectItem>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="thailand">Thailand</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
