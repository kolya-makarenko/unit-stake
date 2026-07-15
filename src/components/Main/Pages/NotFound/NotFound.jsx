import { useNavigate } from 'react-router-dom';
import classes from './NotFound.module.css';

import notFoundImage from '../../../../assets/images/notFoundImage.png';

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <main className={classes.notFoundPage}>
            <section className={classes.notFoundTxt}>
                <div className="wrapper">
                    <div className={classes.notFoundPageContainer}>
                        <h2>
                            We can’t found the page
                            <br />
                            That you’re looking for :(
                        </h2>
                        <div
                            className={classes.homePageLink}
                            onClick={() => navigate('/')}
                        >
                            Back to Homepage
                        </div>
                    </div>
                </div>
            </section>
            <div className={classes.NotFoundImage}>
                <img src={notFoundImage} alt="404" />
            </div>
        </main>
    );
};

export default NotFound;
