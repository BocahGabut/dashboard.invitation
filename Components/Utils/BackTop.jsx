import React from "react";

const BackTop = () => {
    return (
        <>
            <button onClick={(e) => topFunction()} className="btn btn-danger btn-icon" id="back-to-top">
                <i className="ri-arrow-up-line"></i>
            </button>
        </>
    )
}

export default BackTop