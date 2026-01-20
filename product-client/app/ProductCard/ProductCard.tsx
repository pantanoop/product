"use client";

import Link from "next/link";
import "./ProductCard.css";
import { useAppDispatch } from "@/app/hooks/hooks";
import { addToCart } from "@/app/redux/cartSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>

      <p>$ {product.price}</p>

      <button
        className="add-cart-btn"
        onClick={() => dispatch(addToCart(product))}
      >
        Cart 🛒
      </button>

      <Link href={`/products/${product.id}`}>
        <button className="details-btn">View Details</button>
      </Link>
    </div>
  );
}
