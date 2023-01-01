import dynamic from "next/dynamic";
import React from "react";

const IconsI = dynamic(() => import('./Icons'), { ssr: false })

const PremiumFeature = () => {
    return (
        <>
            <div className="position-absolute d-flex flex-column justify-content-center align-items-center"
                style={{ top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", background: "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.5) 50%)", zIndex: 1 }}
                data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Upgrade paket atau beli tambahan untuk membuka fitur ini">
                <div className="text-muted mb-2">
                    <IconsI icons='far fa-gem fa-fw text-info' /> Fitur Premium
                </div>
                <a href="/packages?mode=addon" className="btn btn-outline-primary btn-sm stretched-link">
                    Upgrade
                </a>
            </div>
        </>
    )
}

export default PremiumFeature