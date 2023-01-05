import React, { useEffect } from "react";

import Chart from 'chart.js/auto';

const ChartComponent = ({ data, dataLabel, canvasChart, typeChart, fill, animation, tension, stacked, horizontal }) => {
    const dataSetDb = []
    data.map((row, i) => {
        dataSetDb.push({
            label: row.label,
            data: row.data.map(rowData => rowData.data),
            fill: (fill) ? fill : false,
        })
    })
    const chartReferral = () => new Chart(
        document.getElementById(canvasChart),
        {
            type: (typeChart) ? typeChart : 'line',
            options: {
                animation,
                plugins: {
                    legend: {
                        display: true,
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: (horizontal) ? 'y' : 'x',
                elements: {
                    bar: {
                        borderWidth: 2,
                    }
                },
                scale: {
                    x: {
                        stacked: (stacked) ? stacked : false,
                    },
                    y: {
                        stacked: (stacked) ? stacked : false
                    }
                },
                tension: (tension) ? tension : 0
            },
            data: {
                labels: dataLabel,
                datasets:dataSetDb
            }
        }
    );
    useEffect(() => {
        chartReferral()
    }, []);
    return (
        <>
            <canvas id={canvasChart} className="canvas-chart" />
        </>
    )
}

export default ChartComponent