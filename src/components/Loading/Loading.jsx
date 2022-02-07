import React from "react";
import "./Loading.scss";

Loading.propTypes = {};

function Loading(props) {
    return (
        <div className="loading">
            <div className="line-loading"></div>
        </div>
    );
}

export default Loading;
