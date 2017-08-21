var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

var PlayerPreview = require('./PlayerPreview');

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var newValue = event.target.value;

    this.setState(function () {
      return {
        username: newValue
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.id, this.state.username);
  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='Github Username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          type='submit'
          className='button'
          disabled={!this.state.username}>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}


class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneName : '',
      playerTwoName : '',
      playerOneImg : null,
      playerTwoImg : null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit(id, username) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = username;
      newState[id + 'Img'] = 'https://github.com/' + username + '.png?size=200';
      return newState;
    });
  }

  handleReset(id) {
    this.setState(function () {
      var newState = {};
      newState[id + 'Name'] = '';
      newState[id + 'Img'] = null;
      return newState;
    });
  }

  render() {
    var playerOneName = this.state.playerOneName;
    var playerOneImg = this.state.playerOneImg;
    var playerTwoName = this.state.playerTwoName;
    var playerTwoImg = this.state.playerTwoImg;
    var resultUrl = this.props.match.url + `/result?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`;
    return (
      <div className='battle-container'>
        <div className='row'>
          {
            !playerOneName &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}
            />
          }
          {
            playerOneImg !== null &&
            <PlayerPreview
              avatar={playerOneImg}
              username={playerOneName}
              reset={this.handleReset}
              id={'playerOne'} >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>
          }
          {
            !playerTwoName &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit}
            />
          }
          {
            playerTwoImg !== null &&
            <PlayerPreview
              avatar={playerTwoImg}
              username={playerTwoName}
              reset={this.handleReset}
              id={'playerTwo'} >
                <button
                  className='reset'
                  onClick={this.handleReset.bind(null, 'playerTwo')}>
                    Reset
                </button>
            </PlayerPreview>
          }
        </div>
        {
          playerOneImg !== null &&
          playerTwoImg !== null &&
          <Link className='button' to={resultUrl}>Submit</Link>
        }
      </div>
    )
  }
}

module.exports = Battle;
