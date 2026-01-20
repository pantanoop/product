"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import ProductCard from "@/app/ProductCard/ProductCard";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { fetchProducts } from "@/app/redux/productSlice";
import "./home.css";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { productData, loading, total, skip, limit } = useAppSelector(
    (state) => state.productor,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    const fetchData = () => {
      dispatch(
        fetchProducts({
          limit,
          skip: (page - 1) * limit,
          searchTerm,
          searchCategory,
        }),
      );
    };
    const timer = setTimeout(fetchData, 1000);
    return () => clearTimeout(timer);
  }, [page, searchTerm, searchCategory]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
      />

      <div className="home">
        <h1>Available Products</h1>

        {loading ? (
          <p>Loading...</p>
        ) : productData.length > 0 ? (
          <div className="product-grid">
            {productData.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p>No products found</p>
        )}

        {totalPages > 1 && (
          <div className="pagination">
            <button onClick={handlePrev} disabled={page === 1}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={page === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
