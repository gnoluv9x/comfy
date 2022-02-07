import React, { useEffect, useRef, useState } from "react";
import "./ProductFilters.scss";
import currencyFormater from "../../../common/currencyFormater";
ProductFilters.propTypes = {};

function ProductFilters({
    categories,
    handleChangeFilterCategory,
    handleChangeFilterCompany,
    handleChangeFilterColor,
    listColor,
    listCompany,
    priceValue,
    handleChangeFilterPrice,
    handleChangeFilterFreeship,
    handleClearFilters,
    handleSeachProduct,
}) {
    const [currentPrice, setCurrentPrice] = useState(0);
    const [isCheckAllCategory, setIsCheckAllCategory] = useState(false);
    const [checkedList, setCheckedList] = useState([]);
    const listBtn = useRef(null);
    const listColorBtn = useRef(null);
    const companyAll = useRef(null);
    const shippingEl = useRef(null);
    const priceRange = useRef(null);

    const handleClickCategory = e => {
        const targetEl = e.target;
        if (targetEl.checked) {
            setCheckedList(prev => {
                const newList = [...prev, targetEl.id];
                return newList.filter((item, idx) => newList.indexOf(item) === idx);
            });
        } else {
            setCheckedList(prev => {
                const newList = [...prev];
                if (newList.includes(targetEl.id)) {
                    return newList.filter(item => item !== targetEl.id);
                } else {
                    return newList;
                }
            });
        }
    };
    useEffect(() => {
        setCurrentPrice(priceValue.maxPrice);
    }, []);
    useEffect(() => {
        const allListCheckbox = listBtn.current.querySelectorAll("input:not(#all)");

        if (checkedList.length === categories.length) {
            setIsCheckAllCategory(true);
            allListCheckbox.forEach(checkbox => {
                checkbox.checked = true;
            });
        }
        if (checkedList.length === 0) {
            setIsCheckAllCategory(false);
            allListCheckbox.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        if (checkedList.length < categories.length) {
            setIsCheckAllCategory(false);
        }
        handleChangeFilterCategory(checkedList);
    }, [checkedList]);

    const handleClickAllCategory = e => {
        const targetEl = e.target;
        if (targetEl.checked) {
            setCheckedList(categories);
        } else {
            setCheckedList([]);
        }
    };
    const handleChangeCompany = e => {
        const companyId = e.target.value;
        if (companyId === "all") {
            handleChangeFilterCompany("");
        } else {
            handleChangeFilterCompany(companyId);
        }
    };
    const handleChangeColor = e => {
        const targetEl = e.target;
        const colorId = targetEl.id;
        const colorListBtn = listColorBtn.current.querySelectorAll("button");
        colorListBtn.forEach(color => {
            if (color.classList.contains("active")) color.classList.remove("active");
        });
        targetEl.classList.add("active");
        if (colorId === "all") {
            handleChangeFilterColor("");
        } else {
            handleChangeFilterColor(colorId);
        }
    };
    const handleChangePrice = priceValue => {
        handleChangeFilterPrice(priceValue);
    };
    const handleChangeFreeship = e => {
        handleChangeFilterFreeship(e.target.checked);
    };
    const handleClickClear = () => {
        const colorListBtn = listColorBtn.current.querySelectorAll("button");
        const colorAllBtn = listColorBtn.current.querySelector("button#all");

        handleClearFilters();
        setCurrentPrice(priceValue.maxPrice);
        setIsCheckAllCategory(false);
        setCheckedList([]);
        companyAll.current.selectedIndex = 0;
        colorListBtn.forEach(color => {
            if (color.classList.contains("active")) color.classList.remove("active");
        });
        colorAllBtn.classList.add("active");

        shippingEl.current.checked = false;
        priceRange.current.value = priceValue.maxPrice;
    };
    const handleChangeSearchValue = e => {
        const searchValue = e.target.value;
        handleSeachProduct(searchValue);
    };
    return (
        <div className="productFilters">
            <div className="productFilters__search">
                <input
                    type="text"
                    onChange={handleChangeSearchValue}
                    placeholder="search"
                    className="productFilters__search__input"
                />
            </div>
            <div className="productFilters__category">
                <h5>category</h5>
                <div ref={listBtn} className="productFilters__category__btn listBtn">
                    <div className="listBtn__item">
                        <input
                            checked={isCheckAllCategory}
                            onChange={handleClickAllCategory}
                            id="all"
                            type="checkbox"
                        />
                        <label htmlFor="all">all</label>
                    </div>
                    {categories.map((category, idx) => {
                        return (
                            <div key={idx} className="listBtn__item">
                                <input
                                    onChange={handleClickCategory}
                                    id={category}
                                    type="checkbox"
                                />
                                <label htmlFor={category}>{category}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="productFilters__company">
                <h5>company</h5>
                <select
                    onChange={handleChangeCompany}
                    ref={companyAll}
                    className="productFilters__company__select"
                >
                    <option id="all" value="all">
                        all
                    </option>
                    {listCompany.map((company, idx) => (
                        <option key={idx} id={idx} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>
            <div className="productFilters__color">
                <h5>colors</h5>
                <div ref={listColorBtn} className="productFilters__color__btn colorBtn">
                    <button onClick={handleChangeColor} id="all" className="colorBtn__all active">
                        all
                    </button>
                    {listColor.map((color, idx) => {
                        return (
                            <button
                                onClick={handleChangeColor}
                                key={idx}
                                id={color}
                                className="colorBtn__item"
                                style={{ backgroundColor: `${color}` }}
                            >
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 512 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                </svg>
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="productFilters__price">
                <h5>price</h5>
                <p className="productFilters__price__info">${currencyFormater(currentPrice)}</p>
                <input
                    onChange={e => {
                        setCurrentPrice(e.target.value);
                        setTimeout(() => {
                            const value = e.target.value;
                            handleChangePrice(value);
                        }, 1000);
                    }}
                    type="range"
                    min={priceValue.minPrice}
                    max={priceValue.maxPrice}
                    ref={priceRange}
                />
            </div>
            <div className="productFilters__freeship">
                <label htmlFor="shipping">free shipping</label>
                <input
                    onChange={handleChangeFreeship}
                    ref={shippingEl}
                    type="checkbox"
                    id="shipping"
                />
            </div>
            <button onClick={handleClickClear} className="productFilters__filterBtn">
                clear filters
            </button>
        </div>
    );
}

export default ProductFilters;
