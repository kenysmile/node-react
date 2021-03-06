import React, {Fragment, useEffect} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import DashboardAction from "./DashboardAction";
import Experience from "./Experience";
import Education from "./Education";
import {getCurrentProfile, deleteAccount} from "../../actions/profile";
import CreateProfile from '../profile_forms/CreateProfile';

const Dashboard = ({getCurrentProfile, deleteAccount, auth: {user}, profile: {profile, loading}}) => {
    useEffect(
        () => {
            getCurrentProfile();
        }, [
            getCurrentProfile
        ]
    );
    console.log('profile: ' + profile)
    console.log('user: ' + {user})
    return (
        <section className="container">
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome {user && user.name}
            </p>
            {
                profile !== null ?
                    <Fragment>
                        <DashboardAction/>
                        <Experience experience={profile.experiences}/>
                        <Education education={profile.education}/>
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={() => deleteAccount()}>
                                <i className="fas fa-user-minus"/> Delete My Account
                            </button>
                        </div>
                    </Fragment>
                    :
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
            }
        </section>
    );
};


Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(
    mapStateToProps,
    {
        getCurrentProfile,
        deleteAccount
    }
)(Dashboard);