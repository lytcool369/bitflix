import React from "react";
import SearchPresenter from "./SearchPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  // 함수형 컴포넌트에서 return에 해당한다.
  render() {
    return <SearchPresenter />;
  }
}
