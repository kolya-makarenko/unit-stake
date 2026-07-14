import ReadMoreText from '../../../../ReadMoreText/ReadMoreText';
import classes from './AdditionalInfo.module.css';

const AdditionalInfo = (props) => {
    const contentBlocks = (props?.content_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

    if (contentBlocks.length === 0) {
        return null;
    }

    return (
        <section className={classes.additionalInfo}>
            <div className="wrapper">
                <h2>Additional Info</h2>
                <div className={classes.additionalInfoContent}>
                    {contentBlocks.map((block, index) => {
                        switch (block.type) {
                            case 'h4':
                                return <h4 key={index}>{block.value}</h4>;
                            case 'p':
                                return (
                                    <ReadMoreText
                                        text={block.value}
                                        key={index}
                                    />
                                );
                            case 'image':
                                return (
                                    <img
                                        key={index}
                                        src={block.value}
                                        alt="Partner image"
                                    />
                                );
                            case 'case_link':
                                return (
                                    <a
                                        href={block.value.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        key={index}
                                    >
                                        {block.value.title}
                                    </a>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </div>
        </section>
    );
};

export default AdditionalInfo;
