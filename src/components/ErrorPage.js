import classes from './ErrorPage.module.css'

const ErrorPage = ({error}) => {
  return (
    <div className={classes.error}>
      <h1 className={classes.header}>Oops! Something went wrong.</h1>
      <p className={classes.para}>An error occurred :{error}</p>
    </div>
  );
};

export default ErrorPage;