import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";


import CompareArrows from "@mui/icons-material/CompareArrows";
import History from "@mui/icons-material/History";
import CallSplit from "@mui/icons-material/CallSplit";
import ShowChart from "@mui/icons-material/ShowChart";
import Settings from "@mui/icons-material/Settings";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

// Valid Data COLOR is data-color="purple | azure | green | orange | danger"
// data-background-color: red-white-black
const MENU_ITEMS = [
  // {url: '/covert/new', exact: true, title: 'Create Covert Address', icon: 'call_split', iconClass:'material-icons'},
    {url: '/mix/active', exact: false, title: 'Active Mixes', icon: (<CompareArrows />), iconClass: 'material-icons'},
    {url: '/mix/history', exact: false, title: 'Mixing History', icon: (<History />), iconClass: 'material-icons'},
    {url: '/covert/', exact: false, title: 'Covert Address', icon: (<CallSplit />), iconClass: 'material-icons'},
    {url: '/ring', exact: true, title: 'Ring Statistics', icon: (<ShowChart />), iconClass: 'material-icons'},
    {url: '/settings', exact: true, title: 'Configuration', icon: (<Settings />), iconClass: 'material-icons'},
    {url: '/', exact: true, title: 'About', icon: (<InfoOutlined />), iconClass: 'material-icons'},
    {url: '/shutdown', exact: true, title: 'Shutdown', icon: (<PowerSettingsNew />), iconClass: 'material-icons'},
    // {url: '/swagger', external: true, title: 'Swagger', icon: 'local_library', iconClass:'material-icons'},
  ]
const navigation = (props) => {
    return (
        <div className="sidebar" data-color="orange" data-background-color="black">
            <div className="logo">
                <div className="logo-tim"/>
                <a href="/" className="simple-text logo-normal">
                    Ergo Mixer
                    <span className="version">{props.info.versionMixer}</span>
                </a>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    {MENU_ITEMS.map((item, index) => (
                        <li className="nav-item" key={index}>
                            {/* <NavLink className="nav-link" to={item.url} exact={item.exact}> */}
                            <NavLink className="nav-link" to={item.url} exact={item.exact}>
                                <i className={item.iconClass}>{item.icon}</i>
                                <p>{item.title}</p>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sidebar-background sidebar-background-5"/>
        </div>
    )
};

const mapStateToProps = state => ({
    info: state.info,
});


export default connect(mapStateToProps)(navigation);
