import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";
import ProductContentGrid from "./ProductContentGrid";
import ProductContentStack from "./ProductContentStack";
import "./ProductList.scss";
import ProductListDesc from "./ProductListDesc";
ProductList.propTypes = {};

function ProductList({
    listProduct,
    handleChangeSort,
    setListProduct,
    totalPage,
    handlePageChange,
    quantityFilteredProduct,
}) {
    const [isGrid, setIsGrid] = useState(true);
    const handleChangeShowGrid = status => {
        setIsGrid(status === "grid");
    };
    return (
        <div className="productList">
            <ProductListDesc
                quantityFilteredProduct={quantityFilteredProduct}
                handleChangeShowGrid={handleChangeShowGrid}
                handleChangeSort={handleChangeSort}
            />
            {isGrid ? (
                <ProductContentGrid listProduct={listProduct} />
            ) : (
                <ProductContentStack listProduct={listProduct} />
            )}
            <Pagination
                totalPage={totalPage}
                setListProduct={setListProduct}
                listProduct={listProduct}
                handlePageChange={handlePageChange}
            />
        </div>
    );
}

export default ProductList;
