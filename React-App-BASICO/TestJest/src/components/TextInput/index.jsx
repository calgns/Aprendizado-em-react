import P from "prop-types";
import "./styles.css";

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Type Your Search"
      id="text-input"
    />
  );
};

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
