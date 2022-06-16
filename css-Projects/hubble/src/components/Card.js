import React from 'react'
import { StyledCard } from './styles/Card.styled';

function Card(props) {

  const {id,title,body,image} = props;
  return (
    <StyledCard layout = {id%2 ===0 ? 'row-reverse': 'row'}>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
    </div>

      <div>
        <img src={`./images/${image}`} alt='' />
      </div>
    </StyledCard>
  )
}

export default Card
