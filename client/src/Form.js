import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { LOAD_COURIER_START } from "./types"
import { connect } from "react-redux";

const couriers = require('./config/couriers')


class CourierForm extends Component {
    
    initiateSubmit(e){
        e.preventDefault();
        let tracker_id = e.target.trackingCode.value;
        let tracking_type = e.target.selectCourier.value;
        this.props.onGetInfo(tracker_id, tracking_type)
    }

    render() {
        const list = Object.keys(couriers).map(function (o, i) {
            return (
                <option key={i} value={o}>{couriers[o].name}</option>
            );
        });
        return (
            <Row>
                <Col md={{ size: 4, offset: 2 }}>
                    <Form onSubmit={(e) => this.initiateSubmit(e)}>
                        <FormGroup>
                            <Label for="selectCourier">Select</Label>
                            <Input type="select" name="select" id="selectCourier">
                                {list}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="trackingCode">Text Area</Label>
                            <Input type="text" name="tracking_num" id="trackingCode" placeholder="Tracking Number" />
                        </FormGroup>
                        <Button type="submit" color="info">Submit</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetInfo: (tracker_id, tracking_type) => dispatch({ type: LOAD_COURIER_START, payload: { tracker_id, tracking_type} })
    };
};

export default connect(null, mapDispatchToProps)(CourierForm);