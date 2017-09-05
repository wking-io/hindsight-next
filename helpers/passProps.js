import React from 'react';

const passProps = (props, prop) => comp =>
  React.Children.map(props.children, (child) => {
    if (child.type === comp) {
      return React.cloneElement(child, {
        prop: props[prop],
      });
    }
    return child;
  });

export default passProps;
