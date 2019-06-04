import React from 'react';
// import ReactDOM from 'react-dom';
import confLogo from '../images/platziconf-logo.svg';
import './styles/BadgeDetails.css';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

//hook
function useIncreateCount(max){
  const [count, setCount] = React.useState(0);

  if(count > max){
    setCount(0);
  }

  return [count, setCount];
}

function BadgeDetails(props){
  const [count, setCount] = useIncreateCount(4);
  const badge = props.badge;

  return(
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={confLogo} alt="logo de la conferencia"></img>
            </div>

            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>{badge.name} {badge.lastName}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col">
            <Badge
              firstName={badge.name || "FIRST NAME"}
              lastName={badge.lastName || "LAST NAME"}
              twitter={badge.twitter || "TWITTER"}
              jobTitle={badge.job || "JOBTITLE"}
              email={badge.email || "EMAIL"}
              avatarUrl="https://www.gravatar.com/avatar?d=identicon" />
          </div>

          <div className="col">
            <h2>Actions</h2>
            <div>
              <div>
                <button onClick={() => {setCount(count + 1)}} className="btn btn-primary mr-4">Increase count: {count} </button>

                <Link className="btn btn-primary mb-4" to={`/badges/${badge._id}/edit`}>Edit</Link>
              </div>
              <div>
                <button onClick={props.onOpenModal} className="btn btn-danger">Delete</button>
                <DeleteBadgeModal
                  isOpen={props.modalIsOpen}
                  onClose={props.onCloseModal}
                  onDeleteBadge={props.onDeleteBadge}>
                  Esto es el children
                </DeleteBadgeModal>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;
