import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";
import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.actions";
import CheckoutPage from "./pages/checkout/checkout.component";
import SigninAndSignupPage from "./pages/signin-signup/signin-signup.component";
import "./App.css";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/shop" component={ ShopPage } />
          <Route exact path="/" component={ HomePage } />
          <Route exact path="/checkout" component={ CheckoutPage } />
          <Route exact path="/signin"
            render={
              () => this.props.currentUser ?
                (<Redirect to='/' />) : (<SigninAndSignupPage />) } />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const matchDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, matchDispatchToProps)(App);
