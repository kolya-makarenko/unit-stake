import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_NEWS,
} from '../../../../../lib/appwrite';

import classes from './AssetsPageMarket.module.css';

const AssetsPageMarket = () => {
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
                        Query.equal('category', 'News'),
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

    const getFirstText = (rawArray, type) => {
        if (!Array.isArray(rawArray) || rawArray.length === 0) {
            return null;
        }

        for (const jsonString of rawArray) {
            try {
                const parsedObj = JSON.parse(jsonString);

                if (parsedObj && parsedObj.type === type) {
                    return parsedObj.value;
                }
            } catch (error) {
                console.error('Error parsing array element:', error);
            }
        }

        return null;
    };

    return (
        <section className={`sectionMarginTop ${classes.market}`}>
            <div className="wrapper">
                <h2>Real Market Examples</h2>
                <p className={classes.marketHeaderText}>
                    How assets are already being structured and presented to
                    investors
                </p>
                <div className={classes.marketContainer}>
                    {news.map((item) => (
                        <div key={item.$id} className={classes.marketBox}>
                            <div className={classes.marketBoxImage}>
                                <img
                                    src={item.image_url}
                                    alt="market box image"
                                />
                            </div>
                            <div className={classes.marketBoxText}>
                                <h3>{item.title}</h3>
                                <h4>{item.description}</h4>
                                <div className={classes.marketBoxAmount}>
                                    {getFirstText(
                                        item.content_blocks,
                                        'heading',
                                    )}
                                </div>
                                <div className={classes.marketBoxLink}>
                                    <div
                                        className={classes.projectsCardLinkBtn}
                                        onClick={() =>
                                            navigate(`/insights/${item.$id}`)
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AssetsPageMarket;
