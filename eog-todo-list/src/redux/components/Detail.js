import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { deleteTask, initTask, requestTask, requestDeleteTask, requestUpdateTask, updateForm, updateTask } from "../actions/index";
import { FORM_DETAIL_COMP, FORM_DETAIL_DESC, FORM_DETAIL_TITLE } from "../constants/action-types";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
  return { tasks: state.tasks, forms: state.forms, apis: state.apis };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    deleteTask,
    initTask,
    requestTask,
    requestDeleteTask,
    requestUpdateTask,
    updateForm,
    updateTask,
  },
  dispatch,
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
  },
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  group: {
    justifyContent: 'flex-start',
  },
  label: {
    cursor: 'pointer',
    justifyContent: 'flex-start',
  },
  text: {
    textDecorationLine: 'line-through',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const ConnectedDetail = (props) => {
  const { classes, match, history } = props;
  const { result, initialized } = props.apis;
  const TASK_ID = match.params.id;
  const { title } = props.forms[FORM_DETAIL_TITLE] || { title: (result && result[TASK_ID]) ? result[TASK_ID].title : '' };
  const { description } = props.forms[FORM_DETAIL_DESC] || { description: (result && result[TASK_ID]) ? result[TASK_ID].description : '' };
  const { completed } =  props.forms[FORM_DETAIL_COMP] || { completed: (result && result[TASK_ID]) ? result[TASK_ID].completed : '' };
  const DETAIL_FORM_DISABLED = TASK_ID === '' || title === undefined || title.length === 0 || result === undefined || result === null || result.length === 0;

  if (!initialized && DETAIL_FORM_DISABLED) {
      props.initTask();
      props.requestTask();
  }

  const refreshTaskListings = () => {
    props.requestTask();
  };

  const clearDetailForm = () => {
    props.updateForm(FORM_DETAIL_TITLE, { title: '' });
    props.updateForm(FORM_DETAIL_DESC, { description: '' });
    props.updateForm(FORM_DETAIL_COMP, { completed: '' });
  };

  const handleBack = (event) => {
    event.preventDefault();
    clearDetailForm();
    history.push('/' + TASK_ID);
    refreshTaskListings();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    clearDetailForm();
    history.push('/' + TASK_ID);
    refreshTaskListings();
  };

  const handleChange = (type) => (event) => {
    switch (type) {
      case 'description':
        props.updateForm(FORM_DETAIL_DESC, { description: event.target.value });
        break;
      case 'title':
      default:
        props.updateForm(FORM_DETAIL_TITLE, { title: event.target.value });
        break;
    }
  };

  const handleComplete = (event) => {
    if (!completed) {
      props.updateForm(FORM_DETAIL_COMP, { completed: true });
    }
  };

  const handleDelete = (event) => {
    props.deleteTask(result[TASK_ID].id);
    props.requestDeleteTask({ id: result[TASK_ID].id });
    clearDetailForm();
    history.push('/');
    refreshTaskListings();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.updateTask(result[TASK_ID].id, { title, description, completed });
    props.requestUpdateTask({ id: result[TASK_ID].id, title, description, completed });
    clearDetailForm();
    history.push('/' + TASK_ID);
    refreshTaskListings();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className={classes.label} onClick={handleBack}>
          <Grid container>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M11.56 5.56L10.5 4.5 6 9l4.5 4.5 1.06-1.06L8.12 9z" /></svg>
            <span>Back to Tasks</span>
          </Grid>
        </label>
        <Grid container className={classes.group}>
          <Grid item xs={12}>
            <Grid container className={classes.container} style={{alignItems: 'flex-end'}}>
              <Grid item xs={9}>
                <TextField
                  id="title"
                  label="Task"
                  className={classes.textField}
                  value={title}
                  onChange={handleChange('title')}
                  disabled={TASK_ID === '' || result === undefined || result === null || result.length === 0}
                  fullWidth
                  margin="normal"
                />
                </Grid>
                <Grid item xs={3}>
                <Button variant="contained" size="small" disabled={TASK_ID === '' || DETAIL_FORM_DISABLED || completed} className={classes.button} onClick={handleComplete}>
                  Complete
                </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
            <TextField
              id="description"
              label="Description"
              className={classes.textField}
              value={description}
              onChange={handleChange('description')}
              disabled={TASK_ID === '' || DETAIL_FORM_DISABLED}
              fullWidth
              margin="normal"
            />
          </Grid>
        </Grid>
        <Grid container className={classes.group}>
          <Button type="submit" variant="contained" color="primary" disabled={DETAIL_FORM_DISABLED} className={classes.button}>
            Save
          </Button>
          <Button variant="contained" className={classes.button}  disabled={DETAIL_FORM_DISABLED} onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" color="secondary" disabled={DETAIL_FORM_DISABLED} className={classes.button} onClick={handleDelete}>
            Delete
          </Button>
        </Grid>
      </div>
    </form>
  );
};

ConnectedDetail.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const Detail = withRouter(connect(mapStateToProps, mapDispatchToProps) (ConnectedDetail));

export default withStyles(styles) (Detail);
