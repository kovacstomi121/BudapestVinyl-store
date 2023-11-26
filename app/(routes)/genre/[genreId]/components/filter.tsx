"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Genre } from "@/types";

// Az interface definiálja a Filter komponens props-ait, ami egy 'data' tömböt, egy 'name' nevet, és egy 'valueKey' kulcsot vár
interface FilterProps {
  data: Genre[];
  name: string;
  valueKey: string;
}

// A Filter komponens, amely lehetővé teszi a felhasználó számára a szűrők alkalmazását és eltávolítását
const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  // Az aktuális lekérdezési paraméterek
  const searchParams = useSearchParams();

  // A useRouter hook segítségével elérhetjük a következő navigációs műveleteket
  const router = useRouter();

  // Az aktuálisan kiválasztott szűrő értéke
  const selectedValue = searchParams.get(valueKey);

  // A szűrőre kattintáskor végrehajtott művelet
  const onClick = (id: string) => {
    // Az aktuális lekérdezési paraméterek kiolvasása
    const current = qs.parse(searchParams.toString());

    // Az új lekérdezési paraméterek létrehozása, beleértve az új szűrőt is
    const query = {
      ...current,
      [valueKey]: id,
    };

    // Ha a jelenlegi szűrő ugyanaz, mint az új, akkor töröljük a szűrőt
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    // Az új URL létrehozása a qs.stringifyUrl segítségével
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    // A navigáció a frissített URL-re
    router.push(url);
  };

  // A szűrő törlése művelet
  const clearFilter = () => {
    // Az aktuális lekérdezési paraméterek kiolvasása
    const current = qs.parse(searchParams.toString());

    // Ha van ilyen szűrő, akkor töröljük
    if (current[valueKey]) {
      delete current[valueKey];
      const url = qs.stringifyUrl(
        {
          url: window.location.href,
          query: current,
        },
        { skipNull: true }
      );

      // A navigáció a frissített URL-re
      router.push(url);
    }
  };

  // A komponens JSX struktúrája
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold">{name}</h3>
      <hr className="my-4" />
      <div className="flex flex-wrap gap-2">
        {/* A szűrő elemek megjelenítése */}
        {data.map((filter) => (
          <div key={filter.id} className="flex items-center">
            <Button
              className={cn(
                "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-black text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name}
            </Button>
          </div>
        ))}

        {/* A kiválasztott szűrő törlése gomb */}
        {selectedValue && (
          <div className="flex items-center">
            <Button
              className="rounded-md text-sm p-2 bg-red-500 text-white"
              onClick={clearFilter}
            >
              Törölje a szűrést
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Exportáljuk a Filter komponenst, hogy más komponensek is használhassák
export default Filter;
