import { useNavigate } from 'react-router-dom';
import classes from './AboutUsPagePlatform.module.css';

const AboutUsPagePlatform = () => {
    const navigate = useNavigate();
    return (
        <section className={`sectionMarginTop ${classes.platform}`}>
            <div className="wrapper">
                <div className={classes.platformContainer}>
                    <h2>
                        This platform was not built as an idea — it was built as
                        a necessity.
                    </h2>
                    <p>
                        We built what we could not find in the market ourselves.
                    </p>
                    <div className={classes.platformBtns}>
                        <button
                            className={classes.platformBtn1}
                            onClick={() => navigate('/projects')}
                        >
                            Explore Projects
                        </button>
                        <button
                            className={classes.platformBtn2}
                            onClick={() => navigate('/insights')}
                        >
                            View our Insight & News
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUsPagePlatform;
