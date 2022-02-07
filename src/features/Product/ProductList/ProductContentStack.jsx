import React from "react";

import currencyFormater from "../../../common/currencyFormater";
ProductContentStack.propTypes = {};

function ProductContentStack({ listProduct }) {
    return (
        <div className="productList__content stack">
            {listProduct.map(({ id, image, name, price, description }) => (
                <article key={id} className="productInfo">
                    <img src={image} alt={name} />
                    <div className="productInfo__detail">
                        <h4>{name}</h4>
                        <h5 className="productInfo__detail__price">${currencyFormater(price)}</h5>
                        <p className="productInfo__detail__desc">{`${description.substring(
                            0,
                            150
                        )} ...`}</p>
                        <a className="productInfo__detail__btn" href="/products/recroK1VD8qVdMP5H">
                            Details
                        </a>
                    </div>
                </article>
            ))}
        </div>
    );
}

export default ProductContentStack;
