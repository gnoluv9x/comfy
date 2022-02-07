import React from "react";
import Loading from "../../components/Loading/Loading";
import "./index.scss";
import ProductFilters from "./ProductFilters/ProductFilters";
import ProductList from "./ProductList/ProductList";

Product.propTypes = {};

function Product({
    categories,
    listProduct,
    handleChangeFilterCategory,
    listColor,
    listCompany,
    priceValue,
    totalPage,
    quantityFilteredProduct,
    handleChangeSort,
    handleClearFilters,
    handleChangeFilterColor,
    handleChangeFilterCompany,
    handleChangeFilterPrice,
    handleChangeFilterFreeship,
    handleSeachProduct,
    setListProduct,
    handlePageChange,
    loading,
}) {
    return loading ? (
        <Loading />
    ) : (
        <div className="product">
            <ProductFilters
                priceValue={priceValue}
                handleChangeFilterPrice={handleChangeFilterPrice}
                listColor={listColor}
                listCompany={listCompany}
                categories={categories}
                listProduct={listProduct}
                handleChangeFilterCompany={handleChangeFilterCompany}
                handleSeachProduct={handleSeachProduct}
                handleClearFilters={handleClearFilters}
                handleChangeFilterColor={handleChangeFilterColor}
                handleChangeFilterCategory={handleChangeFilterCategory}
                handleChangeFilterFreeship={handleChangeFilterFreeship}
            />
            <ProductList
                totalPage={totalPage}
                setListProduct={setListProduct}
                listProduct={listProduct}
                handleChangeSort={handleChangeSort}
                handlePageChange={handlePageChange}
                quantityFilteredProduct={quantityFilteredProduct}
            />
        </div>
    );
}

export default Product;
