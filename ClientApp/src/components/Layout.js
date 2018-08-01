import React, {Component} from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import { actionCreators } from '../store/Dashboard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Layout  extends Component {

    constructor(props) {
        super(props);
        this.props.isAuthorized();
    }

    render() {
        console.log(' LAYOUT : ', this.props);

        return (
            <Grid fluid>
                <Row>
                    <Col sm={3}>
                        <NavMenu/>
                    </Col>
                    <Col sm={9}>
                        {this.props.children}
                    </Col>
                </Row>
            </Grid>
        )
    }

}


export default connect(
    null,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(Layout);