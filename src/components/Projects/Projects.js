import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  saveProject,
  deleteProject
} from '../../actions';

class Projects extends Component {
  constructor (props) {
    super(props);

    this.state = {
      editing: false,
      editingId: null,
      project: {}
    };
  }

  toggleEditing (project) {
    if (this.props.edit) {
      if (this.state.editing) {
        this.setState({
          editing: false,
          project: {},
          editingId: null
        });
      }
      else {
        this.setState({
          editing: true,
          project: Object.assign({}, project),
          editingId: project.id
        });
      }
    }
  }

  toggleNewProjectForm () {
    let { editing, editingId } = this.state;

    if (editing && editingId === null) {
      this.setState({
        editing: false,
        project: {},
        editingId: null
      });
    }
    else {
      this.setState({
        editing: true,
        project: {
          title: 'Give me a title!',
          link_url: 'Gimme a link url!',
          link_title: 'Gimme a .. link title! Probably the same as the url!'
        }
      });
    }
  }

  handleSubmit () {
    let { project } = this.state;

    this.props.saveProject(project)
      .then(() => this.toggleEditing(project));
  }

  handleChange (key, event) {
    let { project } = this.state;
    project[key] = event.target.value;
    this.setState({ project });
  }

  handleDelete (project) {
    if (window.confirm('Are you sure you want to delete this project?')) {
      this.props.deleteProject(project)
        .then(() => {
          this.toggleEditing(project);
        });
    }
  }

  renderProjects () {
    let arr = [];
    let { editingId, project } = this.state;

    this.props.data.forEach((_project) => {
      if (editingId === _project.id) {

        arr.push(
          <div key={ _project.id }>
            <input
                type='text'
                value={ project.title }
                onChange={ this.handleChange.bind(this, 'title') } />
            <br />
            <input
                type='text'
                value={ project.link_url }
                onChange={ this.handleChange.bind(this, 'link_url') } />
            <br />
            <input
                type='text'
                value={ project.link_title }
                onChange={ this.handleChange.bind(this, 'link_title') } />
            <br />
            <button onClick={ this.handleSubmit.bind(this) } >Save</button>
            { this.renderEditToggle(_project) }
            <button onClick={ this.handleDelete.bind(this, _project) }>Delete</button>
          </div>

        );

      }
      else {
        arr.push(
          <div key={ _project.id }>
            <p>
              { _project.title } { this.renderEditToggle(_project) } <br />
              <a href={ _project.link_url }>{ _project.link_title }</a>
            </p>
          </div>);

      }

    });

    return arr;
  }

  renderEditToggle (project) {
    if (this.props.edit) {
      let btnText = this.state.editing ? 'Cancel' : 'Edit';

      if (!this.state.editing || (this.state.editingId === project.id)) {
        return (
          <button onClick={ this.toggleEditing.bind(this, project) }>
            { btnText }
          </button>
        );
      }
    }
  }

  renderNewProjectStuff () {
    if (this.props.edit) {
      let { editing, editingId, project } = this.state;

      if (editing && editingId === null) {

        return (
          <div>
            { this.renderNewProjectStuffButton() }
            <br />
            <input
                type='text'
                value={ project.title }
                onChange={ this.handleChange.bind(this, 'title') } />
            <br />
            <input
                type='text'
                value={ project.link_title }
                onChange={ this.handleChange.bind(this, 'link_title') } />
            <br />
            <input
                type='text'
                value={ project.link_url }
                onChange={ this.handleChange.bind(this, 'link_url') } />
            <br />
            <button onClick={ this.handleSubmit.bind(this) }>Save</button>
            <button onClick={ this.toggleEditing.bind(this) }>Cancel</button>

          </div>
        );


      }
      else {
        return this.renderNewProjectStuffButton();
      }

    }
  }

  renderNewProjectStuffButton () {
    if (this.props.edit) {
      if (this.state.editing) {
        return <button disabled>New project</button>;
      }
      else {
        return <button onClick={ this.toggleNewProjectForm.bind(this) }>New project</button>;
      }
    }
  }

  render () {
    return (
      <div>
        <h3>Projects</h3>
        <div className={["projects"]}>
          { this.renderNewProjectStuff() }
          { this.renderProjects() }
        </div>
      </div>
    );
  }
}

const _stateToProps = (state) => {
  return {};
};

const _dispatchToProps = (dispatch) => {
  return bindActionCreators({
    saveProject,
    deleteProject
  }, dispatch);
};

export default connect(_stateToProps, _dispatchToProps)(Projects);