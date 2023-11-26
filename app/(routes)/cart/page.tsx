// Importáljuk a Next.js Image komponenst az optimalizált képek kezeléséhez
import Image from "next/image";

// Importáljuk a toast és X komponenst a felhasználói visszajelzések és ikonok használatához
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

// Importáljuk az IconButton komponenst a gombbal támogatott műveletekhez
import IconButton from "@/components/ui/icon-button";

// Importáljuk a Currency komponenst az ár formázásához
import Currency from "@/components/ui/currency";

// Importáljuk a useCart hook-ot a kosárhoz kapcsolódó műveletek elvégzéséhez
import useCart from "@/hooks/use-cart";

// Importáljuk a Product típust az "@/types" modulból
import { Product } from "@/types";

// Az interface definiálja a CartItem komponens props-ait, ami egy 'data' objektumot vár
interface CartItemProps {
  data: Product;
}

// A CartItem komponens, amely a kapott 'data' objektum adatait jeleníti meg a bevásárlókosárban
const CartItem: React.FC<CartItemProps> = ({ data }) => {
  // A kosár hook inicializálása
  const cart = useCart();

  // A törlés funkciója, ami a kosárban lévő elemet eltávolítja
  const onRemove = () => {
    cart.removeItem(data.id);
    // Felugró értesítés a termék eltávolításáról
    toast.success("Termék eltávolítva a kosárból");
  };

  // A komponens JSX struktúrája
  return (
    <li className="flex py-6 border-b">
      {/* A termék képe */}
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>

      {/* A termék adatainak megjelenítése */}
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        {/* Törlés gomb */}
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<X size={15} />} />
        </div>

        {/* A termék neve és művésze */}
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">
              {data.artist} - {data.name}
            </p>
          </div>

          {/* A termék műfaja */}
          <div className="mt-1 flex text-sm">
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.genre.name}
            </p>
          </div>

          {/* A termék ára */}
          <Currency value={data.price} />
        </div>
      </div>
    </li>
  );
};

// Exportáljuk a CartItem komponenst, hogy más komponensek is használhassák
export default CartItem;
