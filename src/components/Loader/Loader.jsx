import classes from './Loader.module.css';

import favicon from '../../assets/images/favicon.svg';

const Loader = () => {
    return (
        <div className={classes.loader}>
            <img src={favicon} alt="loader" />
        </div>
    );
};

export default Loader;
