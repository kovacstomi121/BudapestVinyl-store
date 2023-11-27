//Kosárösszegző összefoglaló

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";

// A Summary komponens definíciója
const Summary = () => {
  // URL-paraméterek lekérése
  const searchParams = useSearchParams();

  // Kosár elemeinek és eltávolító funkciójának lekérése a hook-ból
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  // useEffect hook a komponens életciklusának követésére
  useEffect(() => {
    // Ellenőrzi, hogy a "success" paraméter szerepel-e az URL-ben
    if (searchParams.get("success")) {
      // Sikeres fizetés esetén értesítés megjelenítése és az összes elem eltávolítása a kosárból
      toast.success("Fizetés sikeres.");
      removeAll();
    }

    // Ellenőrzi, hogy a "canceled" paraméter szerepel-e az URL-ben
    if (searchParams.get("canceled")) {
      // Sikertelen fizetés esetén hibaüzenet megjelenítése
      toast.error("Valami hiba történt.");
    }
  }, [searchParams, removeAll]);

  // Kosárban található elemek összértékének kiszámítása
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // Fizetés gombra kattintás esetén kiváltódó eseménykezelő
  const onCheckout = async () => {
    // Szerverrel történő kommunikáció a fizetési tranzakció indításához
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    // Átirányítás a szerver által válaszolt URL-re (fizetési oldal)
    window.location = response.data.url;
  };

  // JSX elemekkel elkészített összegző komponens visszaadása
  return (
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
      style={{ backgroundColor: "#99B080" }}
    >
      <h2 className="text-lg font-medium text-gray-900">Összesen</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">
            Teljes összeg:
          </div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Fizetés
      </Button>
    </div>
  );
};

// Komponens exportálása
export default Summary;
