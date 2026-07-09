import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_NEWS,
} from '../../../../../lib/appwrite';

import classes from './Article.module.css';

import linkedinIcon from '../../../../../assets/images/icons/linkedin.svg';
import twitterIcon from '../../../../../assets/images/icons/twitter.svg';
import shareBtnCopyIcon from '../../../../../assets/images/icons/shareBtnCopy.svg';

const Article = () => {
    const { id: articleId } = useParams();
    const navigate = useNavigate();

    const [articleData, setArticleData] = useState({});

    const [copied, setCopied] = useState(false);
    const [activeHeadingId, setActiveHeadingId] = useState('');
    const headingRefs = useRef({});

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    rowId: articleId,
                });
                setArticleData(response);

                window.scrollTo(0, 0);
            } catch (error) {
                console.error('Error fetching article data:', error);
                alert('Failed to load article data.');
                navigate('/insights');
            }
        };
        fetchArticle();
    }, [articleId, navigate]);

    const contentBlocks = (articleData?.content_blocks || [])
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

        const headings = contentBlocks
            .map((block, index) =>
                block.type === 'heading' ? `heading${index}` : null,
            )
            .filter(Boolean);

        if (headings.length > 0) {
            setActiveHeadingId(headings[0]);
        }

        let observer;

        const timer = setTimeout(() => {
            const observerOptions = {
                root: null,
                rootMargin: '0px 0px -50% 0px',
                threshold: 0,
            };

            const observerCallback = (entries) => {
                if (window.scrollY <= 50 && headings.length > 0) {
                    setActiveHeadingId(headings[0]);
                    return;
                }

                entries.forEach((entry) => {
                    const currentId = entry.target.id;
                    const currentIndex = headings.indexOf(currentId);

                    if (entry.isIntersecting) {
                        setActiveHeadingId(currentId);
                    } else {
                        if (
                            entry.boundingClientRect.top > 0 &&
                            currentIndex > 0 &&
                            window.scrollY > 50
                        ) {
                            setActiveHeadingId(headings[currentIndex - 1]);
                        }
                    }
                });
            };

            observer = new IntersectionObserver(
                observerCallback,
                observerOptions,
            );

            Object.values(headingRefs.current).forEach((heading) => {
                if (heading) observer.observe(heading);
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            if (observer) observer.disconnect();
        };
    }, [articleData, contentBlocks.length]);

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const shareUrl = encodeURIComponent(
        typeof window !== 'undefined' ? window.location.href : '',
    );

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className={classes.articlePage}>
            <section className={classes.article}>
                <div className="wrapper">
                    <div className={classes.articleContainer}>
                        <div className={classes.articleContent}>
                            <div className={classes.articleContentMain}>
                                <p className={classes.articleDate}>
                                    {dateFormatter(articleData.$updatedAt)}
                                </p>
                                <h2>{articleData.title}</h2>
                                <h3>{articleData.description}</h3>
                                <div className={classes.articleAuthorShare}>
                                    <div className={classes.articleAuthor}>
                                        {articleData.author}
                                    </div>
                                    <div className={classes.shareButtons}>
                                        Share
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.shareBtn}
                                        >
                                            <img
                                                src={linkedinIcon}
                                                alt="linkedin"
                                            />
                                        </a>
                                        <a
                                            href={`https://x.com/intent/tweet?url=${shareUrl}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={classes.shareBtn}
                                        >
                                            <img
                                                src={twitterIcon}
                                                alt="twitter"
                                            />
                                        </a>
                                        <div
                                            onClick={copyToClipboard}
                                            className={classes.shareBtn}
                                        >
                                            <img
                                                src={shareBtnCopyIcon}
                                                alt="share link"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {articleData.image_url && (
                                    <div className={classes.articleImage}>
                                        <img
                                            src={articleData.image_url}
                                            alt="article image"
                                        />
                                    </div>
                                )}
                                <div className={classes.articleText}>
                                    {contentBlocks.map((block, index) => {
                                        const headingId = `heading${index}`;
                                        switch (block.type) {
                                            case 'heading':
                                                return (
                                                    <h4
                                                        key={index}
                                                        id={headingId}
                                                        ref={(el) =>
                                                            (headingRefs.current[
                                                                headingId
                                                            ] = el)
                                                        }
                                                        className={
                                                            classes.contentHeading
                                                        }
                                                    >
                                                        {block.value}
                                                    </h4>
                                                );
                                            case 'text':
                                                return (
                                                    <p
                                                        key={index}
                                                        className={
                                                            classes.contentText
                                                        }
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
                        <div className={classes.articleTable}>
                            <div className={classes.articleTableContainer}>
                                <h5>Table of Contents</h5>
                                {contentBlocks.map((block, index) => {
                                    const headingId = `heading${index}`;
                                    switch (block.type) {
                                        case 'heading':
                                            return (
                                                <HashLink
                                                    key={index}
                                                    smooth
                                                    to={`#${headingId}`}
                                                    className={`${classes.hashLink} ${
                                                        activeHeadingId ===
                                                        headingId
                                                            ? classes.activeHashLink
                                                            : ''
                                                    }`}
                                                >
                                                    {block.value}
                                                </HashLink>
                                            );

                                        default:
                                            return null;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Article;
