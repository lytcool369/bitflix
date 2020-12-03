import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Section from '../../components/Section';
import Message from "../../components/Message";
import Poster from "../../components/Poster";
import Loader from "../../components/Loader";

const Container = styled.div`
    padding:20px;    
`;
const Form = styled.form`
    margin-bottom:50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 2rem;
    width: 100%;
`;

const SearchPresenter = (
    {loading,
    error,
    searchTerm,
    movieRslt,
    tvRslt,
    handleSubmit,
    updateTerm}
    ) => {

    return (
        <Container>
            <Helmet> Search | movieFrame </Helmet>
            <Form  onSubmit={handleSubmit}>
                <Input
                 placeholder="검색할 영화나 TV프로그램을 입력하세요"
                 value={searchTerm}
                 onChange={updateTerm}
                />
            </Form>
        {loading ? (<Loader />) : <>
        {movieRslt && movieRslt.length > 0 &&
        <Section title="영화검색결과">
            {movieRslt.map(movie => (<Poster 
                key={movie.id}
                id={movie.id}
                title={movie.original_title}
                imageUrl={movie.poster_path}
                rating={movie.vote_average}
                isMovie={true}
                year={movie.release_date && movie.release_date.substring(0, 4)}
            />))}
        </Section>
        }
        {tvRslt && tvRslt.length > 0 &&
        <Section title="TV검색결과">
            {tvRslt.map(tv => (<Poster 
                    key={tv.id}
                    id={tv.id}
                    title={tv.original_name}
                    imageUrl={tv.poster_path}
                    rating={tv.vote_average}
                    isMovie={false}
                    year={tv.first_air_date && tv.first_air_date}
                    />))}
        </Section>}
        {error && (<Message color={"e74c3c"} text={error}/>)}
        { tvRslt && 
          movieRslt &&
          tvRslt.length === 0 &&
          movieRslt.length === 0 &&
          (<Message text="검색 결과가 없습니다." color={"#95a5a6"}/> )}
        </> }
        </Container>        
    );
};

export default SearchPresenter;