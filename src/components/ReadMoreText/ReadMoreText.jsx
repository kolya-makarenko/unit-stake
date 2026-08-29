import { useState, useRef, useEffect } from 'react';
import classes from './ReadMoreText.module.css';

const ReadMoreSection = ({ children, maxLines = 10 }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTooLong, setIsTooLong] = useState(false);
    const [maxHeightPx, setMaxHeightPx] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (!contentRef.current) return;

            const container = contentRef.current;
            const childrenNodes = Array.from(container.children);
            if (childrenNodes.length === 0) return;

            const containerRect = container.getBoundingClientRect();

            let currentLines = 0;
            let hasOverflow = false;
            let calculatedMaxHeight = 0;

            for (const node of childrenNodes) {
                const nodeRect = node.getBoundingClientRect();
                const nodeTop = nodeRect.top - containerRect.top;

                const isMedia =
                    node.tagName === 'IMG' ||
                    node.tagName === 'IFRAME' ||
                    node.querySelector('img') ||
                    node.querySelector('iframe');

                let nodeLines = 1;
                let nodeLineHeight = nodeRect.height;

                if (!isMedia) {
                    const computedStyle = window.getComputedStyle(node);
                    let parsedLineHeight = parseFloat(computedStyle.lineHeight);

                    if (isNaN(parsedLineHeight) || parsedLineHeight === 0) {
                        parsedLineHeight =
                            parseFloat(computedStyle.fontSize) * 1.4 || 20;
                    }
                    nodeLineHeight = parsedLineHeight;

                    const paddingTop = parseFloat(
                        computedStyle.paddingTop || 0,
                    );
                    const paddingBottom = parseFloat(
                        computedStyle.paddingBottom || 0,
                    );
                    const contentHeight =
                        nodeRect.height - paddingTop - paddingBottom;

                    nodeLines = Math.max(
                        1,
                        Math.round(contentHeight / nodeLineHeight),
                    );
                }

                if (currentLines + nodeLines > maxLines) {
                    hasOverflow = true;
                    const neededLines = maxLines - currentLines;

                    if (neededLines <= 0) {
                        calculatedMaxHeight = nodeTop;
                    } else if (isMedia) {
                        calculatedMaxHeight = nodeTop + nodeRect.height;
                    } else {
                        const computedStyle = window.getComputedStyle(node);
                        const paddingTop = parseFloat(
                            computedStyle.paddingTop || 0,
                        );

                        calculatedMaxHeight =
                            nodeTop + paddingTop + neededLines * nodeLineHeight;
                    }
                    break;
                } else {
                    currentLines += nodeLines;
                    calculatedMaxHeight = nodeTop + nodeRect.height;
                }
            }

            setIsTooLong(hasOverflow);
            setMaxHeightPx(calculatedMaxHeight);
        };

        checkOverflow();

        const timer = setTimeout(checkOverflow, 100);

        window.addEventListener('resize', checkOverflow);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkOverflow);
        };
    }, [children, maxLines]);

    return (
        <div className={classes.contentParagraph}>
            <div
                ref={contentRef}
                style={
                    !isExpanded && isTooLong && maxHeightPx !== null
                        ? { maxHeight: `${maxHeightPx}px`, overflow: 'hidden' }
                        : {}
                }
            >
                {children}
            </div>

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

export default ReadMoreSection;
