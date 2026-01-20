"use client";

import "./cart.css";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { increaseQty, decreaseQty } from "@/app/redux/cartSlice";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.carter.items);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart">
      <h1>🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.thumbnail} alt={item.title} className="cart-img" />

              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>$ {item.price}</p>

                <div className="cart-qty">
                  <button onClick={() => dispatch(decreaseQty(item.id))}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => dispatch(increaseQty(item.id))}>
                    +
                  </button>
                </div>
              </div>

              <h4>$ {(item.price * item.quantity).toFixed(2)}</h4>
            </div>
          ))}

          <h2 className="cart-total">Total: $ {totalPrice.toFixed(2)}</h2>
        </>
      )}
      <Link href="/dashboard" className="cart-link">
        <button className="cart-btn">Home</button>
      </Link>
    </div>
  );
}
