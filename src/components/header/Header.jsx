import { getName } from "@tauri-apps/api/app";
import { Component, useState } from "react";
import { render } from "react-dom";


export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { name: null };
       
        this.getAppName = async () => {
            const name = await getName()
            this.setState({name})
        }
        this.getAppName();
    }

    
    
    render() {
        const {name} = this.state;
        return (
            <span {...this.props}>{name}</span>
        )
    }
}