import React from 'react';
import {Link} from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary', // 'primary' or 'secondary'
  size = 'md', // 'sm', 'md', 'lg'
  to,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const baseClass = `btn-${variant}`;
  const sizeClass = size !== 'md' ? `btn-${size}` : '';
  const classes = `${baseClass} ${sizeClass} ${className}`.trim();

  const content = variant === 'primary' ? <span>{children}</span> : children;

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
