import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { DEFAULT_PAGE } from "../../../constant";
import "./Pagination.scss";
Pagination.propTypes = {};
function Pagination({ totalPage, handlePageChange }) {
    const listPagination = [];
    for (let i = 1; i <= totalPage; i++) {
        listPagination.push(i);
    }
    const [pageNumber, setPageNumber] = useState(DEFAULT_PAGE);

    const handlePrevPage = () => {
        setPageNumber(prev => {
            if (prev > 1) {
                return prev - 1;
            }
            return prev;
        });
    };
    const handleChoosePage = number => {
        setPageNumber(number);
    };
    const handleNextPage = () => {
        setPageNumber(prev => {
            if (prev < totalPage) {
                return prev + 1;
            }
            return prev;
        });
    };
    useEffect(() => {
        handlePageChange(pageNumber);
    }, [pageNumber]);

    return (
        <ul className="pagination">
            <li
                className={classNames("pagination__item", { disable: pageNumber <= 1 })}
                onClick={handlePrevPage}
            >
                Prev
            </li>
            {listPagination.map((pagination, index) => (
                <li
                    className={classNames("pagination__item", {
                        active: pagination === pageNumber,
                    })}
                    onClick={() => handleChoosePage(pagination)}
                    key={index}
                >
                    {pagination}
                </li>
            ))}
            <li
                className={classNames("pagination__item", { disable: pageNumber === totalPage })}
                onClick={handleNextPage}
            >
                Next
            </li>
        </ul>
    );
}

export default Pagination;
