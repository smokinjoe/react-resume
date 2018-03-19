import React, { Component } from 'react';

class TechnicalExperiences extends Component {
  constructor (props) {
    super(props);
  }

  renderTechnicalExperience () {
    let arr = [];

    this.props.data.forEach((exp) => {
      arr.push(
        <li key={ exp.id }>{ exp.title }: { exp.items.join(', ') }</li>
      );
    });

    return arr;
  }

  render () {
    return (
      <div>
        <h2>Technical Experience</h2>
        <ul className={["technical-experience"]}>
          { this.renderTechnicalExperience() }
        </ul>
      </div>
    );
  }

}

export default TechnicalExperiences;