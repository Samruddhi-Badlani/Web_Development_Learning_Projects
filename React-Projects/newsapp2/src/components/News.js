import React, { Component,useEffect,useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  
  const [articles,setArticles] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [page,setPage] = React.useState(1);
  const [totalArticles,setTotalArticles] = React.useState(0);
  // document.title = `${this.capitalizeFirstLetter(
  //   props.category
  // )} - My News App
  // `;

 

  const capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  

  useEffect(()=>{
    updateNews()
  },[])


  const updateNews = async ()=> {
    props.setProgress(10);
    console.log("Next clicked");
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5ed23fc0cea44cd888c9eb4e2b663b00&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);
   
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);

    setArticles(parsedData.articles)
    setTotalArticles(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }

  const handlePrevClick = async () => {
    // console.log("prev clicked");

   setPage(page+1);

    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page-1)
    updateNews();
  };

  const fetchMoreData = async () => {
    setPage(page+1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=5ed23fc0cea44cd888c9eb4e2b663b00&page=${page}&pageSize=${props.pageSize}`;

  
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalArticles(totalArticles+parsedData.totalResults)
    setLoading(false)
   

  
  };

 
    console.log("render called ");
    return (
     <>
        <h1 className="text-center" style={{ margin: "35px 0px",marginTop:"90px" }}>
          Top   {capitalizeFirstLetter(props.category)} Headlines
        </h1>
        {/* {this.state.loading && console.log("Loading is taking place now")} */}
        {loading && <Spinner />}
        <InfiniteScroll
         
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalArticles}
          loader={<Spinner />}
        >

           <div className="container" >
        <div className="row" > 
          {articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
               
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  desc={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author ? element.author : "Unknown"}
                  date={element.publishedAt ? element.publishedAt : "Unknown"}
                  source={element.source.name}
                
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>

        
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;
