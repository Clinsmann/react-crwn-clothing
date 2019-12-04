import React from "react";

import "./App.css";

import ShopPage from './pages/shop/shop.component';
import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SigninAndSignupPage from "./pages/signin-signup/signin-signup.component";

import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { Switch, Route, Redirect } from "react-router-dom";
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from "./redux/user/user.selector";
import { auth, createUserProfileDocument/*, addCollectionAndDocuments*/ } from './firebase/firebase.util';
//import { selectCollectionsForPreview } from './redux/shop/shop.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser /*, collectionsArray*/ } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
      setCurrentUser(userAuth);
      //addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
    });
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
  currentUser: selectCurrentUser,
  //collectionsArray: selectCollectionsForPreview
});

const matchDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, matchDispatchToProps)(App);