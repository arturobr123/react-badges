import React from 'react';
import './styles/PageError.css';

function PageError(props){
  console.log(props);
  return(
    <div className="PageError">
      {props.error.message}
    </div>
  );
}

export default PageError;
