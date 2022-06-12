import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'

export class News extends Component {

  articles =  [];

  constructor(){
    super();
    console.log("Constructor called from news component \n")
    this.state ={ 
      articles : this.articles
    }
   
}
  static propTypes = {

  }

  async componentDidMount() {
    console.log("cdm");
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=5ed23fc0cea44cd888c9eb4e2b663b00";
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState(
      {
        articles : parsedData.articles
      }
    )

  }

  render() {
    console.log("render called ");
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
        <div className='row'>
          {this.state.articles.map((element)=>{

            return (
              <div key={element.url} className='col-md-4'> <NewsItem  title={element.title?element.title.slice(0,45):""} desc={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} /></div>
            )
          })}
         
         
        </div>
       
       

      </div>
    )
  }
}

export default News
