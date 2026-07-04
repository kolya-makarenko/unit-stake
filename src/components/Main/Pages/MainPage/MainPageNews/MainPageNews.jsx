import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_NEWS,
} from '../../../../../lib/appwrite';
import classes from './MainPageNews.module.css';

const MainPageNews = () => {
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
                        Query.equal('category', 'Insights'),
                        Query.orderDesc('$updatedAt'),
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
        return date.toLocaleDateString();
    };

    return (
        <section className={classes.news}>
            <div className="wrapper">
                <div className={classes.newsHeader}>
                    <div className={classes.newsHeaderTxt}>
                        <h2>Insights, Research & Market Updates</h2>
                        <p>
                            Stay informed with market insights, emerging trends,
                            and key developments <br /> shaping tokenised real
                            estate.
                        </p>
                    </div>
                    <button onClick={() => navigate('/insights')}>
                        Explore More
                    </button>
                </div>
                <div className={classes.newsContainer}>
                    {news.length > 0 ? (
                        news.map((article, index) => (
                            <article key={index} className={classes.article}>
                                <div className={classes.articleImg}>
                                    <img
                                        src={article.image_url}
                                        alt="article image"
                                    />
                                </div>
                                <div className={classes.articleInfo}>
                                    <div className={classes.articleAuthor}>
                                        {article.author}
                                    </div>
                                    <div className={classes.articleTitle}>
                                        {article.title}
                                    </div>
                                    <div className={classes.articleDescription}>
                                        {article.description}
                                    </div>
                                    <div className={classes.articleLink}>
                                        <h5>
                                            {dateFormatter(article.$updatedAt)}
                                        </h5>
                                        <div
                                            className={
                                                classes.projectsCardLinkBtn
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/insights/${article.$id}`,
                                                )
                                            }
                                        >
                                            <p>Read more</p>
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
                                                    d="M15 12.0761V1.1C15 1.04477 14.9553 1 14.9 1H4.0752"
                                                    stroke="#D34329"
                                                    strokeWidth="2"
                                                    strokeMiterlimit="10"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className={classes.noNews}>
                            No articles available
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MainPageNews;
