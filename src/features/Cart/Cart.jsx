import React from "react";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import currencyFormater from "../../common/currencyFormater";
import "./Cart.scss";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "./cartSlice";
import { calTotalPrice, countCartItems } from "./useSelector";

Cart.propTypes = {};

function Cart(props) {
    const { cartItems } = useSelector(state => state.cart);
    console.log(cartItems);
    const totalQuantity = useSelector(countCartItems);
    const totalPrice = useSelector(calTotalPrice);

    const dispatch = useDispatch();
    const handleIncreaseItem = productId => {
        const action = increaseQuantity(productId);
        dispatch(action);
    };

    const handleDecreaseItem = productId => {
        const action = decreaseQuantity(productId);
        dispatch(action);
    };
    const handleClickRemoveItem = productId => {
        const action = removeFromCart(productId);
        dispatch(action);
    };
    return (
        <section className="cart">
            <div className="cart__total">
                <h2>Total</h2>
                <div className="cart__total__detail">
                    <table>
                        <thead>
                            <tr>
                                <td>Quantity</td>
                                <td>Price</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{totalQuantity}</td>
                                <td>${currencyFormater(totalPrice)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="cart__heading">
                <h5>item</h5>
                <h5>price</h5>
                <h5>quantity</h5>
                <h5>subtotal</h5>
                <span></span>
            </div>
            <hr />
            {cartItems.map(({ id, product, quantity }) => (
                <section key={id}>
                    <div className="cart__content">
                        <div className="cart__content__info info">
                            <div className="info__img">
                                <img src={product.image} alt="random" />
                            </div>
                            <div className="info__product">
                                <div className="info__product__name">{product.name}</div>
                                <div className="info__product__color">
                                    <span>Color: </span>
                                    {product.colors.map(color => (
                                        <p
                                            key={color}
                                            style={{
                                                backgroundColor: `${color}`,
                                                width: "15px",
                                                height: "15px",
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="cart__content__price">
                            ${currencyFormater(product.price)}
                        </div>
                        <div className="cart__content__quantity">
                            <button onClick={() => handleDecreaseItem(id)}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 448 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                            </button>
                            <h2>{quantity}</h2>
                            <button onClick={() => handleIncreaseItem(id)}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 448 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="cart__content__subtotal">
                            ${currencyFormater(product.price * quantity)}
                        </div>
                        <div className="cart__content__remove">
                            <button onClick={() => handleClickRemoveItem(id)}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 448 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <hr />
                </section>
            ))}
        </section>
    );
}

export default Cart;
