import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    Query,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
} from '../../../../lib/appwrite';

import classes from './PlatformsPage.module.css';

import platformImgNone from '../../../../assets/images/mainPageImages/platformImgNone.png';

const ITEMS_PER_PAGE = 1;

const PlatformsPage = () => {
    const [platforms, setPlatforms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const offset = (currentPage - 1) * ITEMS_PER_PAGE;

                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    queries: [
                        Query.orderDesc('$createdAt'),
                        Query.limit(ITEMS_PER_PAGE),
                        Query.offset(offset),
                    ],
                });
                setPlatforms(response.rows);
                setTotalCount(response.total);
                console.log(response.rows);
            } catch (error) {
                console.error('Platforms loading error:', error);
            }
        };
        fetchPlatforms();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    return (
        <main className={classes.platformsPage}>
            <section className={classes.header}>
                <div className="wrapper">
                    <h2>Platforms</h2>
                    <p>Discover projects with public and structured data</p>
                </div>
            </section>
            <section className={classes.platforms}>
                <div className="wrapper">
                    <div className={classes.platformsSection}>
                        <div className={classes.platformsFilters}>
                            <div className={classes.filtersHeader}>
                                <h3>Filters</h3>
                            </div>
                        </div>
                        <div className={classes.platformsContainer}>
                            <div className={classes.platformsGrid}>
                                {platforms.length > 0 ? (
                                    platforms.map((platform) => (
                                        <div
                                            key={platform.$id}
                                            className={classes.platformCard}
                                        >
                                            <div
                                                className={
                                                    classes.platformCardInfo
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.platformCardMainInfo
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.platformCardMainInfoImg
                                                        }
                                                    >
                                                        {platform.image_url ? (
                                                            <img
                                                                src={
                                                                    platform.image_url
                                                                }
                                                                alt="platform image"
                                                            />
                                                        ) : (
                                                            <img
                                                                src={
                                                                    platformImgNone
                                                                }
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
                                                            Total Tokenized
                                                            Asset Volume
                                                        </h4>
                                                        <h5>
                                                            $
                                                            {Math.round(
                                                                platform.assets /
                                                                    100000,
                                                            ) / 10}
                                                            M
                                                        </h5>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.platformCardInfoNumbersTotal
                                                        }
                                                    >
                                                        <h4>Platform Age</h4>
                                                        <p>
                                                            Operating since{' '}
                                                            {
                                                                platform.platform_age
                                                            }
                                                        </p>
                                                    </div>
                                                    <div
                                                        className={
                                                            classes.platformCardInfoNumbersTotal
                                                        }
                                                    >
                                                        <h4>
                                                            Ownership & Founders
                                                        </h4>
                                                        <a
                                                            href={
                                                                platform.platform_website
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {platform.name}{' '}
                                                            Website
                                                        </a>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        classes.projectsCardLocation
                                                    }
                                                >
                                                    <div>
                                                        <h4>Projects</h4>
                                                        <h6>
                                                            {
                                                                platform.total_projects
                                                            }
                                                        </h6>
                                                    </div>
                                                    <div>
                                                        <h4>Jurisdiction</h4>
                                                        <h6>
                                                            {
                                                                platform.jurisdiction
                                                            }
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        classes.projectsCardLink
                                                    }
                                                >
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
                            {totalPages > 1 && (
                                <div className={classes.Pagination}>
                                    <div className={classes.PaginationBtns}>
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className={
                                                classes.PaginationBtnPrev
                                            }
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
                                            Previous
                                        </button>
                                        {Array.from(
                                            { length: totalPages },
                                            (_, index) => {
                                                const pageNumber = index + 1;
                                                return (
                                                    <button
                                                        key={pageNumber}
                                                        onClick={() =>
                                                            setCurrentPage(
                                                                pageNumber,
                                                            )
                                                        }
                                                        className={`${classes.PaginationBtnNumber} ${
                                                            currentPage ===
                                                            pageNumber
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
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            className={
                                                classes.PaginationBtnNext
                                            }
                                        >
                                            Next
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
                </div>
            </section>
        </main>
    );
};

export default PlatformsPage;
