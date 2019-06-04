import React from 'react';
import './styles/BadgesList.css';
import { Link } from 'react-router-dom';

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className="BadgesListItem">
        <img
          className="BadgesListItem__avatar"
          src={"https://www.gravatar.com/avatar/e74e87d40e55b9ff9791c78892e55cb7?d=identicon"}
          alt={`${this.props.badge.name} ${this.props.badge.lastName}`}
        />

        <div>
          <strong>
            {this.props.badge.name} {this.props.badge.lastName}
          </strong>
          <br />@{this.props.badge.twitter}
          <br />
          {this.props.badge.job}
        </div>
      </div>
    );
  }
}

function useSearchBadges(badges){
  //hook
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredBadges] = React.useState(badges);

  React.useMemo(() => {

    const result = badges.filter(badge => {
      if(badge && badge.name){
        return `${badge.name} ${badge.lastName}`.toLowerCase().includes(query.toLowerCase());
      }
    })

    setFilteredBadges(result);
  }, [badges, query]);

  return {query, setQuery, filteredBadges};
}

function BadgesList(props){
  const badges = props.badges;
  const {query, setQuery, filteredBadges} = useSearchBadges(badges);

  //si hay 0 resultados
  if (filteredBadges.length == 0){
    return(
      <div>
        <div className="form-group">
          <label>Filter Badges</label>
          <input type="text" className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
        </div>

        <h3>No encontramos registros</h3>
          <Link to="/badges/new" className="btn btn-primary">New Badge</Link>
      </div>
    );
  }

  return(
    <div className="BadgesList">

      <div className="form-group">
        <label>Filter Badges</label>
        <input type="text" className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredBadges.map((badge) => {
          return(
            <li key={badge._id}>
              <Link className="text-reset text-decoration-none" to={`/badges/${badge._id}`}>
                <BadgesListItem badge={badge}/>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BadgesList;
