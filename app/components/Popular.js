var React = require('react');
var PropTypes = require('prop-types');

var api = require('../utils/api');
var Loading = require('./Loading');
function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {
        props.repos.map(function (repo, index) {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>#{index + 1}</div>
              <ul className='space-list-item'>
                <li>
                  <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Repo for ' + repo.owner.login}
                  />
                </li>
                <li><a href={repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
            </li>
          )
        })
      }
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

function SelectLanguage (props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {
        languages.map(function (language) {
          return (
            <li
              key={language}
              style={language === props.selectedLanguage ? {color: '#d0021b'}: null}
              onClick={props.onSelect.bind(null, language)}
            >
              { language }
            </li>
          )
        }, this)
      }
    </ul>
  );
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(newLang) {
    this.setState(function () {
      return {
        selectedLanguage: newLang,
        repos: null
      }
    });
    api.fetchPopularRepos(newLang)
      .then(function (repos) {
        this.setState(function () {
          return {
            repos: repos
          }
        })
      }.bind(this));
  }
  render() {
    return (
      <div>
        <SelectLanguage
        onSelect={this.updateLanguage}
        selectedLanguage={this.state.selectedLanguage}
        />
        {
          !this.state.repos
            ? <div className='loader'><Loading /></div>
            : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

module.exports = Popular;
