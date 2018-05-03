import React, { Component } from 'react';

export default class Greeting extends Component {

    constructor(props) {
      super(props);
      this.state = {
        greeting: {
          before: "",
          after: "",
        },
      };
    };
  
    componentDidMount() {
      this.getGreeting();
    };

    getGreeting() {
      fetch('/api/randomGreeting')
      .then(res => res.json())
      .then(greeting => this.setState({greeting: greeting}));

      setTimeout(() => {
        this.getGreeting();
      }, 600000);
    };

    render() {
        return (
            <h1 className="greeting">{this.state.greeting.before}{this.props.name}{this.state.greeting.after}</h1>
        );
    };

}