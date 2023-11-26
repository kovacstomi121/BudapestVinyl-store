"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import Summary from "./components/summary";
import CartItem from "./components/cart-item";

export const revalidate = 0;

const CartPage = () => {
  // Az `isMounted` állapot, hogy figyelje, hogy a komponens már el lett-e helyezve
  const [isMounted, setIsMounted] = useState(false);

  // A kosár állapot hook segítségével
  const cart = useCart();

  // Az `useEffect` hook az elhelyezést követően beállítja az `isMounted` állapotot
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Ha a komponens még nem helyezkedett el, a `null` értékkel tér vissza
  if (!isMounted) {
    return null;
  }

  // A kosár oldal megjelenítése
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Kosár</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {/* Ha a kosár üres, kiírja, hogy nincs benne elem */}
              {cart.items.length === 0 && (
                <p className="text-neutral-500">A kosár üres.</p>
              )}
              {/* Az elemek megjelenítése */}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            {/* A kosár összegzés komponensének megjelenítése */}
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default CartPage;
