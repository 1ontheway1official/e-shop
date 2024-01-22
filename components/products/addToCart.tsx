"use client";

import useCartService from "@/libs/hooks/useCartStore";
import { OrderItem } from "@/libs/models/OrderModel";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AddToCart({ item }: { item: OrderItem }) {
  const router = useRouter();
  const { items, increase, decrease } = useCartService();
  const [existItem, setExistItem] = useState<OrderItem | undefined>();

  useEffect(() => {
    setExistItem(items.find((x) => x.slug === item.slug));
  }, [item, items]);

  const addToCartHandler = () => {
    increase(item);
  };

  return existItem ? (
    <div>
      <button className="btn" onClick={() => decrease(existItem)}>
        -
      </button>
      <span className="px-2">{existItem.qty}</span>
      <button className="btn" onClick={() => increase(existItem)}>
        +
      </button>
    </div>
  ) : (
    <button className="btn btn-primary w-full" onClick={addToCartHandler}>
      Add to Cart
    </button>
  );
}
