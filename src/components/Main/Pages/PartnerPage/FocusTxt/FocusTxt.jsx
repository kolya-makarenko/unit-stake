import classes from './FocusTxt.module.css';

const FocusTxt = (props) => {
    const renderText = () => {
        switch (props.category) {
            case 'Marketing':
                return (
                    <p>
                        Real-World Assets · Tokenisation · Investor Acquisition
                        · Digital Growthv
                    </p>
                );
            case 'Legal':
                return (
                    <p>
                        Audit • Tax • Advisory • Compliance • FinTech • Crypto
                        Assets • Tokenisation • Real-World Assets
                    </p>
                );
            default:
                break;
        }
    };

    return (
        <div className={classes.locationAndFocusBox}>
            <h4>Focus</h4>
            {renderText()}
        </div>
    );
};

export default FocusTxt;
