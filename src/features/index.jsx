import { useEffect, useState } from "react";
import { LIMIT, PRODUCT_URL } from "../constant";
import Product from "./Product";

// sync to params

function Features() {
    const [categories, setCategories] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [listCompany, setListCompany] = useState([]);
    const [listProduct, setListProduct] = useState([]);
    const [totalProduct, settotalProduct] = useState([]);
    const [quantityFilteredProduct, setQuantityFilteredProduct] = useState(0);
    const [totalPage, setTotalPage] = useState(Math.ceil(totalProduct.length / LIMIT));

    const [priceValue, setPriceValue] = useState({
        minPrice: 0,
        maxPrice: 0,
    });
    const [filters, setFilters] = useState({
        categories: [],
        company: "",
        colors: "",
        price: 0,
        isFreeship: false,
        page: 1,
    });
    const [loading, setLoading] = useState(false);
    const handleChangeSort = sortValue => {
        // if else , const
        if (sortValue === "price__lowest") {
            listProduct.sort((a, b) => {
                if (a.price < b.price) return -1;
                if (a.price > b.price) return 1;
                return 0;
            });
            setListProduct(prevState => [...prevState]);
        }
        if (sortValue === "price__highest") {
            listProduct.sort((a, b) => {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
            });
            setListProduct(prevState => [...prevState]);
        }
        if (sortValue === "name-za") {
            listProduct.sort((a, b) => {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            });
            setListProduct(prevState => [...prevState]);
        }
        if (sortValue === "name-az") {
            listProduct.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
            setListProduct(prevState => [...prevState]);
        }
    };
    useEffect(() => {
        try {
            async function fetchProductData() {
                const result = await fetch(PRODUCT_URL);
                const data = await result.json();
                const listCategory = [...new Set(data.map(item => item.category))];
                const listCompany = [...new Set(data.map(item => item.company))];
                const allColor = data.map(item => item.colors);
                const listColor = [...new Set(allColor.flat(Infinity))];
                let minPrice = data[0].price;
                let maxPrice = 0;
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];
                    if (element.price > maxPrice) maxPrice = element.price;
                    if (element.price < minPrice) minPrice = element.price;
                }
                setPriceValue({ minPrice, maxPrice });
                setListProduct(data);
                setListColor(listColor);
                setQuantityFilteredProduct(data.length);
                setListCompany(listCompany);
                settotalProduct(data);
                setCategories(listCategory);
                setLoading(false);
            }
            fetchProductData();
        } catch (error) {
            throw new Error("Fail to fetch product");
        }
    }, []);

    const handleChangeFilterCategory = category => {
        setFilters(prevFilter => {
            const newListCategory = [...category];

            return {
                ...prevFilter,
                categories: newListCategory,
            };
        });
    };
    const handleChangeFilterCompany = company => {
        setFilters(prevFilter => {
            return {
                ...prevFilter,
                company,
            };
        });
    };
    const handleChangeFilterColor = colorId => {
        setFilters(prev => ({
            ...prev,
            colors: colorId,
        }));
    };
    const handleChangeFilterPrice = priceValue => {
        setFilters(prevFilter => {
            return {
                ...prevFilter,
                price: priceValue,
            };
        });
    };
    const handleChangeFilterFreeship = isFreeship => {
        setFilters(prevFilter => {
            return {
                ...prevFilter,
                isFreeship,
            };
        });
    };
    const handleClearFilters = () => {
        setFilters({
            categories: [],
            company: "",
            colors: "",
            price: 0,
            isFreeship: false,
            page: 1,
        });
    };
    useEffect(() => {
        const newListProduct = [...totalProduct];
        const listFilteredProduct = [];
        newListProduct.forEach(item => {
            let count = 0;
            // filter by categories
            if (filters.categories.length < 1) {
                count++;
            } else if (filters.categories.includes(item.category)) {
                count++;
            }
            // filter by colors
            if (item.colors.includes(filters.colors) || !filters.colors) {
                count++;
            }
            // filter by company
            if (!filters.company || filters.company === item.company) {
                count++;
            }
            // filter by price
            if (filters.price === 0 || filters.price >= item.price) {
                count++;
            }
            // filter by isFreeship
            if (!filters.isFreeship || item.shipping === filters.isFreeship) {
                count++;
            }
            if (count === 5) listFilteredProduct.push(item);
        });

        const start = (filters.page - 1) * LIMIT;
        const end = filters.page * LIMIT;
        const listProduct = listFilteredProduct.slice(start, end);

        setTotalPage(Math.ceil(listFilteredProduct.length / LIMIT));
        setQuantityFilteredProduct(listFilteredProduct.length);
        setListProduct(listProduct);
    }, [filters, totalProduct]);

    const handleSeachProduct = searchValue => {
        searchValue = searchValue.trim();
        setListProduct(totalProduct.filter((item, idx) => item.name.includes(searchValue)));
    };

    const handlePageChange = pageNumber => {
        setFilters(prevFilters => ({
            ...prevFilters,
            page: pageNumber,
        }));
    };
    return (
        <div className="Features">
            <Product
                priceValue={priceValue}
                listColor={listColor}
                categories={categories}
                listProduct={listProduct}
                listCompany={listCompany}
                totalPage={totalPage}
                loading={loading}
                setListProduct={setListProduct}
                quantityFilteredProduct={quantityFilteredProduct}
                handlePageChange={handlePageChange}
                handleClearFilters={handleClearFilters}
                handleSeachProduct={handleSeachProduct}
                handleChangeSort={handleChangeSort}
                handleChangeFilterCompany={handleChangeFilterCompany}
                handleChangeFilterColor={handleChangeFilterColor}
                handleChangeFilterCategory={handleChangeFilterCategory}
                handleChangeFilterPrice={handleChangeFilterPrice}
                handleChangeFilterFreeship={handleChangeFilterFreeship}
            />
        </div>
    );
}

export default Features;
