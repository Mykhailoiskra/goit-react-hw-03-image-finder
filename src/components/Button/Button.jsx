import "./ButtonStyles.css";

function Button({ onClick }) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load More
    </button>
  );
}

export default Button;
