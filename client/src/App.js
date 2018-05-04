import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import CourierForm from './Form'
import Header from './Header';
import { Row } from 'reactstrap';


class App extends Component {
  render() {
    const { loading, data } = this.props;
    return (
      <div className="App">
        <Container>
          <Header />
          <CourierForm />
          <Row style={{ "marginTop": 40 }}>
            {
              loading ?
                <FontAwesomeIcon size="4x" style={{ "margin": "0 auto" }} pulse icon={faSpinner} />
                : (
                    !!data && data.response ? data.status : "Something Went Wrong"
                  )
                
            }
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state.data,
    loading: state.loading
  }
}

export default connect(mapStateToProps)(App);
