"use client";

import Link from "next/link";
import "./Navbar.css";
import { useAppSelector } from "@/app/hooks/hooks";

function Navbar({
  searchTerm,
  setSearchTerm,
  searchCategory,
  setSearchCategory,
}) {
  const cartItems = useAppSelector((state) => state.carter.items);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleSelect(e) {
    setSearchCategory(e.target.value);
  }

  return (
    <nav className="navbar">
      <Link href="/dashboard" className="logo">
        MyShop
      </Link>

      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <label>Filter By Category</label>
      <select id="select-field" value={searchCategory} onChange={handleSelect}>
        <option value="">All</option>
        <option value="beauty">Beauty</option>
        <option value="groceries">Groceries</option>
        <option value="Asian">Asian</option>
        <option value="Pakistani">Pakistani</option>
        <option value="Mexican">Mexican</option>
        <option value="Italian">Italian</option>
      </select>

      <Link href="/cart" className="cart-link">
        <button className="cart-btn">
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </Link>
    </nav>
  );
}

export default Navbar;
