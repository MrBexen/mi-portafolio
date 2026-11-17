import "./Button.css";

// Definimos las propiedades que aceptará nuestro botón
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({
  children,
  variant = "primary",
  disabled = false,
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
