export default function Button({ children, variant = 'primary', onClick, type = 'button', ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
      {...props}
    >
      {children}
    </button>
  )
}
