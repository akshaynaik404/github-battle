var React = require('react');
var PropTypes = require('prop-types');

var styles = {
  content: {
    textAlign: 'center',
    fontSize: '35px'
  }
}

class Loading extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      text: props.text
    }
  }

  componentDidMount(){
    var stopper = this.state.text + '...';

    this.interval = window.setInterval(function () {
      if(stopper === this.state.text) {
        this.setState(function () {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState(function (prevState) {
          return {
            text: prevState.text + '.'
          }
        })
      }
    }.bind(this), this.props.speed);
  }

  componentWillUnmount() {
    this.interval && window.clearInterval(this.interval);
    this.interval = false;
  }

  render(){
    return (
      <p style={styles.content}>{this.state.text}</p>
    )
  }
}

Loading.proptTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}

module.exports = Loading;
