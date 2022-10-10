// import { Component } from "react";
import P from "prop-types";
import "./styles.css";

export const LoadMoreBtn = ({ text, onClicky, isDisabled = false }) => (
  <button className="button" disabled={isDisabled} onClick={onClicky}>
    {text}
  </button>
);

LoadMoreBtn.defaultProps = { isDisabled: false };

LoadMoreBtn.propTypes = {
  text: P.string.isRequired,
  onClicky: P.func.isRequired,
  isDisabled: P.bool,
};
