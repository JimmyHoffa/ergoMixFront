import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Mix from "../pages/mix/Mix";
import Ring from "../pages/ring/Ring";
import Stat from '../pages/stat/Stat';
import StatDetail from "../pages/stat/stat_detail/StatDetail";
import {loadInfoAsync, loadMixLevelAsync, loadRingsAsync} from "../store/action";
import 'react-notifications/lib/notifications.css';
import './App.css';
import { connect } from "react-redux";
import { NotificationContainer } from 'react-notifications';
import ActiveStat from "../pages/stat/active/ActiveStat";
import ActiveStatDetail from "../pages/stat/active/stat_detail/ActiveStatDetail";
import Settings from "../pages/settings/Settings";

class App extends React.Component {
    componentDidMount = () => {
        this.props.getMixLevel();
        this.props.getRings();
        this.props.getInfo();
    };

    render = () => {
        return (
            <BrowserRouter basename={"dashboard"}>
                <NotificationContainer/>
                <Switch>
                    <Route path="/mix" component={Mix}/>
                    <Route path="/stat/active/:groupId" component={ActiveStatDetail}/>
                    <Route path="/stat/active" component={ActiveStat}/>
                    <Route path="/stat/history/:groupId" component={StatDetail}/>
                    <Route path="/stat/history" component={Stat}/>
                    <Route path="/ring" component={Ring}/>
                    <Route path="/settings" component={Settings}/>
                    <Redirect to="/mix"/>
                </Switch>
            </BrowserRouter>
        )
    };
}

const mapStateToProps = () => ({});


const mapDispatchToProps = dispatch => {
    return {
        getMixLevel: () => dispatch(loadMixLevelAsync()),
        getRings: () => dispatch(loadRingsAsync()),
        getInfo: () => dispatch(loadInfoAsync()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
