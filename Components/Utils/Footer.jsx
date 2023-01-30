import React from "react";

const Footer = ({fullFooter}) => {
    return (
        <>
            <footer className="footer" style={{ left:`${(fullFooter) ? 0 : 250}` }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            2023 © Invedo.
                        </div>
                        <div className="col-sm-6">
                            <div className="text-sm-end d-none d-sm-block">
                                Design & Develop by Invedo
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer