import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('The form calls the event handler it received as props with the right details when the user submits', () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm createBlog={createBlog} />);

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('#title');
    const author = component.container.querySelector('#author');
    const url = component.container.querySelector('#url');

    fireEvent.change(title, {
      target: { value: 'Testing with Jest' },
    });
    fireEvent.change(author, {
      target: { value: 'Zoltan Szokodi' },
    });
    fireEvent.change(url, {
      target: { value: 'https://example.com/testing' },
    });

    fireEvent.submit(form);

    // console.log(createBlog.mock.calls);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe('Testing with Jest');
    expect(createBlog.mock.calls[0][0].author).toBe('Zoltan Szokodi');
    expect(createBlog.mock.calls[0][0].url).toBe('https://example.com/testing');
  });
});
