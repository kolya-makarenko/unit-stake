import classes from './Engagement.module.css';

const Engagement = (props) => {
    const engagementBlocks = (props?.engagement_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

    if (engagementBlocks.length === 0) {
        return null;
    }

    return (
        <section className={classes.engagement}>
            <div className="wrapper">
                <h2>Engagement Model</h2>
                <div className={classes.engagementContainer}>
                    {engagementBlocks.map((item, index) => (
                        <div key={index} className={classes.engagementBox}>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Engagement;
