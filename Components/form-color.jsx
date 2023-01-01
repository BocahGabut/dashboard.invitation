import React, { Component } from "react";
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';

class FormColor extends Component{
    constructor(props) {
        super(props)
        // this.colorValue = props.colorValue
        // this.callBack = props.callBack
        this.state = {
            showPicker: false,
            color: props.colorDefault
        };
    }

    onClick = () => {
        this.setState({
          showPicker: !this.state.showPicker
        })
    };

    onClose = () => {
      this.setState({
        showPicker: false
      })
        this.props.colorValue(this.state.color)
        setTimeout(() => {
            // (this.props.callBack()) ? this.props.callBack() : {}
        }, 250);
    };

    onChange = (color) => {
        this.setState({
          color: color.rgb
        })
    };

    render() {

        const styles = reactCSS({
            'default': {
            color: {
                width: '100px',
                height: '50px',
                borderRadius: '3px',
                cursor:'pointer',
                background: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
                boxShadow: '0 0 5px rgb(0 0 0 / 20%)',
            },
            popover: {
                position: 'absolute',
                zIndex: '3',
                top: '80px',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
            swatch: {
                padding: '6px',
                background: '#ffffff',
                borderRadius: '2px',
                cursor: 'pointer',
                display: 'inline-block',
                boxShadow: '0 0 0 1px rgba(0,0,0,.2)',
            },
            },
        });

        return (
            <>
                <div className={styles.swatch} onClick={ this.onClick }>
                    <div style={ styles.color } />
                </div>
                 { this.state.showPicker ? <div style={ styles.popover }>
                    <div style={ styles.cover } onClick={ this.onClose }/>
                        <SketchPicker color={ this.state.color } onChange={ this.onChange } />
                    </div> : null
                }
            </>
        )
    }
}

export default FormColor