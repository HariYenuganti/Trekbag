interface ButtonProps {
  children: React.ReactNode;
  buttonType?: 'secondary';
  onClick?: () => void;
}

export default function Button({ children, buttonType, onClick }: ButtonProps) {
  return (
    <button
      className={`btn ${buttonType === 'secondary' ? 'btn--secondary' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
