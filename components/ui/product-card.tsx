"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

// Az interfész deklarációja a ProductCard komponens számára, amely  termék adatait várja props-ként.
interface ProductCard {
  data: Product;
}

// A ProductCard komponens deklarációja.
const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal(); // Preview modal hook inicializálása.
  const cart = useCart(); // Kosárkezeléshez tartozó hook inicializálása.
  const router = useRouter(); // Next.js useRouter hook inicializálása az útvonalkezeléshez.

  // A kártya click eseménykezelője, átirányítja a felhasználót a termék részletes nézetére.
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  // A kép előnézet gomb click eseménykezelője, megnyitja a termék előnézeti modalt.
  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  // A kosárba helyezés gomb click eseménykezelője, hozzáadja a terméket a kosárhoz.
  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  // A termékkártya JSX struktúrája.
  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl  space-y-4"
      style={{ backgroundColor: "#99B080" }}
    >
      {/* Képek */}
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Leírás */}
      <div>
        <p className="font-semibold text-lg">
          {data.artist} - {data.name}
        </p>
        <p className="text-sm text-black"> {data.genre.name}</p>
      </div>
      {/* Árak */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
