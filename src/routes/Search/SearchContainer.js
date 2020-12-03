import React from "react";
import SearchPresenter from "./SearchPresenter";
import { tvApi, moviesApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      searchTerm: null,
      movieRslt: null,
      tvRslt: null,
    };
  }

  //submit
  handleSubmit = (event) => {
    // form의 전송 event를 막는다. 전송이 아닌 함수 사용만 할것이므로
    event.preventDefault();
    const { searchTerm } = this.state;

    if (searchTerm !== "") {
      this.searchByTerm();
    }
  };

  // update -> onChange에서 일어날 event
  updateTerm = (event) => {
    const {
      target: { value: searchTerm },
    } = event;
    this.setState({ searchTerm });
  };
  // search -> 검색어를 넣은 api 호출
  searchByTerm = async () => {
    // 1. 검색어 가져오기
    const { searchTerm } = this.state;

    // 2. loading 설정하기
    this.setState({ loading: true });

    // 3. 실제 api 호출하기
    // 데이터의 응답 형태 : {data:{result:[{}, {}, {} ,{}]}}

    // let movieRslt = null;
    // let tvRslt = null;
    try {
      // ({data:{result:movieRslt}} = await moviesApi.search(searchTerm));
      // ({data:{result:tvRslt}} = await tvApi.search(searchTerm));
      const {
        data: { results: movieRslt },
      } = await moviesApi.search(searchTerm);

      const {
        data: { results: tvRslt },
      } = await tvApi.search(searchTerm);

      this.setState({ movieRslt, tvRslt });
    } catch (error) {
      this.setState({ error: "error 발생" });
    } finally {
      this.setState({ loading: false });
    }
  };

  // 함수형 컴포넌트에서 return에 해당된다.
  render() {
    const { loading, error, searchTerm, movieRslt, tvRslt } = this.state;

    return (
      <SearchPresenter
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        movieRslt={movieRslt}
        tvRslt={tvRslt}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}
