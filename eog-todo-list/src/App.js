import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from "./redux/components/Form";
import Detail from "./redux/components/Detail";
import List from "./redux/components/List";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import './App.css';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    marginTop: 20,
  },
  heading: {
    color: 'black',
    textAlign: 'left',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const App = (props) => {
  const { classes } = props;

  const Home = (props) => {
    const { match } = props;

    return (
      <Grid item xs={8} className={classes.grid}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <h1 className={classes.heading}>TO-DO:</h1>
              <Form id={match.params.id} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <List id={match.params.id} />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const Details = (props) => {
    const { match } = props;

    return(
      <Grid item xs={8} className={classes.grid}>
        <Paper className={classes.paper}>
          <Detail id={match.params.id} />
        </Paper>
      </Grid>
    );
  };

  return (
    <div className="App" classes={styles.root}>
      <Grid container justify="center" spacing={16}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Home} />
          <Route exact path="/detail/:id" component={Details} />
          <Route component={Home} />
        </Switch>
      </Grid>
    </div>
  );
};

export default withStyles(styles) (App);
