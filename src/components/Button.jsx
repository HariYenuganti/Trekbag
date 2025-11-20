export default function Button({ children, buttonType, onClick }) {
  return (
    <button
      className={`btn ${buttonType === 'secondary' ? 'btn--secondary' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
