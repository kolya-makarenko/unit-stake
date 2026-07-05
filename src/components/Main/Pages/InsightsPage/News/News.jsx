import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    Query,
    DATABASE_ID,
    TABLE_ID_NEWS,
} from '../../../../../lib/appwrite';
import classes from './News.module.css';

const ITEMS_PER_PAGE = 7;

const News = () => {
    const [articles, setArticles] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const offset = (currentPage - 1) * ITEMS_PER_PAGE;

                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.equal('category', 'News & Market'),
                        Query.orderDesc('$createdAt'),
                        Query.limit(ITEMS_PER_PAGE),
                        Query.offset(offset),
                    ],
                });
                setArticles(response.rows);
                setTotalCount(response.total);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };
        fetchArticles();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <section className={classes.news}>
            <div className="wrapper">
                <div className={classes.articles}>
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div
                                key={article.$id}
                                className={classes.article}
                                onClick={() =>
                                    navigate(`/insights/${article.$id}`)
                                }
                            >
                                <div className={classes.articlePic}>
                                    {article.image_url ? (
                                        <img
                                            src={article.image_url}
                                            alt="article picture"
                                        />
                                    ) : (
                                        <div className={classes.noPic}>
                                            Article picture not available
                                        </div>
                                    )}
                                </div>
                                <div className={classes.articleCategory}>
                                    {article.category}
                                </div>
                                <h4>{article.title}</h4>
                                <div className={classes.articleDescription}>
                                    {article.description}
                                </div>
                                <div className={classes.articleDateAndLink}>
                                    <div className={classes.articleDate}></div>
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
                        ))
                    ) : (
                        <p className={classes.noArticles}>No articles found.</p>
                    )}
                </div>
                <div className={classes.paginationContainer}>
                    {totalPages > 1 && (
                        <div className={classes.pagination}>
                            <h4 className={classes.paginationInfo}>
                                Showing {currentPage} of {totalPages} articles
                            </h4>
                            <div className={classes.paginationBtns}>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={classes.paginationBtnPrev}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.25 10.5L8.75 7L5.25 3.5"
                                            stroke="#808080"
                                            strokeWidth="1.16667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                {Array.from(
                                    { length: totalPages },
                                    (_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                            <button
                                                key={pageNumber}
                                                onClick={() =>
                                                    setCurrentPage(pageNumber)
                                                }
                                                className={`${classes.paginationBtnNumber} ${
                                                    currentPage === pageNumber
                                                        ? classes.active
                                                        : ''
                                                }`}
                                            >
                                                {pageNumber}
                                            </button>
                                        );
                                    },
                                )}
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={classes.paginationBtnNext}
                                >
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.25 10.5L8.75 7L5.25 3.5"
                                            stroke="#808080"
                                            strokeWidth="1.16667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default News;
