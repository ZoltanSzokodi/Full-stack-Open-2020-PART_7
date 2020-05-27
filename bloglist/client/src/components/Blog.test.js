import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';

// INITIAL DATA FOR TESTING THE BLOG COMPONENT
const blog = {
  author: 'Michael Chan',
  createdAt: '2020-05-15T12:56:06.006Z',
  id: '5ebe91660c1ef9322c5806e0',
  likes: [
    '5ebbdb244fe71517f8ad2680',
    '5ebe8e439ca7cb4c708ff2cd',
    '5ebe61e5c89b3924fc522288',
  ],
  title: 'React patterns',
  url: 'https://reactpatterns.com',
  user: {
    name: 'John Dough',
    username: 'JD89',
    id: '5ebe8e439ca7cb4c708ff2cd',
  },
};

const user = {
  id: '5ebbdb244fe71517f8ad2680',
  name: 'Zoltan Szokodi',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYmJkYjI0NGZlNzE1MTdmOGFkMjY4MCIsInVzZXJuYW1lIjoiWnN6b2tvZGkiLCJpYXQiOjE1ODk4OTY5NzZ9.ugka_gwA8NCc8fl9roLvOq7d5Gj5dJJz26QfytrbSvw',
  username: 'Zszokodi',
};

describe('<Blog />', () => {
  let component;

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} />);
  });

  test("Component renders the blog's title and author, but does not render its url or number of likes by default", () => {
    // DEBUG: Print the whole component's HTML
    // component.debug();

    const title = component.container.querySelector('.title');
    const author = component.container.querySelector('.author');
    const details = component.container.querySelector('.details');
    // const div = component.container.querySelector('.blog');

    // DEBUG: Print a specific part of the HTML
    // console.log(prettyDOM(title));

    expect(title).toHaveTextContent('React patterns');
    expect(author).toHaveTextContent('Michael Chan');
    expect(details).toHaveStyle('display: none');
  });

  test("Component renders the blog's url and number of likes after clicking view button", () => {
    const button = component.getByText('show');
    const details = component.container.querySelector('.details');

    // console.log(prettyDOM(button));

    fireEvent.click(button);

    expect(details).not.toHaveStyle('display: none');
  });

  test('If the user has already liked the blog the button displays unlike else like', () => {
    // component.debug();
    const isLiked = blog.likes.some(id => id === user.id);
    let button;

    console.log(isLiked);

    if (isLiked) {
      button = component.getByText('unlike');
      expect(button).toBeDefined();
      console.log('unlike');
    } else {
      button = component.getByText('like');
      expect(button).toBeDefined();
      console.log('like');
    }
  });

  test('If the view button is clicked twice the toggleVisibility event handler is called twice', () => {
    const mockHandler = jest.fn();
    const button = component.container.querySelector('.view');

    button.addEventListener('click', mockHandler);

    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
