import React, { useRef } from "react";

ProductListDesc.propTypes = {};

function ProductListDesc({ quantityFilteredProduct, handleChangeShowGrid, handleChangeSort }) {
    const btnRef = useRef(null);
    const handleClick = e => {
        const btnHasActive = btnRef.current.querySelector(".active");
        if (!e.target.closest("button.active")) {
            const btn = e.target.closest("button");
            btnHasActive.classList.remove("active");
            btn.classList.add("active");
            handleChangeShowGrid(btn.classList[0]);
        }
    };
    const handleSelectChange = e => {
        handleChangeSort(e.target.value);
    };
    return (
        <div className="productList__desc">
            <div ref={btnRef} className="productList__desc__btn">
                <button onClick={handleClick} className="grid active">
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M1 2.5A1.5 1.5 0 012.5 1h3A1.5 1.5 0 017 2.5v3A1.5 1.5 0 015.5 7h-3A1.5 1.5 0 011 5.5v-3zm8 0A1.5 1.5 0 0110.5 1h3A1.5 1.5 0 0115 2.5v3A1.5 1.5 0 0113.5 7h-3A1.5 1.5 0 019 5.5v-3zm-8 8A1.5 1.5 0 012.5 9h3A1.5 1.5 0 017 10.5v3A1.5 1.5 0 015.5 15h-3A1.5 1.5 0 011 13.5v-3zm8 0A1.5 1.5 0 0110.5 9h3a1.5 1.5 0 011.5 1.5v3a1.5 1.5 0 01-1.5 1.5h-3A1.5 1.5 0 019 13.5v-3z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
                <button className="stack" onClick={handleClick}>
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2.5 11.5A.5.5 0 013 11h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 7h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5zm0-4A.5.5 0 013 3h10a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>
            <p className="productList__desc__info">{quantityFilteredProduct} Products Found</p>
            <hr />
            <form className="productList__desc__sort sort">
                <label htmlFor="sort__select">sort by</label>
                <select
                    onChange={handleSelectChange}
                    name="sort__select"
                    id="sort__select"
                    className="sort__select"
                >
                    <option id="price__lowest" value="price__lowest">
                        price (lowest)
                    </option>
                    <option id="price__highest" value="price__highest">
                        price (highest)
                    </option>
                    <option id="name-az" value="name-az">
                        name (a - z)
                    </option>
                    <option id="name-za" value="name-za">
                        name (z - a)
                    </option>
                </select>
            </form>
        </div>
    );
}

export default ProductListDesc;
