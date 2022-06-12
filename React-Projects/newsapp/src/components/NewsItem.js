import React, { Component } from "react";

export class NewsItem extends Component {

    
  render() {

    let {title,desc,imageUrl,newsUrl} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
          <img className="card-img-top" src={imageUrl} alt="Card image cap" />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {desc}
            </p>
            <a href={newsUrl} target="_blank" className="btn btn-primary btn-sm">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;