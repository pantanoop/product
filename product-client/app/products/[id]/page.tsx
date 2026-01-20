"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { fetchProductById } from "../../redux/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import "./detail.css";

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const {
    selectedProduct: product,
    loading,
    error,
  } = useAppSelector((state) => state.productor);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id as string));
    }
  }, [id, dispatch]);

  if (loading) return <h2 className="pd-loading">Loading...</h2>;
  if (error) return <h2>{error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-detail">
      <Link href="/dashboard">
        <button className="back-btn">⬅ Back to Home</button>
      </Link>

      <div className="product-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-img"
        />

        <div className="product-info">
          <h1>{product.title}</h1>
          <p className="product-desc">{product.description}</p>

          <h2>$ {product.price}</h2>
          <p>
            ⭐ {product.rating} | Stock: {product.stock}
          </p>

          <p>
            <b>Category:</b> {product.category}
          </p>
          <p>
            <b>Brand:</b> {product.brand}
          </p>

          <button className="add-cart-btn">Add to Cart 🛒</button>
        </div>
      </div>
    </div>
  );
}
