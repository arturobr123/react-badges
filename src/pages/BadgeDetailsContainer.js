import React from 'react';

import confLogo from '../images/platziconf-logo.svg';
import './styles/BadgeDetails.css';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Badge from '../components/Badge';
import { Link } from 'react-router-dom';
import BadgeDetails from './BadgeDetails.js';

class BadgeDetailsContainer extends React.Component{
  state ={
    loading: true,
    error:null,
    data: undefined,
    modalIsOpen:false
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({loading: true, error: null});

    try {
      const response = await fetch(`https://platzi-badges.herokuapp.com/api/v1/${this.props.match.params.badgeId}`);

      if (!response.ok) {throw new Error('Something went wrong ...');}

      const data = await response.json();

      this.setState({loading: false, data:data.payload});
    }
    catch (error) {
      this.setState({loading: false, error: error});
    }

  }

  handleOpenModal = e => {
    this.setState({modalIsOpen: true})
  }

  handleCloseModal = e => {
    this.setState({modalIsOpen: false})
  }

  handleDeleteBadge = async () => {
    this.setState({loading: true, error: null});

    try {
      const response = await fetch(`https://platzi-badges.herokuapp.com/api/v1/${this.props.match.params.badgeId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {throw new Error('Something went wrong ...');}

      console.log("delete successfully");
      this.setState({loading: false});
      this.props.history.push('/badges');
    }
    catch (error) {
      this.setState({loading: false, error: error});
    }

  }

  render(){
    if(this.state.loading){
      return <PageLoading />
    }

    if(this.state.error){
      return <PageError error={this.state.error} />
    }

    return(
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        modalIsOpen={this.state.modalIsOpen}
        onDeleteBadge={this.handleDeleteBadge}
        badge={this.state.data}
        />
    );
  }

}

export default BadgeDetailsContainer;
