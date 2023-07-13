import "./Button.css";

const Button = ({ width, onClick, children }) => {
  const widthMap = {
    wide: "btn--wide",
    full: "btn--full",
  };

  const buttonClassNames = `btn ${widthMap[width] || ""}`;

  return (
    <button className={buttonClassNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
