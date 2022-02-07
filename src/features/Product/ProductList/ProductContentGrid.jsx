import PropTypes from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import currencyFormater from "../../../common/currencyFormater";
import { addToCart } from "../../Cart/cartSlice";

ProductContentGrid.propTypes = {
    listProduct: PropTypes.array,
};

function ProductContentGrid({ listProduct }) {
    const dispatch = useDispatch();
    const handleAddToCart = item => {
        const newItem = {
            id: item.id,
            product: { ...item },
            quantity: 1,
        };
        const action = addToCart(newItem);
        dispatch(action);
        toast.success("Success!", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };

    if (listProduct.length < 1) {
        return (
            <div className="productList__empty">
                <h5>Sorry, no products matched your search.</h5>
            </div>
        );
    } else {
        return (
            <div className="productList__content grid">
                {listProduct.map(product => {
                    const { id, image, name, price } = product;
                    return (
                        <div key={id} className="productList__content__item productDesc">
                            <div className="productDesc__img">
                                <img src={image} alt={name} />
                                <a className="link" href="/products/recQ0fMd8T0Vk211E">
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 512 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                    </svg>
                                </a>
                            </div>
                            <div className="productDesc__detail">
                                <h5 onClick={() => handleAddToCart(product)}>{name}</h5>
                                <p onClick={() => handleAddToCart(product)}>
                                    ${currencyFormater(price)}
                                </p>
                            </div>
                            <div onClick={() => handleAddToCart(product)} className="addToCart">
                                <button className="add-to-cart-button">
                                    <svg
                                        className="cart-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#795744"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>

                                    <span className="add-to-cart">Add to cart</span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default ProductContentGrid;
