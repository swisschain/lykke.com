import React from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import HeaderAccount from './HeaderAccount';
import {Grid, Row, Col} from 'react-styled-flexboxgrid';
import {rem} from 'polished';
import {AuthService} from "../authService";

const Header = styled.header`
  padding-top: ${rem('22px')};
  padding-bottom: ${rem('22px')};
  flex-shrink: 0;
  z-index: 200;
  
  @media all and (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: ${p => p.theme.colors.white};
    border-bottom: 1px solid ${p => p.theme.colors.greyLight};
  }
`;

const Wrapper = styled.div`
  flex-shrink: 0;
`;

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonUrl: '',
            loggedIn: null,
            user: {}
        };
    }
    componentDidMount() {
        this.authService = new AuthService();
        const self = this;
        this.authService.getUser().then(user => {
            if (user)  {
                this.setState({ user, loggedIn: true })
            } else {
                this.setState({ user: {}, loggedIn: false });
            }

        });
        this.authService.manager().events.addUserSignedOut(function () {
            self.setState({ user: {}, loggedIn: false });
        });
        this.authService.manager().events.addUserLoaded(function () {
            console.log("ovde");
            self.authService.login();
        })

    }
    handleLogin = () => {
        this.authService.login();
    };
    render() {
        return (
            <Header>
                <Wrapper as={Grid}>
                    <Row className="justify-content-between align-items-center">
                        <Col className="col-sm-auto">
                            <Nav menuHandler={this.props.menuHandler} isMenuOpen={this.props.isMenuOpen} handleLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>
                        </Col>
                        <Col className="col-sm-auto text-right d-none d-lg-block">
                            <HeaderAccount handleLogin={this.handleLogin} loggedIn={this.state.loggedIn}/>
                        </Col>
                    </Row>
                </Wrapper>
            </Header>
        )
    }
} ;
