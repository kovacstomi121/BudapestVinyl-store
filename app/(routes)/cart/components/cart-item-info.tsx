// Az interface definiálja a CartItemInfo komponens props-ait, ami egy 'product' objektumot vár
interface CartItemInfoProps {
  product: Record<string, any>; // Itt megadhatnánk pontosabban a 'product' típusát a Record helyett
}

// A CartItemInfo komponens, amely a kapott 'product' objektum adatait jeleníti meg
const CartItemInfo: React.FC<CartItemInfoProps> = ({ product }) => {
  return (
    <div>
      {/* A termék nevét jeleníti meg */}
      <div className="flex justify-between">
        <p className="text-sm font-semibold text-black">{product.name}</p>
      </div>

      {/* A termék műfaját jeleníti meg */}
      <div className="mt-1 flex text-sm">
        <p className="ml-4   pl-4 text-gray-500">{product.genre}</p>
      </div>

      {/* A termék árát jeleníti meg */}
      <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
    </div>
  );
};

// Exportáljuk a CartItemInfo komponenst, hogy más komponensek is használhassák
export default CartItemInfo;
