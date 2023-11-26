"use client";

import { useEffect, useState } from "react";

import PreviewModal from "@/components/preview-modal";

// A ModalProvider komponens definíciója
const ModalProvider = () => {
  // Az isMounted állapot hook bevezetése, alapértelmezett értékkel: false
  const [isMounted, setIsMounted] = useState(false);

  // Az useEffect hook használata a komponens mount eseményének követésére
  useEffect(() => {
    // Amikor a komponens mount-olódik, beállítja az isMounted értékét true-ra
    setIsMounted(true);
  }, []);

  // Ha a komponens még nincs mount-olva, null-t térít vissza
  if (!isMounted) {
    return null;
  }

  // Ha a komponens már mount-olva van, megjeleníti a PreviewModal komponenst
  return (
    <>
      <PreviewModal />
    </>
  );
};

export default ModalProvider;
