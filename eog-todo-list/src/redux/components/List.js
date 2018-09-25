import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { deleteTask, initTask, requestTask, requestCompleteTask, requestDeleteTask, updateForm, updateTask } from "../actions/index";
import { FORM_DETAIL_COMP, FORM_DETAIL_DESC, FORM_DETAIL_TITLE } from "../constants/action-types";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
  return { tasks: state.tasks, forms: state.forms, apis: state.apis };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    deleteTask,
    initTask,
    requestCompleteTask,
    requestDeleteTask,
    requestTask,
    updateForm,
    updateTask,
  },
  dispatch,
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    cursor: 'pointer',
  },
  mark: {
    backgroundColor: 'aliceblue'
  },
  paper: {
    padding: theme.spacing.unit,
    color: 'black',
    textAlign: 'left',
  },
  text: {
    textDecorationLine: 'line-through',
  }
});

const ConnectedList = (props) => {
  const { classes, match, history } = props;
  const { result, initialized } = props.apis;
  const SELECTED_ID = match.params.id;

  if (!initialized) {
      props.initTask();
      props.requestTask();
  }

  const handleClick = (item, index) => (event) => {
    props.updateForm(FORM_DETAIL_TITLE, { title: item.title });
    props.updateForm(FORM_DETAIL_DESC, { description: item.description });
    props.updateForm(FORM_DETAIL_COMP, { completed: item.completed });
    history.push('/detail/' + index);
  };

  const stopNativePropagation = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  const handleComplete = (id, completed) => (event) => {
    stopNativePropagation(event);
    if (!completed) {
      props.updateTask(id, { completed: true });
      props.requestCompleteTask({ id, completed });
    }
  };

  const handleDelete = (id) => (event) => {
    stopNativePropagation(event);
    props.deleteTask(id);
    props.requestDeleteTask({ id });
  };

  return (
    <Grid container spacing={16}>
      {(result === undefined || result === null ? [] : result).map((el, idx) => (
        <Grid item xs={12} key={el.id} className={classes.container} onClick={handleClick(el, idx)}>
          <Paper className={classes.paper + (SELECTED_ID === idx.toString() ? ' ' + classes.mark : '')} style={{}}>
            <Grid
              container
              alignItems={'center'}
              direction={'row'}
              justify={'space-between'}>
              <Grid item>
                <div className={el.completed ? classes.text : ""}>
                  {el.title}
                </div>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled={el.completed} className={classes.button} onClick={handleComplete(el.id, el.completed)}>
                  Complete
                </Button>
                <IconButton className={classes.button} aria-label="Delete" onClick={handleDelete(el.id)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

ConnectedList.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({
      push: PropTypes.func.isRequired,
  }),
};

const List = withRouter(connect(mapStateToProps, mapDispatchToProps) (ConnectedList));

export default withStyles(styles) (List);
