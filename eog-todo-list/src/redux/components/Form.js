import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addTask, requestCreateTask, updateForm } from "../actions/index";
import { FORM_MAIN_TITLE } from "../constants/action-types";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const mapStateToProps = state => {
  return { forms: state.forms, apis: state.apis };
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    addTask,
    requestCreateTask,
    updateForm,
  },
  dispatch,
);

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: 'none',
  },
  group: {
    justifyContent: 'flex-start',
    paddingRight: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const ConnectedForm = (props) => {
  const { classes } = props;
  const { fetching } = props.apis;
  const { title } = props.forms[FORM_MAIN_TITLE] || { title: '' };

  const handleChange = (name) => (event) => {
    props.updateForm(FORM_MAIN_TITLE, { title: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = props.apis.length;
    props.addTask({ title, id, description: '', completed: false });
    props.requestCreateTask({ title });
    props.updateForm(FORM_MAIN_TITLE, { title: '' });
  };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <Grid container className={classes.group}>
            <Grid item xs={12}>
              <TextField
                id="title"
                className={classes.textField}
                value={title}
                onChange={handleChange('name')}
                disabled={fetching}
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary" disabled={title === undefined || title.length === 0} className={classes.button}>
                Add new To-do
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    );
};

ConnectedForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

const Form = connect(mapStateToProps, mapDispatchToProps) (ConnectedForm);

export default withStyles(styles) (Form);
