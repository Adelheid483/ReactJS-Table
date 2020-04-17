import React, {Component} from 'react';
import classes from './DetailsPage.module.css'

export default class DetailsPage extends Component {

    goToTable = () => {
        this.props.history.push('/clients/');
    };

    render () {
        return (
            <div className={classes.details}>

                <div className={classes.client}>
                    <h3>Client details {this.props.match.params.id}:</h3>

                    <div className={classes.clientRow}>
                        <b>User name: </b> <p>{this.props.location.state.name}</p>
                    </div>
                    <div className={classes.clientRow}>
                        <b>Description:</b> <em>{this.props.location.state.description}</em>
                    </div>
                    <div className={classes.clientRow}>
                        <b>Home address:</b> <p>{this.props.location.state.address}</p>
                    </div>
                    <div className={classes.clientRow}>
                        <b>City:</b> <p>{this.props.location.state.city}</p>
                    </div>
                    <div className={classes.clientRow}>
                        <b>Region/state:</b> <p>{this.props.location.state.state}</p>
                    </div>
                    <div className={classes.clientRow}>
                        <b>Post code:</b> <p>{this.props.location.state.zip}</p>
                    </div>
                </div>

                <div>
                    <button className='btn btn-primary' onClick={this.goToTable}>Back to list</button>
                </div>

            </div>
        )
    }
};

