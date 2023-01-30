import dynamic from "next/dynamic";
import React, { Component } from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { isMobile } from 'react-device-detect';

import { convertDateToString } from "../../Services/utils";
const IconsI = dynamic(() => import('./Icons'), { ssr: false })

class InputDateRange extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showDate: false,
            picker: true,
            date: (this.props.defaultValue) ? new Date(this.props.defaultValue) : new Date(),
            selectionRange : {
                startDate: (this.props.defaultValue) ? new Date(this.props.defaultValue) : new Date(),
                endDate: (this.props.defaultValue) ? new Date(this.props.defaultValue) : new Date(),
                key: 'selection',
            }
        }
        if(this.props.dates) (this.props.defaultValue) ? this.props.dates(new Date(new Date(this.props.defaultValue).toISOString()).getTime() + 7 * 60 * 60 * 1000) : this.props.dates(new Date(new Date().toISOString()).getTime() + 7 * 60 * 60 * 1000)
    }

    componentDidMount() {
        window.addEventListener('click',()=> {
            const elementDate = document.querySelector('.range-wrapper.show')
            if (elementDate) {
                const isClickInside = elementDate.contains(event.target)
                if (!isClickInside) {
                    this.setState({
                        showDate:false
                    })
                }
            }
        })

    }

    showHideDate = (stat) => {
        setTimeout(() => {
            if (!stat)
                this.setState({showDate:false,picker:true})
            else
                this.setState({showDate:true,picker:false})
        }, 350);
    }

    handleSelect = dates => {
        this.setState({
            date: dates.selection.startDate,
            selectionRange: {
                ...this.state.selectionRange,
                startDate: dates.selection.startDate,
                endDate: dates.selection.startDate
            },
            picker:true
        })
        this.showHideDate(false)

        if(this.props.dates) this.props.dates(new Date(new Date(dates.selection.startDate).toISOString()).getTime() + 7 * 60 * 60 * 1000)
    }

    render() {
        return (
            <>
                <div className="wrapper-date-range">
                    <div className="input-range-wrapper">
                        <input
                            value={convertDateToString(this.state.date)}
                            onChange={(e) => e}
                            className="form-control"
                            onFocus={(e) => { this.props.onFocus(), this.showHideDate(true) }}
                        />
                        <div className="icons-range">
                            <IconsI icons='fa-duotone fa-calendar-days' />
                        </div>
                    </div>
                    {
                        (!this.state.showDate) ? ''
                            :
                        <div className={`range-wrapper ${(this.state.showDate) ? 'show' : ''}`} style={{ ...this.props.style }}>
                            <div className="box-wrapper">
                                <DateRangePicker
                                    onFocus={(e) => setShowDate(true)}
                                    minDate={new Date()}
                                    showMonthAndYearPickers={false}
                                    moveRangeOnFirstSelection={true}
                                    staticRanges={[]}
                                    inputRanges={[]}
                                    months={(isMobile) ? 1 : 2}
                                    direction="horizontal"
                                    ranges={[this.state.selectionRange]}
                                    onChange={this.handleSelect}
                                    showDateDisplay={false}
                                />
                            </div>
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default InputDateRange