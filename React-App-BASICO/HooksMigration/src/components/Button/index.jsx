import { Component } from "react";
import "./styles.css";

export class MoreBtn extends Component {
  render() {
    const {text, oC, isD} = this.props;
    return (<button disabled={isD} onClick={oC}>{text}</button>)

  }

}