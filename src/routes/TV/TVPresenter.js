import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

import Section from "../../components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Poster from "../../components/Poster";

const Container = styled.div`
  padding: 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, error, loading }) => {
  return (
    <>
      <Helmet>
        <title>TV | BitFlix</title>
      </Helmet>
      {loading ? (
        <Loader />
      ) : (
        <Container>
          {topRated && (
            <Section title="평점순">
              {topRated.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {popular && (
            <Section title="인기 방영작">
              {popular.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}
          {airingToday && (
            <Section title="오늘 방영작">
              {airingToday.map((tv) => (
                <Poster
                  key={tv.id}
                  id={tv.id}
                  title={tv.original_name}
                  imageUrl={tv.poster_path}
                  rating={tv.vote_average}
                  isMovie={false}
                  year={tv.first_air_date && tv.first_air_date.substring(0, 4)}
                />
              ))}
            </Section>
          )}

          {error && <Message color={"#e74c3c"} text={error} />}
        </Container>
      )}
    </>
  );
};

export default TVPresenter;
