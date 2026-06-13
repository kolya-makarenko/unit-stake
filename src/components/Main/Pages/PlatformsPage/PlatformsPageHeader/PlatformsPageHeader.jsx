import classes from './PlatformsPageHeader.module.css';

const PlatformsPageHeader = () => {
    return (
        <section className={classes.header}>
            <div className="wrapper">
                <h2>Platforms</h2>
                <p>Discover projects with public and structured data</p>
            </div>
        </section>
    );
};

export default PlatformsPageHeader;
