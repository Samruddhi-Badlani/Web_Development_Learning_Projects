import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("Constructor called from news component \n");
    this.state = {
      articles: this.articles,
      page: 1,
      loading: false,
      totalArticles:0
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - My News App
    `;
  }

  async componentDidMount() {
    console.log("component did mount  called")
    this.updateNews();
  }

  async updateNews() {
    console.log("Next clicked");
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=616383baa5494685b64ad37f4ce010ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading: true,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      loading: false,
    });
  }

  handlePrevClick = async () => {
    // console.log("prev clicked");

    this.setState({
      page: this.state.page - 1,
    });

    this.updateNews();
  };

  handleNextClick = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.updateNews();
  };

  fetchMoreData = async () => {
    this.setState({
      page : this.state.page + 1
    })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=616383baa5494685b64ad37f4ce010ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;

  
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalArticles: this.state.articles.length + parsedData.totalResults,
      loading: false,
    });

  
  };

  render() {
    console.log("render called ");
    return (
     <>
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          Top   {this.capitalizeFirstLetter(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && console.log("Loading is taking place now")} */}
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<Spinner />}
        >

          <div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div key={element.url} className="col-md-4">
                {" "}
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

        <div className="container d-flex justify-content-between">
         
         
        </div>
      </>
    );
  }
}

export default News;
