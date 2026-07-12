import classes from './StrategicManifesto.module.css';

const CONTENT_MAP = {
    Marketing: {
        title: <h2>Why Marketing Is Non-Negotiable for Tokenised Assets</h2>,
        layer: (
            <div className={classes.layerContainer}>
                <div className={classes.layer}>
                    <div className={classes.layerHeader}>
                        — Layer 01 — Mechanical
                    </div>
                    <h3>Tokenisation creates</h3>
                    <h4>structure.</h4>
                    <p>Structured · Compliant · Invisible</p>
                </div>
                <div className={`${classes.layer} ${classes.layerRed}`}>
                    <div className={classes.layerHeader}>
                        Layer 02 — Strategic —
                    </div>
                    <h3>Marketing creates</h3>
                    <h4>demand.</h4>
                    <p>Visible · Credible · Investable</p>
                </div>
            </div>
        ),
    },
    Legal: {
        title: (
            <h2>
                Why Legal Structuring Is Non-Negotiable for Tokenised Assets
            </h2>
        ),
        layer: (
            <div className={classes.layerContainer}>
                <div className={classes.layer}>
                    <div className={classes.layerHeader}>
                        — Layer 01 — Mechanical
                    </div>
                    <h3>Tokenisation creates</h3>
                    <h4>opportunity.</h4>
                    <p>Structured · Compliant · Invisible</p>
                </div>
                <div className={`${classes.layer} ${classes.layerRed}`}>
                    <div className={classes.layerHeader}>
                        Layer 02 — Strategic —
                    </div>
                    <h3>Legal structuring determines</h3>
                    <h4>whether it’s allowed.</h4>
                    <p>Visible · Credible · Investable</p>
                </div>
            </div>
        ),
    },
};

const StrategicManifesto = ({ category }) => {
    const content = CONTENT_MAP[category];

    if (!content) {
        return null;
    }

    return (
        <section className={classes.strategicManifesto}>
            <div className="wrapper">
                <div className={classes.strategicManifestoMainTxt}>
                    <div className={classes.fakeBtn}>
                        <div className={classes.fakeBtnContainer}>
                            <div className={classes.fakeBtnCircle}></div>
                            <p>A Strategic Manifesto</p>
                        </div>
                    </div>
                    {content.title}
                </div>
                {content.layer}
                <div className={classes.simpleTxt}>
                    Without it, your asset doesn't attract capital{' '}
                    <span>— it gets ignored.</span>
                </div>
            </div>
        </section>
    );
};

export default StrategicManifesto;
