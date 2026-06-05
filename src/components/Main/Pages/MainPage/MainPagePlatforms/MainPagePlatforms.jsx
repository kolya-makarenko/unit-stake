import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_PLATFORMS,
} from '../../../../../lib/appwrite';
import classes from './MainPagePlatforms.module.css';

import platformImgNone from '../../../../../assets/images/mainPageImages/platformImgNone.png';

const MainPagePlatforms = () => {
    const [platforms, setPlatforms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$updatedAt'),
                        Query.limit(3),
                    ],
                });
                setPlatforms(response.rows);
                console.log(response.rows);
            } catch (error) {
                console.error('Error fetching platforms:', error);
            }
        };
        fetchPlatforms();
    }, []);

    return (
        <section className={classes.platforms}>
            <div className="wrapper">
                <div className={classes.platformsHeader}>
                    <div className={classes.platformsHeaderTxt}>
                        <h2>Platforms</h2>
                        <p>Curated RWA platforms across asset classes</p>
                    </div>
                    <button onClick={() => navigate('/platforms')}>
                        View All Platforms
                        <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.14307 17.4583L17.143 1.14307"
                                stroke="white"
                                strokeWidth="2.28571"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                            />
                            <path
                                d="M17.1433 13.8014V1.25735C17.1433 1.19423 17.0921 1.14307 17.029 1.14307H4.65771"
                                stroke="white"
                                strokeWidth="2.28571"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className={classes.platformsContainer}>
                    {platforms.map((platform) => (
                        <div
                            key={platform.$id}
                            className={classes.platformCard}
                        >
                            <div className={classes.platformCardInfo}>
                                <div className={classes.platformCardMainInfo}>
                                    <div
                                        className={
                                            classes.platformCardMainInfoImg
                                        }
                                    >
                                        {platform.image_url ? (
                                            <img
                                                src={platform.image_url}
                                                alt="platform image"
                                            />
                                        ) : (
                                            <img
                                                src={platformImgNone}
                                                alt="platform image"
                                            />
                                        )}
                                    </div>
                                    <div
                                        className={
                                            classes.platformCardMainInfoName
                                        }
                                    >
                                        <h3>{platform.name}</h3>
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

export default MainPagePlatforms;
