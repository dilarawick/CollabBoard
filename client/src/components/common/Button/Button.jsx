function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  const classes = ['btn', `btn--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
