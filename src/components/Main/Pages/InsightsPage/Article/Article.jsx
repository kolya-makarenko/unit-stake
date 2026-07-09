import { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    rowId: articleId,
                });
                setArticleData(response);
                console.log(response);
            } catch (error) {
                console.error('Error fetching article data:', error);
                alert('Failed to load article data.');
                navigate('/insights');
            }
        };
        fetchArticle();
    }, [articleId, navigate]);

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
    console.log(contentBlocks);

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
                                <div className={classes.articleImage}>
                                    <img
                                        src={articleData.image_url}
                                        alt="article image"
                                    />
                                </div>
                                <div className={classes.articleText}>
                                    {contentBlocks.map((block, index) => {
                                        switch (block.type) {
                                            case 'heading':
                                                return (
                                                    <h4
                                                        key={index}
                                                        id={`heading${index}`}
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
                                {contentBlocks.map((block, index) => {
                                    switch (block.type) {
                                        case 'heading':
                                            return (
                                                <HashLink
                                                    key={index}
                                                    smooth
                                                    to={`#heading${index}`}
                                                    className={classes.hashLink}
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
