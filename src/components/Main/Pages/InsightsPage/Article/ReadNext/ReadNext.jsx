import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_NEWS,
    Query,
} from '../../../../../../lib/appwrite';
import classes from './ReadNext.module.css';

const ReadNext = () => {
    const [news, setNews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$createdAt'),
                        Query.limit(3),
                    ],
                });
                setNews(response.rows);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };
        fetchNews();
    }, []);

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <>
            {news && (
                <section className={classes.readNext}>
                    <div className="wrapper">
                        <h2>Read next</h2>
                        <div className={classes.readNextContainer}>
                            {news.map((article) => (
                                <div
                                    key={article.$id}
                                    className={classes.article}
                                    onClick={() =>
                                        navigate(`/insights/${article.$id}`)
                                    }
                                >
                                    {article.image_url ? (
                                        <div className={classes.articleImage}>
                                            <img
                                                src={article.image_url}
                                                alt="Article image"
                                            />
                                        </div>
                                    ) : (
                                        <div className={classes.articleImage}>
                                            Article Image
                                        </div>
                                    )}
                                    <div className={classes.articleInfo}>
                                        <div
                                            className={classes.articleCategory}
                                        >
                                            {article.category}
                                        </div>
                                        <h4>{article.title}</h4>
                                        <div
                                            className={
                                                classes.articleDescription
                                            }
                                        >
                                            {article.description}
                                        </div>
                                        <div
                                            className={
                                                classes.articleDateAndLink
                                            }
                                        >
                                            <div
                                                className={classes.articleDate}
                                            >
                                                {dateFormatter(
                                                    article.$updatedAt,
                                                )}
                                            </div>
                                            <button>
                                                <span>Read more</span>
                                                <svg
                                                    width="16"
                                                    height="17"
                                                    viewBox="0 0 16 17"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1 15.2758L15 1"
                                                        stroke="#D34329"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                    />
                                                    <path
                                                        d="M14.9991 12.0761V1.1C14.9991 1.04477 14.9543 1 14.8991 1H4.07422"
                                                        stroke="#D34329"
                                                        strokeWidth="2"
                                                        strokeMiterlimit="10"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    );
};

export default ReadNext;
