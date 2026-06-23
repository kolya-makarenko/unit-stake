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

const ITEMS_PER_PAGE = 9;

const PlatformsPage = () => {
    const [platforms, setPlatforms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const [availableJurisdictions, setAvailableJurisdictions] = useState([]);
    const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [minAvailableAssets, setMinAvailableAssets] = useState(100000000);
    const [maxAvailableAssets, setMaxAvailableAssets] = useState(100000000);
    const [selectedMaxAssets, setSelectedMaxAssets] = useState(100000000);

    const [isFiltersActive, setIsFiltersActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    queries: [Query.equal('is_published', true)],
                });

                const countries = response.rows
                    .map((row) => row.jurisdiction)
                    .filter(
                        (jurisdiction) =>
                            jurisdiction && jurisdiction.trim() !== '',
                    );

                const categories = response.rows
                    .map((row) => row.category)
                    .filter((category) => category && category.trim() !== '');

                const assetValues = response.rows
                    .map((row) => Number(row.assets))
                    .filter((val) => !isNaN(val));

                if (assetValues.length > 0) {
                    const maxAsset = Math.max(...assetValues);
                    setMaxAvailableAssets(maxAsset);
                    setSelectedMaxAssets(maxAsset);
                    const minAsset = Math.min(...assetValues);
                    setMinAvailableAssets(minAsset);
                }

                setAvailableJurisdictions([...new Set(countries)]);
                setAvailableCategories([...new Set(categories)]);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const offset = (currentPage - 1) * ITEMS_PER_PAGE;

                const queries = [
                    Query.orderDesc('$createdAt'),
                    Query.equal('is_published', true),
                    Query.limit(ITEMS_PER_PAGE),
                    Query.offset(offset),
                ];

                if (searchQuery.trim() !== '') {
                    queries.push(Query.contains('name', searchQuery));
                }

                if (selectedJurisdictions.length > 0) {
                    queries.push(
                        Query.equal('jurisdiction', selectedJurisdictions),
                    );
                }

                if (selectedCategories.length > 0) {
                    queries.push(Query.equal('category', selectedCategories));
                }

                queries.push(Query.lessThanEqual('assets', selectedMaxAssets));

                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    queries: queries,
                });

                setPlatforms(response.rows);
                setTotalCount(response.total);
            } catch (error) {
                console.error('Platforms loading error:', error);
            }
        };
        fetchPlatforms();
    }, [
        currentPage,
        searchQuery,
        selectedJurisdictions,
        selectedCategories,
        selectedMaxAssets,
    ]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleJurisdictionChange = (country) => {
        setCurrentPage(1);
        setSelectedJurisdictions((prevSelected) =>
            prevSelected.includes(country)
                ? prevSelected.filter((item) => item !== country)
                : [...prevSelected, country],
        );
    };

    const handleCategoryChange = (category) => {
        setCurrentPage(1);
        setSelectedCategories((prevSelected) =>
            prevSelected.includes(category)
                ? prevSelected.filter((item) => item !== category)
                : [...prevSelected, category],
        );
    };

    const handleAssetSliderChange = (e) => {
        setCurrentPage(1);
        setSelectedMaxAssets(Number(e.target.value));
    };

    const formatAssetLabel = (value) => {
        if (value >= 100000 && value <= 100000000) {
            return `${Math.round(value / 100000) / 10}M`;
        } else if (value >= 100000000) {
            return `${Math.round(value / 100000000) / 10}B`;
        } else {
            return value;
        }
    };

    const openFiltersMenu = () => {
        setIsFiltersActive(!isFiltersActive);
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
                        <div
                            className={
                                isFiltersActive
                                    ? `${classes.platformsFilters} ${classes.active}`
                                    : classes.platformsFilters
                            }
                        >
                            <div className={classes.filtersHeader}>
                                <h3>Filters</h3>
                            </div>
                            <div className={classes.platformsFiltersContainer}>
                                <div className={classes.platformsFilter}>
                                    <h4>Jurisdiction</h4>
                                    <div className={classes.checkboxList}>
                                        {availableJurisdictions.length > 0 ? (
                                            availableJurisdictions.map(
                                                (country) => (
                                                    <label
                                                        key={country}
                                                        className={
                                                            classes.checkboxLabel
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedJurisdictions.includes(
                                                                country,
                                                            )}
                                                            onChange={() =>
                                                                handleJurisdictionChange(
                                                                    country,
                                                                )
                                                            }
                                                        />
                                                        <span>{country}</span>
                                                    </label>
                                                ),
                                            )
                                        ) : (
                                            <p className={classes.noFilters}>
                                                No jurisdictions found
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.platformsFilter}>
                                    <h4>Asset Type</h4>
                                    <div className={classes.checkboxList}>
                                        {availableCategories.length > 0 ? (
                                            availableCategories.map(
                                                (category) => (
                                                    <label
                                                        key={category}
                                                        className={
                                                            classes.checkboxLabel
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedCategories.includes(
                                                                category,
                                                            )}
                                                            onChange={() =>
                                                                handleCategoryChange(
                                                                    category,
                                                                )
                                                            }
                                                        />
                                                        <span>{category}</span>
                                                    </label>
                                                ),
                                            )
                                        ) : (
                                            <p className={classes.noFilters}>
                                                No Asset Type found
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className={classes.platformsFilter}>
                                    <h4>Max Asset Volume</h4>
                                    <div
                                        className={classes.priceSliderContainer}
                                    >
                                        <div
                                            className={
                                                classes.selectedMaxAssets
                                            }
                                        >
                                            $
                                            {formatAssetLabel(
                                                selectedMaxAssets,
                                            )}
                                        </div>
                                        <input
                                            type="range"
                                            min={minAvailableAssets}
                                            max={maxAvailableAssets}
                                            value={selectedMaxAssets}
                                            onChange={handleAssetSliderChange}
                                            className={classes.slider}
                                        />
                                        <div className={classes.sliderLabels}>
                                            <span>
                                                $
                                                {formatAssetLabel(
                                                    minAvailableAssets,
                                                )}
                                            </span>
                                            <span>
                                                $
                                                {formatAssetLabel(
                                                    maxAvailableAssets,
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={
                                        classes.platformsFiltersMobileBtn
                                    }
                                >
                                    <button onClick={openFiltersMenu}>
                                        Close filters
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.platformsContainer}>
                            <div className={classes.platformsSearch}>
                                <div className={classes.filtersHeaderMobile}>
                                    <button onClick={openFiltersMenu}>
                                        Filters
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className={classes.searchInput}
                                />
                            </div>
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
                                                        <img
                                                            src={
                                                                platform.image_url ||
                                                                platformImgNone
                                                            }
                                                            alt="platform image"
                                                        />
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
                                                        <p>
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
                                                        {platform.platform_website ? (
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
                                                        ) : (
                                                            <p>
                                                                {platform.name}
                                                            </p>
                                                        )}
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
                                                        className={`${classes.PaginationBtnNumber} ${currentPage === pageNumber ? classes.active : ''}`}
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
