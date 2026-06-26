import { useState, useRef, useEffect } from 'react';
import classes from './ReadMoreText.module.css';

const ReadMoreText = ({ text, maxLines = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTooLong, setIsTooLong] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (textRef.current) {
                const computedStyle = window.getComputedStyle(textRef.current);

                let lineHeight = parseFloat(computedStyle.lineHeight);

                if (isNaN(lineHeight)) {
                    lineHeight = parseFloat(computedStyle.fontSize) * 1.5;
                }

                const maxAllowedHeight = lineHeight * maxLines;

                const hasOverflow =
                    textRef.current.scrollHeight > maxAllowedHeight + 5;

                setIsTooLong(hasOverflow);
            }
        };

        checkOverflow();

        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [text, maxLines]);

    const textStyles = !isExpanded ? { WebkitLineClamp: maxLines } : {};

    return (
        <div className={classes.contentParagraph}>
            <p
                ref={textRef}
                style={textStyles}
                className={`${classes.textBlock} ${!isExpanded ? classes.clamped : ''}`}
            >
                {text}
            </p>

            {isTooLong && (
                <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={classes.readMoreBtn}
                >
                    {isExpanded ? 'Show less' : 'Read more'}
                </button>
            )}
        </div>
    );
};

export default ReadMoreText;
