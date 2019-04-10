import React from 'react';
import { shallow, mount } from 'enzyme';
import '../../setupTests'

import AuthButton from './AuthButton';

// import React from 'react';
// import { mount } from 'enzyme';
// import CommentList from 'components/CommentList';
import Root from 'Root';

let wrapped;

beforeEach(() => {
  const initialState = {
    comments: ['comment 1', 'comment 2']
  };
  wrapped = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it('creates one LI per comment', () => {
  expect(wrapped.find('li').length).toEqual(2);
});

it('shows the text for each comment', () => {
  expect(wrapped.render().text()).toContain('comment 1');
  expect(wrapped.render().text()).toContain('comment 2');
});


describe('AuthButton', () => {
  let wrapper;
  beforeEach(() => (wrapper = shallow(<AuthButton />)));

  it('should render correctly', () => {
    // expect(wrapper).toMatchSnapshot();
  });

  it('should render a <div/>', () => {
    console.log(wrapper)
    expect(wrapper.find('div').length).toEqual(1);
  });

  describe('when user is logged in', () => {
    describe('user id was fetched successfully', () => {
      it('renders value of userId', () => {
        wrapper.setProps({ signedIn: true, userId: 'user id' });
        expect(wrapper.text()).toEqual('user id');
      });
    });

    describe('user id was not fetched successfully', () => {
      it("renders text 'Account'", () => {
        wrapper.setProps({ signedIn: true, userId: '' });
        expect(wrapper.text()).toEqual('Account');
      });
    });
  });

  describe('when user is not logged in', () => {
    it("renders text 'Login'", () => {
      wrapper.setProps({ signedIn: false, userId: '' });
      expect(wrapper.text()).toEqual('Account');
    });
    it("renders the Spotify icon", () => {
      wrapper.setProps({ signedIn: false, userId: '' });
      expect(wrapper.text()).toEqual('Account');
    });
  });
});
