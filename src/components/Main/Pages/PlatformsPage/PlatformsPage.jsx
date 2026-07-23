import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    Query,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
} from '../../../../lib/appwrite';

import classes from './PlatformsPage.module.css';
import platformImgNone from '../../../../assets/images/mainPageImages/platformImgNone.png';
import Loader from '../../../Loader/Loader';

const ITEMS_PER_PAGE = 9;

const PlatformsPage = () => {
    const [allPlatforms, setAllPlatforms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedInvestorTypes, setSelectedInvestorTypes] = useState([]);

    const [minAvailableAssets, setMinAvailableAssets] = useState(0);
    const [maxAvailableAssets, setMaxAvailableAssets] = useState(100000000);
    const [selectedMaxAssets, setSelectedMaxAssets] = useState(100000000);

    const [isFiltersActive, setIsFiltersActive] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPlatformsData = async () => {
            try {
                setIsLoading(true);
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$createdAt'),
                        Query.limit(500),
                    ],
                });

                const rows = response.rows || [];
                setAllPlatforms(rows);

                const assetValues = rows
                    .map((row) => Number(row.assets))
                    .filter((val) => !isNaN(val));

                if (assetValues.length > 0) {
                    const maxAsset = Math.max(...assetValues);
                    const minAsset = Math.min(...assetValues);
                    setMaxAvailableAssets(maxAsset);
                    setSelectedMaxAssets(maxAsset);
                    setMinAvailableAssets(minAsset);
                }
            } catch (error) {
                console.error('Error fetching platforms data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPlatformsData();
    }, []);

    const availableFilters = useMemo(() => {
        const jurisdictionsSet = new Set();
        const categoriesSet = new Set();
        const typesSet = new Set();
        const investorTypesSet = new Set();

        allPlatforms.forEach((platform) => {
            if (Array.isArray(platform.jurisdiction)) {
                platform.jurisdiction.forEach(
                    (j) => j && jurisdictionsSet.add(j.trim()),
                );
            }
            if (Array.isArray(platform.category)) {
                platform.category.forEach(
                    (c) => c && categoriesSet.add(c.trim()),
                );
            }
            if (Array.isArray(platform.filters)) {
                platform.filters.forEach((t) => t && typesSet.add(t.trim()));
            }
            if (Array.isArray(platform.investor_type)) {
                platform.investor_type.forEach(
                    (i) => i && investorTypesSet.add(i.trim()),
                );
            }
        });

        return {
            jurisdictions: [...jurisdictionsSet].sort(),
            categories: [...categoriesSet].sort(),
            types: [...typesSet].sort(),
            investorTypes: [...investorTypesSet].sort(),
        };
    }, [allPlatforms]);

    const filteredPlatforms = useMemo(() => {
        return allPlatforms.filter((platform) => {
            if (searchQuery.trim() !== '') {
                const nameMatch = platform.name
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase());
                if (!nameMatch) return false;
            }

            if (selectedJurisdictions.length > 0) {
                const hasJurisdiction = platform.jurisdiction?.some((j) =>
                    selectedJurisdictions.includes(j.trim()),
                );
                if (!hasJurisdiction) return false;
            }

            if (selectedCategories.length > 0) {
                const hasCategory = platform.category?.some((c) =>
                    selectedCategories.includes(c.trim()),
                );
                if (!hasCategory) return false;
            }

            if (selectedTypes.length > 0) {
                const hasType = platform.filters?.some((t) =>
                    selectedTypes.includes(t.trim()),
                );
                if (!hasType) return false;
            }

            if (selectedInvestorTypes.length > 0) {
                const hasInvestor = platform.investor_type?.some((i) =>
                    selectedInvestorTypes.includes(i.trim()),
                );
                if (!hasInvestor) return false;
            }

            const platformAssets = Number(platform.assets) || 0;
            if (platformAssets > selectedMaxAssets) return false;

            return true;
        });
    }, [
        allPlatforms,
        searchQuery,
        selectedJurisdictions,
        selectedCategories,
        selectedTypes,
        selectedInvestorTypes,
        selectedMaxAssets,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        searchQuery,
        selectedJurisdictions,
        selectedCategories,
        selectedTypes,
        selectedInvestorTypes,
        selectedMaxAssets,
    ]);

    const paginatedPlatforms = useMemo(() => {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPlatforms.slice(offset, offset + ITEMS_PER_PAGE);
    }, [filteredPlatforms, currentPage]);

    const totalPages = Math.ceil(filteredPlatforms.length / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleJurisdictionChange = (country) => {
        setSelectedJurisdictions((prev) =>
            prev.includes(country)
                ? prev.filter((item) => item !== country)
                : [...prev, country],
        );
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category],
        );
    };

    const handleTypeChange = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type],
        );
    };

    const handleInvestorTypeChange = (type) => {
        setSelectedInvestorTypes((prev) =>
            prev.includes(type)
                ? prev.filter((item) => item !== type)
                : [...prev, type],
        );
    };

    const handleAssetSliderChange = (e) => {
        setSelectedMaxAssets(Number(e.target.value));
    };

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

    const openFiltersMenu = () => {
        setIsFiltersActive(!isFiltersActive);
    };

    if (isLoading) {
        return (
            <main className={classes.platformsPage}>
                <Loader />
            </main>
        );
    }

    return (
        <main className={classes.platformsPage}>
            <section className={classes.header}>
                <div className="wrapper">
                    <h2>Platforms</h2>
                    <p>
                        Explore platforms across real-world assets, tokenized
                        products
                    </p>
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
                                        {availableFilters.jurisdictions.length >
                                        0 ? (
                                            availableFilters.jurisdictions.map(
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
                                        {availableFilters.categories.length >
                                        0 ? (
                                            availableFilters.categories.map(
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
                                                No Asset Types found
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className={classes.platformsFilter}>
                                    <h4>Token Types</h4>
                                    <div className={classes.checkboxList}>
                                        {availableFilters.types.length > 0 ? (
                                            availableFilters.types.map(
                                                (type) => (
                                                    <label
                                                        key={type}
                                                        className={
                                                            classes.checkboxLabel
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedTypes.includes(
                                                                type,
                                                            )}
                                                            onChange={() =>
                                                                handleTypeChange(
                                                                    type,
                                                                )
                                                            }
                                                        />
                                                        <span>{type}</span>
                                                    </label>
                                                ),
                                            )
                                        ) : (
                                            <p className={classes.noFilters}>
                                                No Types found
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className={classes.platformsFilter}>
                                    <h4>Investor Type</h4>
                                    <div className={classes.checkboxList}>
                                        {availableFilters.investorTypes.length >
                                        0 ? (
                                            availableFilters.investorTypes.map(
                                                (type) => (
                                                    <label
                                                        key={type}
                                                        className={
                                                            classes.checkboxLabel
                                                        }
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedInvestorTypes.includes(
                                                                type,
                                                            )}
                                                            onChange={() =>
                                                                handleInvestorTypeChange(
                                                                    type,
                                                                )
                                                            }
                                                        />
                                                        <span>{type}</span>
                                                    </label>
                                                ),
                                            )
                                        ) : (
                                            <p className={classes.noFilters}>
                                                No Investor Types found
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
                                    id="SearchPlatforms"
                                    type="text"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className={classes.searchInput}
                                />
                            </div>
                            <div className={classes.platformsGrid}>
                                {paginatedPlatforms.length > 0 ? (
                                    paginatedPlatforms.map((platform) => (
                                        <div
                                            key={platform.$id}
                                            className={classes.platformCard}
                                            onClick={() =>
                                                navigate(
                                                    `/platforms/${platform.$id}`,
                                                )
                                            }
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
                                                            {platform.jurisdiction &&
                                                            platform
                                                                .jurisdiction
                                                                .length > 0
                                                                ? platform.jurisdiction.join(
                                                                      ', ',
                                                                  )
                                                                : '—'}
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
