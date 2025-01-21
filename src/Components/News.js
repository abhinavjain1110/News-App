/* import React, { useEffect , useState} from 'react'
import NewsItem from '../NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

  const [articles,setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const[totalResults, setTotalResults]=useState(0)
   

  const capitalizeFirstLetter = ( string) => {
      return string.charAt(0).toUpperCase()+string.slice(1);
    }

    const updateNews = async () => {
      props.setProgress(10);
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d2e01af14f14777a6f39e565848dac8&page=${page}&pageSize=${props.pageSize}`;
        setLoading({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(()=>{
      document.title=`${capitalizeFirstLetter(props.category)}-Absolute News` 
      updateNews();
    }, []) */

   /* const handlePrevClick =async()=>
    {
        setPage(page-1)
        updateNews();
    }
   const handleNextClick =async()=>
    {
        setPage(page+1)
        updateNews();
    } */
   /* const fetchMoreData = async () => {
      const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6d2e01af14f14777a6f39e565848dac8&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page+1)
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    };
    

    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* {  loading && <Spinner/>  }
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!==totalResults}
          loader={<Spinner/>}
        > */
          /* <div className="container">
        <div className="row">
            {articles.map((element)=>{
                return <div className="col-md-3" key={element.url}>
                <NewsItem title={element.title ? element.title: " "} description={element.description?element.description.slice(0,80):"Open link to know more"} imageUrl={element.urlToImage?element.urlToImage:"https://w7.pngwing.com/pngs/192/350/png-transparent-news-apple-news-application-logo-apple-news-logo-ios-news-logo-ios-news-3d-ios-news-3d-icon-thumbnail.png"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
            })}    
      </div>
      </div>
       </InfiniteScroll>
      </>
    )
  }


News.defaultProps={
  country: 'us ',
  pageSize: 8,
  category: 'general'
}

News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News */
 
import React, { useEffect, useState } from 'react';
import NewsItem from '../NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 10; // Fixed page size for news
  const country = 'us'; // Fixed country for news
  const apiKey = '6d2e01af14f14777a6f39e565848dac8'; // Replace this with an environment variable in production

  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  const updateNews = async () => {
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
      const response = await fetch(url);
      const data = await response.json();
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${props.category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
    const response = await fetch(url);
    const data = await response.json();
    setArticles((prevArticles) => prevArticles.concat(data.articles));
    setTotalResults(data.totalResults);
    setPage(nextPage);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - Absolute News`;
    setPage(1); // Reset the page when category changes
    updateNews();
  }, [props.category]); // Re-run whenever the category changes

  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
        {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((article) => (
              <div className="col-md-3" key={article.url}>
                <NewsItem
                  title={article.title || 'No Title'}
                  description={
                    article.description
                      ? article.description.slice(0, 80)
                      : 'Open link to know more'
                  }
                  imageUrl={
                    article.urlToImage ||
                    'https://w7.pngwing.com/pngs/192/350/png-transparent-news-apple-news-application-logo-apple-news-logo-ios-news-logo-ios-news-3d-ios-news-3d-icon-thumbnail.png'
                  }
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default News;
