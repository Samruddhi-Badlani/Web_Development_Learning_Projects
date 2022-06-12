import React, { Component } from "react";

export class NewsItem extends Component {

    
  render() {

    let {title,desc,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img className="card-img-top" src={imageUrl?imageUrl:"https://images.livemint.com/img/2022/06/12/600x338/ANI-20220406134-0_1655014392621_1655014414611.jpg"} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {desc}...
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
