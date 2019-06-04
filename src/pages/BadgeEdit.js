import React from 'react';
import header from '../images/badge-header.svg';
import "./styles/BadgeNew.css";

import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';

class BadgeEdit extends React.Component {
  state = {
    loading:true,
    error: null,
    form:{
      name: '',
      lastName: '',
      email: '',
      twitter: '',
      job:''
    }
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({loading: true,
      error:null,
    })

    try {
      const response = await fetch(`https://platzi-badges.herokuapp.com/api/v1/${this.props.match.params.badgeId}`);

      console.log(response);

      if (!response.ok) {throw new Error('Something went wrong ...');}

      const data = await response.json();

      this.setState({loading: false, form:data.payload});
    }
    catch (error) {
      this.setState({loading: false, error: error});
    }
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ... this.state.form, //dejar caer todos los valores que ya tenia state.form
        [e.target.name]: e.target.value
      }
    })

    console.log(this.state.form);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({loading: true, error: null});
    console.log(this.state.form);
    try {
      const response = await fetch(`https://platzi-badges.herokuapp.com/api/v1/${this.props.match.params.badgeId}`, {
          method: 'PUT',
          body: JSON.stringify(this.state.form),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (!response.ok) {throw new Error('Something went wrong ...');}

      this.setState({loading: false});
      this.props.history.push('/badges');
    }
    catch (error) {
      this.setState({loading: false, error: error.message});
    }
  }

  render() {
    if(this.state.loading){
      return(<PageLoading />);
    }

    return(
      <React.Fragment>
        <div className="BadgeNew__hero">
          <img className="img-fluid" src={header} alt="logo"/>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-6">
              <Badge
                firstName={this.state.form.name || "FIRST NAME"}
                lastName={this.state.form.lastName || "LAST NAME"}
                twitter={this.state.form.twitter || "TWITTER"}
                jobTitle={this.state.form.job || "JOBTITLE"}
                email={this.state.form.email || "EMAIL"}
                avatarUrl="https://www.gravatar.com/avatar?d=identicon" />
            </div>

            <div className="col-6">
              <BadgeForm
                onChange={this.handleChange}
                formValues={this.state.form}
                onSubmit={this.handleSubmit}
                error={this.state.error}
              />
            </div>

          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
