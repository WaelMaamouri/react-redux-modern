function Button({ text, backgroundColor, textColor }) {
  return (
    <button
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {text}
    </button>
  );
}

export default Button;
