import classes from './CategoryTxt.module.css';

const CategoryTxt = (props) => {
    const renderText = () => {
        switch (props.category) {
            case 'Marketing':
                return (
                    <p className={classes.categoryTxt}>
                        Marketing & Distribution for Tokenised Assets
                    </p>
                );
            case 'Legal':
                return (
                    <p className={classes.categoryTxt}>
                        Legal Structuring for Tokenised Real-World Assets
                    </p>
                );
            default:
                break;
        }
    };

    return <>{renderText()}</>;
};

export default CategoryTxt;
