import React from 'react';
import './styles/Badges.css';
import confLogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import { Link } from 'react-router-dom';

class Badges extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      loading:true,
      error:null,
      data:undefined
    }
  }

  //aqui hacer las llamadas a APIS
  componentDidMount(){
    this.fetchData();

    this.intervalId = setInterval(this.fetchData, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  fetchData = async () => {
    this.setState({loading: true,
      error:null,
    })

    try {
      const response = await fetch("https://platzi-badges.herokuapp.com/api/v1");

      if (!response.ok) {throw new Error('Something went wrong ...');}

      const data = await response.json();

      this.setState({loading: false, data:data.payload});
    }
    catch (error) {
      this.setState({loading: false, error: error});
    }
  }

  render(){
    if(this.state.loading == true && !this.state.data){
      return <PageLoading />
    }

    if (this.state.error) {
      return(<PageError error={this.state.error} />);
    }

    return(
      <React.Fragment>

        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img className="Badges_conf-logo" src={confLogo} alt="img"/>
            </div>
          </div>
        </div>

        <div className="Badges__container">
          <div className="Badges__buttons">
            <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
          </div>

          <div className="Badges__list">
            <div className="Badges__container">
              <BadgesList badges={this.state.data}/>
            </div>
          </div>

        </div>
      </React.Fragment>
    );
  }
}

export default Badges;
