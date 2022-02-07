import React from "react";
import "./Path.scss";

Path.propTypes = {};

function Path({ pathName }) {
    pathName = pathName.replace("/", "");
    return (
        <section className="path">
            <div className="path__title">
                <h3>
                    <a href="/">Home </a>/ {pathName}
                </h3>
            </div>
        </section>
    );
}

export default Path;
