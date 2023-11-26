"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import IconButton from "@/components/ui/icon-button";
import { Button } from "@/components/ui/button";
import { Genre } from "@/types";

// Az importált Filter komponens importálása a szűrők kezeléséhez
import Filter from "./filter";

// Az interface definiálja a MobileFilters komponens props-ait, ami egy 'genres' tömböt vár
interface MobileFiltersProps {
  genres: Genre[];
}

// A MobileFilters komponens, amely a mobil szűrők megjelenítéséért felelős
const MobileFilters: React.FC<MobileFiltersProps> = ({ genres }) => {
  // A mobil szűrők dialógus állapotának kezelése
  const [open, setOpen] = useState(false);

  // A dialógus megnyitásáért felelős funkció
  const onOpen = () => setOpen(true);

  // A dialógus bezárásáért felelős funkció
  const onClose = () => setOpen(false);

  // A komponens JSX struktúrája
  return (
    <>
      {/* Mobil szűrők gomb */}
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Szűrők
        <Plus size={20} />
      </Button>

      {/* Mobil szűrők dialógus */}
      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Háttérszín */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialógus pozíció */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Összecsukás gomb */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>

            {/* Szűrők megjelenítése */}
            <div className="p-4">
              <Filter valueKey="genreId" name="Genres" data={genres} />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

// Exportáljuk a MobileFilters komponenst, hogy más komponensek is használhassák
export default MobileFilters;
