import classes from './HomePageContent.module.css';

const HomePageContent=({ title, children }) =>{
  return (
    <div className={classes.content}>
      <h1 className={classes.header}>{title}</h1>
      {children}
    </div>
  );
}

export default HomePageContent;