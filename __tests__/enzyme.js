import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import store from '../client/store';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.
import AuthForm from '../client/components/AuthForm';
import { expect } from '@jest/globals';

// Newer Enzyme versions require an adapter to a particular version of React
configure({ adapter: new Adapter() });

describe('React unit tests', () => {
  describe('AuthForm', () => {
    let wrapper;
    let email = '';
    const props = {
      buttonLabel: '',
      emailInput: '',
      passwordInput: '',
      inputEmail: () => {},
      inputPassword: () => {},
      url: 'signin',
      setApplicationPosts: () => {},
      signInResponse: () => {},
      setSignInResponse: () => {},
    };
    describe("AuthForm should render all child components in a div with class 'form'", () => {
      beforeAll(() => {
        wrapper = shallow(
          <Provider store={store}>
            <AuthForm {...props} />
          </Provider>
        );
      });

      it('should render am AuthForm component', () => {
        console.log('wrapper DEBUG: ', wrapper.debug());
        expect(wrapper.find(AuthForm)).toHaveLength(1);
      });
    });
  });
});
