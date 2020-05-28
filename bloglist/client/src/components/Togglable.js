import React, {
  Fragment,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

// The function that creates the component is wrapped inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : 'block' };
  const showWhenVisible = { display: visible ? 'block' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  // The component uses the useImperativeHandle hook to make its toggleVisibility function available outside of the component. This function is a React hook, that is used for defining functions in a component which can be invoked from outside of the component.
  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <Fragment>
      <div style={hideWhenVisible}>
        <button type='button' onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type='button' onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </Fragment>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
