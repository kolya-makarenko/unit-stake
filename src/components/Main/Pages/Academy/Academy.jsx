import { useState, useEffect, useRef } from 'react';
import { HashLink } from 'react-router-hash-link';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_ACADEMY,
} from '../../../../lib/appwrite';
import classes from './Academy.module.css';

const Academy = () => {
    const [blocks, setBlocks] = useState([]);

    const [activeHeadingId, setActiveHeadingId] = useState('');
    const headingRefs = useRef({});

    useEffect(() => {
        const fetchBlocks = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_ACADEMY,
                });
                setBlocks(response.rows[0]);
                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchBlocks();
    }, []);

    const contentBlocks = (blocks?.content_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

    useEffect(() => {
        if (contentBlocks.length === 0) return;

        const targets = contentBlocks
            .map((block, index) =>
                block.type === 'h3' || block.type === 'h4'
                    ? `block-${index}`
                    : null,
            )
            .filter(Boolean);

        if (targets.length > 0) {
            setActiveHeadingId(targets[0]);
        }

        let observer;

        const timer = setTimeout(() => {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -50% 0px',
                threshold: 0,
            };

            const observerCallback = (entries) => {
                if (window.scrollY <= 50 && targets.length > 0) {
                    setActiveHeadingId(targets[0]);
                    return;
                }

                entries.forEach((entry) => {
                    const currentId = entry.target.id;
                    const currentIndex = targets.indexOf(currentId);

                    if (entry.isIntersecting) {
                        setActiveHeadingId(currentId);
                    } else {
                        if (
                            entry.boundingClientRect.top > 0 &&
                            currentIndex > 0 &&
                            window.scrollY > 50
                        ) {
                            setActiveHeadingId(targets[currentIndex - 1]);
                        }
                    }
                });
            };

            observer = new IntersectionObserver(
                observerCallback,
                observerOptions,
            );

            Object.values(headingRefs.current).forEach((target) => {
                if (target) observer.observe(target);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [contentBlocks.length]);

    const activeIndex = activeHeadingId
        ? parseInt(activeHeadingId.replace('block-', ''), 10)
        : -1;

    let activeH3Index = -1;
    if (activeIndex !== -1) {
        for (let i = activeIndex; i >= 0; i--) {
            if (contentBlocks[i]?.type === 'h3') {
                activeH3Index = i;
                break;
            }
        }
    }

    return (
        <main className={classes.academyPage}>
            <section className={classes.heroSection}>
                <div className="wrapper">
                    <div className={classes.heroSectionContainer}>
                        <div className={classes.fakeBtn}>
                            <div className={classes.fakeBtnContainer}>
                                <div className={classes.fakeBtnCircle}></div>
                                <p>Beyond Tokens: Structure Matters</p>
                            </div>
                        </div>
                        <h2>
                            Understand how tokenized assets really work - before
                            you trust them
                        </h2>
                        <p className={classes.secondaryTxt}>
                            This Academy explains how real-world asset
                            tokenization works - from legal architecture to
                            capital flows - so you can evaluate projects based
                            on structure, not assumptions.
                        </p>
                    </div>
                </div>
            </section>
            <section className={classes.content}>
                <div className="wrapper">
                    <div className={classes.contentContainer}>
                        <aside>
                            <div className={classes.HashLinks}>
                                {contentBlocks.map((block, index) => {
                                    const blockId = `block-${index}`;
                                    switch (block.type) {
                                        case 'h3':
                                            return (
                                                <HashLink
                                                    key={index}
                                                    smooth
                                                    to={`#${blockId}`}
                                                    className={`${classes.hashLink} ${
                                                        activeHeadingId ===
                                                        blockId
                                                            ? classes.activeHashLink
                                                            : ''
                                                    }`}
                                                >
                                                    {block.value}
                                                </HashLink>
                                            );
                                        case 'h4': {
                                            let parentH3Index = -1;
                                            for (let i = index; i >= 0; i--) {
                                                if (
                                                    contentBlocks[i]?.type ===
                                                    'h3'
                                                ) {
                                                    parentH3Index = i;
                                                    break;
                                                }
                                            }

                                            if (
                                                parentH3Index !==
                                                    activeH3Index ||
                                                activeH3Index === -1
                                            ) {
                                                return null;
                                            }

                                            return (
                                                <HashLink
                                                    key={index}
                                                    smooth
                                                    to={`#${blockId}`}
                                                    className={`${classes.secondaryHashLink} ${
                                                        activeHeadingId ===
                                                        blockId
                                                            ? classes.activeSecondaryHashLink
                                                            : ''
                                                    }`}
                                                >
                                                    {block.value}
                                                </HashLink>
                                            );
                                        }
                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        </aside>
                        <div className={classes.contentBlocks}>
                            {contentBlocks.map((block, index) => {
                                const blockId = `block-${index}`;
                                switch (block.type) {
                                    case 'h3':
                                        return (
                                            <h3
                                                key={index}
                                                id={blockId}
                                                ref={(el) =>
                                                    (headingRefs.current[
                                                        blockId
                                                    ] = el)
                                                }
                                                className={
                                                    classes.contentHeading
                                                }
                                            >
                                                {block.value}
                                            </h3>
                                        );
                                    case 'h4':
                                        return (
                                            <h4
                                                key={index}
                                                id={blockId}
                                                ref={(el) =>
                                                    (headingRefs.current[
                                                        blockId
                                                    ] = el)
                                                }
                                                className={
                                                    classes.contentSubtitle
                                                }
                                            >
                                                {block.value}
                                            </h4>
                                        );
                                    case 'strong':
                                        return (
                                            <b
                                                key={index}
                                                className={
                                                    classes.contentBoldTxt
                                                }
                                            >
                                                {block.value}
                                            </b>
                                        );
                                    case 'p':
                                        return (
                                            <p
                                                key={index}
                                                className={classes.contentText}
                                            >
                                                {block.value}
                                            </p>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Academy;
