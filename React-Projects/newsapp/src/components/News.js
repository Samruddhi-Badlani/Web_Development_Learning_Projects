import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize : 8,
    category : "general"
  
  }
    static propTypes = {

      country : PropTypes.string,
      pageSize : PropTypes.number,
      category : PropTypes.string
  
    }

  articles =  [];

  constructor(){
    super();
    console.log("Constructor called from news component \n")
    this.state ={ 
      articles : this.articles,
      page : 1,
      loading : false
    }
   
}


  async componentDidMount() {
    console.log("cdm component mounted now !!");
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=616383baa5494685b64ad37f4ce010ad&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    
    console.log(parsedData)
    this.setState(
      {
        articles : parsedData.articles,
        totalArticles : parsedData.totalResults,
        loading : false
      }
    )

  }

  handlePrevClick = async () =>{
    console.log("prev clicked");

    this.setState(
      {
        page : this.state.page - 1
      }
    )
    console.log("Next clicked")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=616383baa5494685b64ad37f4ce010ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState(
      {
        articles : parsedData.articles,
        loading:false
      }
    )


  }

  handleNextClick = async () =>{


    if(!Math.ceil(this.state.totalArticles/20) < this.state.page +1){

    this.setState(
      {
        page : this.state.page + 1
      }
    )
    console.log("Next clicked")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=616383baa5494685b64ad37f4ce010ad&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({
      loading : true
    })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState(
      {
        articles : parsedData.articles,
        loading:false
      }
    )
    }
    
  }

  render() {
    console.log("render called ");
    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin:"35px 0px"}}>Top Headlines</h1>
        {this.state.loading && console.log("Loading is taking place now")}
        {this.state.loading && <Spinner />}
        <div className='row'>
          {this.state.articles.map((element)=>{

            return (
              <div key={element.url} className='col-md-4'> <NewsItem  title={element.title?element.title.slice(0,45):""} desc={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author = {element.author?element.author:"Unknown"} date={element.publishedAt?element.publishedAt:"Unknown"}  source = {element.source.name}/></div>
            )
          })}
         
         
        </div>

        <div className='container d-flex justify-content-between'>
        <button disabled={this.state.page <=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={Math.ceil(this.state.totalArticles/this.props.pageSize) < this.state.page +1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
       
       

      </div>
    )
  }
}

export default News
