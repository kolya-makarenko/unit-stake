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
                        Query.orderDesc('$createdAt'),
                        Query.limit(3),
                    ],
                });
                setPlatforms(response.rows);
            } catch (error) {
                console.error('Error fetching platforms:', error);
            }
        };
        fetchPlatforms();
    }, []);

    const formatAssetLabel = (value) => {
        if (value >= 1000 && value <= 999999) {
            return `${Math.round(value / 1000)}K`;
        } else if (value >= 1000000 && value <= 999999999) {
            return `${Math.round(value / 1000000)}M`;
        } else if (value >= 1000000000 && value <= 999999999999) {
            return `${Math.round(value / 1000000000)}B`;
        } else {
            return value;
        }
    };

    return (
        <section className={classes.platforms}>
            <div className="wrapper">
                <div className={classes.platformsHeader}>
                    <div className={classes.platformsHeaderTxt}>
                        <h2>Platforms</h2>
                        <p>RWA Platforms Across Asset Classes</p>
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
                    {platforms.length > 0 ? (
                        platforms.map((platform) => (
                            <div
                                key={platform.$id}
                                className={classes.platformCard}
                                onClick={() =>
                                    navigate(`/platforms/${platform.$id}`)
                                }
                            >
                                <div className={classes.platformCardInfo}>
                                    <div
                                        className={classes.platformCardMainInfo}
                                    >
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
                                    <div
                                        className={
                                            classes.platformCardInfoNumbers
                                        }
                                    >
                                        <div
                                            className={
                                                classes.platformCardInfoNumbersTotal
                                            }
                                        >
                                            <h4>
                                                Total Tokenized Asset Volume
                                            </h4>
                                            <h5>
                                                $
                                                {formatAssetLabel(
                                                    platform.assets,
                                                )}
                                            </h5>
                                        </div>
                                        <div
                                            className={
                                                classes.platformCardInfoNumbersTotal
                                            }
                                        >
                                            <h4>Operating since</h4>
                                            <p>{platform.platform_age}</p>
                                        </div>
                                    </div>
                                    <div
                                        className={classes.projectsCardLocation}
                                    >
                                        <div>
                                            <h4>Projects</h4>
                                            <h6>{platform.total_projects}</h6>
                                        </div>
                                        <div>
                                            <h4>Jurisdiction</h4>
                                            <h6>
                                                {platform.jurisdiction.length >
                                                0
                                                    ? platform.jurisdiction.join(
                                                          ', ',
                                                      )
                                                    : '—'}
                                            </h6>
                                        </div>
                                    </div>
                                    <div className={classes.projectsCardLink}>
                                        <div
                                            className={
                                                classes.projectsCardLinkBtn
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/platforms/${platform.$id}`,
                                                )
                                            }
                                        >
                                            <p>Open Platform</p>
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
                        ))
                    ) : (
                        <p className={classes.noPlatforms}>
                            No platforms available
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MainPagePlatforms;
