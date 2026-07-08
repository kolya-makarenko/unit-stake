import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    Query,
    DATABASE_ID,
    TABLE_ID_NEWS,
    TABLE_ID_CATEGORIES,
} from '../../../../../lib/appwrite';
import classes from './News.module.css';

const arrowDown = (
    <svg
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.849609 0.849976L6.34961 5.84998L11.8496 0.849976"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
        />
    </svg>
);

const arrowUp = (
    <svg
        className={classes.arrowUp}
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.849609 0.849976L6.34961 5.84998L11.8496 0.849976"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
        />
    </svg>
);

const ITEMS_PER_PAGE = 7;

const News = () => {
    const [articles, setArticles] = useState([]);
    const [popularArticles, setPopularArticles] = useState([]);
    const [trendingTopicsList, setTrendingTopicsList] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [sortBy, setSortBy] = useState('newest');

    const [activeTab, setActiveTab] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.equal('category', 'News & Market'),
                        Query.limit(500),
                    ],
                });
                setArticles(response.rows);

                const responsePopular = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_NEWS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.equal('is_popular', true),
                        Query.equal('category', 'News & Market'),
                        Query.orderDesc('$updatedAt'),
                        Query.limit(6),
                    ],
                });
                setPopularArticles(responsePopular.rows);

                const responseCategories = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_CATEGORIES,
                });
                if (
                    responseCategories.rows &&
                    responseCategories.rows.length > 0
                ) {
                    setTrendingTopicsList(
                        responseCategories.rows[0].trending_topics || [],
                    );
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedTopics, sortBy]);

    const toggleTab = (tabName) => {
        setActiveTab((prevTab) => (prevTab === tabName ? null : tabName));
    };

    const activeTrendingTopics = useMemo(() => {
        const topicsInArticles = new Set();

        articles.forEach((article) => {
            if (
                article.trending_topics &&
                Array.isArray(article.trending_topics)
            ) {
                article.trending_topics.forEach((topic) => {
                    if (topic) topicsInArticles.add(topic);
                });
            }
        });

        return trendingTopicsList.filter((topic) =>
            topicsInArticles.has(topic),
        );
    }, [articles, trendingTopicsList]);

    const filteredArticles = useMemo(() => {
        let result = [...articles];

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter((article) =>
                article.title?.toLowerCase().includes(query),
            );
        }

        if (selectedTopics.length > 0) {
            result = result.filter(
                (article) =>
                    article.trending_topics &&
                    selectedTopics.some((topic) =>
                        article.trending_topics.includes(topic),
                    ),
            );
        }

        const now = new Date();
        if (sortBy === 'week') {
            const oneWeekAgo = new Date(
                now.getTime() - 7 * 24 * 60 * 60 * 1000,
            );
            result = result.filter(
                (article) => new Date(article.$createdAt) >= oneWeekAgo,
            );
        } else if (sortBy === 'month') {
            const oneMonthAgo = new Date(
                now.getTime() - 30 * 24 * 60 * 60 * 1000,
            );
            result = result.filter(
                (article) => new Date(article.$createdAt) >= oneMonthAgo,
            );
        }

        if (sortBy === 'oldest') {
            result.sort(
                (a, b) => new Date(a.$createdAt) - new Date(b.$createdAt),
            );
        } else {
            result.sort(
                (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt),
            );
        }

        return result;
    }, [articles, searchQuery, selectedTopics, sortBy]);

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const displayedArticles = filteredArticles.slice(
        offset,
        offset + ITEMS_PER_PAGE,
    );

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleTopicCheckboxChange = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <section className={classes.news}>
            <div className="wrapper">
                <div className={classes.filters}>
                    <div className={classes.searchWrapper}>
                        <input
                            type="text"
                            placeholder="Start typing to search"
                            className={classes.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    {activeTrendingTopics.length > 0 && (
                        <div
                            className={classes.topicsFilter}
                            onClick={() => toggleTab('topics')}
                        >
                            <span>Trending Topics</span>
                            {activeTab === 'topics' ? arrowUp : arrowDown}
                        </div>
                    )}
                    <div
                        className={classes.sortFilter}
                        onClick={() => toggleTab('sort')}
                    >
                        <span>Sort by</span>
                        {activeTab === 'sort' ? arrowUp : arrowDown}
                    </div>
                </div>
                <div className={classes.filtersResults}>
                    {activeTab === 'topics' && (
                        <div className={classes.filtersResult}>
                            {activeTrendingTopics.map((topic, index) => (
                                <label key={index}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTopics.includes(topic)}
                                        onChange={() =>
                                            handleTopicCheckboxChange(topic)
                                        }
                                    />
                                    <span>{topic}</span>
                                </label>
                            ))}
                        </div>
                    )}
                    {activeTab === 'sort' && (
                        <div className={classes.filtersResult}>
                            <label>
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="newest"
                                    checked={sortBy === 'newest'}
                                    onChange={() => setSortBy('newest')}
                                />
                                <span>New at first</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="oldest"
                                    checked={sortBy === 'oldest'}
                                    onChange={() => setSortBy('oldest')}
                                />
                                <span>First, the old ones</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="week"
                                    checked={sortBy === 'week'}
                                    onChange={() => setSortBy('week')}
                                />
                                <span>New this week</span>
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sortBy"
                                    value="month"
                                    checked={sortBy === 'month'}
                                    onChange={() => setSortBy('month')}
                                />
                                <span>New this month</span>
                            </label>
                        </div>
                    )}
                </div>
                <div className={classes.articles}>
                    {displayedArticles.length > 0 ? (
                        displayedArticles.map((article) => (
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
                                <div className={classes.articleInfo}>
                                    <div className={classes.articleCategory}>
                                        {article.category}
                                    </div>
                                    <h4>{article.title}</h4>
                                    <div className={classes.articleDescription}>
                                        {article.description}
                                    </div>
                                    <div className={classes.articleDateAndLink}>
                                        <div className={classes.articleDate}>
                                            {dateFormatter(article.$updatedAt)}
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
                        ))
                    ) : (
                        <p className={classes.noArticles}>No articles found.</p>
                    )}
                    {popularArticles.length > 0 ? (
                        <div className={classes.popularArticles}>
                            <h3>Popular This Month</h3>
                            <ul>
                                {popularArticles.map((article) => (
                                    <li
                                        key={article.$id}
                                        onClick={() =>
                                            navigate(`/insights/${article.$id}`)
                                        }
                                    >
                                        <h4>{article.title}</h4>
                                        <p>{article.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className={classes.popularArticles}>
                            <h3>Popular This Month</h3>
                            <h4>No popular articles available</h4>
                        </div>
                    )}
                </div>
                <div className={classes.paginationContainer}>
                    {totalPages > 1 && (
                        <div className={classes.pagination}>
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
