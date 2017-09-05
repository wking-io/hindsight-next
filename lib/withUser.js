import React, { Component } from 'react';
import store from 'store';
import getDisplayName from '../helpers/getDisplayName';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../helpers/constants';

const withUser = WrappedComponent =>
  class extends Component {
    static displayName = `WithUser(${getDisplayName(WrappedComponent)})`;

    state = {
      isUser: 0,
    };

    componentDidMount() {
      this.fetchUser();
    }

    fetchUser() {
      this.setState({
        isUser: store.get(GC_USER_ID),
      });
    }

    logout() {
      store.remove(GC_USER_ID);
      store.remove(GC_AUTH_TOKEN);
      this.setState({
        isUser: 0,
      });
    }

    render() {
      if (this.state.isUser === 0) {
        return null;
      }
      return <WrappedComponent {...this.props} isUser={this.state.isUser} logout={this.logout} />;
    }
  };

export default withUser;
