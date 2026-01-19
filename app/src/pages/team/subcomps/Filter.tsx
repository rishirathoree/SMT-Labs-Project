import { FilterIcon, TrashIcon, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Menu, MenuGroup, MenuGroupLabel, MenuItem, MenuPopup, MenuRadioGroup, MenuRadioItem, MenuSeparator, MenuShortcut, MenuTrigger, } from "@/components/ui/menu";
import { ButtonGroup } from "@/components/ui/button-group"
import CreateModal from "./create-modal";
import { useState, type FC } from "react";
import { ArrowRightIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterProps {
    value: string;
    handleFilterChange: (filter: string) => void;
}

const Filter: FC<FilterProps> = ({ value, handleFilterChange }) => {
    const [tempSearch, setTempSearch] = useState(value);
    return (
        <div className="flex items-center gap-2 justify-between">
            <div className='flex items-center justify-between w-full'>
                <ButtonGroup>
                    <div className="col-span-full sm:col-span-3">
                        <div className="*:not-first:mt-2">
                            <div className="relative">
                                <Input
                                    className="peer ps-9 pe-9"
                                    id="search-value"
                                    placeholder="Search..."
                                    value={tempSearch}
                                    onChange={(e) => setTempSearch(e.target.value)}
                                    type="search"
                                />
                                <div

                                    className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                                    <SearchIcon size={16} />
                                </div>
                                <button
                                    onClick={() => {
                                        handleFilterChange(tempSearch)
                                    }}
                                    aria-label="Submit search"
                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                    type="submit"
                                >
                                    <ArrowRightIcon aria-hidden="true" size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </ButtonGroup>
            </div>

            <div className="flex items-center gap-2 ">
                <CreateModal />
            </div>

        </div>
    );
};

export default Filter;