import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_PROJECTS,
} from '../../../../lib/appwrite';
import Loader from '../../../Loader/Loader';

import classes from './ProjectsPage.module.css';
import verifeidIcon from '../../../../assets/images/icons/verifeid.svg';

const ITEMS_PER_PAGE = 9;

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

const ProjectsPage = () => {
    const navigate = useNavigate();

    const [allProjects, setAllProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState(null);

    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedInvestorTypes, setSelectedInvestorTypes] = useState([]);

    const [minAvailableInvestment, setMinAvailableInvestment] = useState(0);
    const [maxAvailableInvestment, setMaxAvailableInvestment] =
        useState(100000000);
    const [selectedMaxInvestment, setSelectedMaxInvestment] =
        useState(100000000);

    useEffect(() => {
        const fetchAllProjectsData = async () => {
            try {
                setIsLoading(true);
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$createdAt'),
                        Query.limit(500),
                    ],
                });

                const rows = response.rows || [];
                setAllProjects(rows);

                const investments = rows
                    .map((row) => Number(row.min_investment))
                    .filter((inv) => !isNaN(inv) && inv !== null);

                if (investments.length > 0) {
                    const maxInv = Math.max(...investments);
                    const minInv = Math.min(...investments);
                    setMaxAvailableInvestment(maxInv);
                    setMinAvailableInvestment(minInv);
                    setSelectedMaxInvestment(maxInv);
                }
            } catch (error) {
                console.error('Error fetching all projects:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllProjectsData();
    }, []);

    const availableFilters = useMemo(() => {
        const countriesSet = new Set();
        const categoriesSet = new Set();
        const tagsSet = new Set();
        const investorTypesSet = new Set();

        allProjects.forEach((project) => {
            if (project.country && typeof project.country === 'string') {
                const trimmedCountry = project.country.trim();
                if (trimmedCountry) countriesSet.add(trimmedCountry);
            } else if (Array.isArray(project.country)) {
                project.country.forEach((c) => c && countriesSet.add(c.trim()));
            }

            if (Array.isArray(project.category)) {
                project.category.forEach(
                    (c) => c && categoriesSet.add(c.trim()),
                );
            } else if (
                project.category &&
                typeof project.category === 'string'
            ) {
                const trimmedCat = project.category.trim();
                if (trimmedCat) categoriesSet.add(trimmedCat);
            }

            if (Array.isArray(project.filters)) {
                project.filters.forEach((f) => {
                    if (f && typeof f === 'string' && f.trim()) {
                        tagsSet.add(f.trim());
                    }
                });
            }

            if (Array.isArray(project.investor_type)) {
                project.investor_type.forEach((i) => {
                    if (i && typeof i === 'string' && i.trim()) {
                        investorTypesSet.add(i.trim());
                    }
                });
            } else if (
                project.investor_type &&
                typeof project.investor_type === 'string'
            ) {
                const trimmedInv = project.investor_type.trim();
                if (trimmedInv) investorTypesSet.add(trimmedInv);
            }
        });

        return {
            jurisdictions: [...countriesSet].sort(),
            categories: [...categoriesSet].sort(),
            types: [...tagsSet].sort(),
            investorTypes: [...investorTypesSet].sort(),
        };
    }, [allProjects]);

    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            if (selectedJurisdictions.length > 0) {
                if (Array.isArray(project.country)) {
                    const hasJurisdiction = project.country.some((c) =>
                        selectedJurisdictions.includes(c?.trim()),
                    );
                    if (!hasJurisdiction) return false;
                } else {
                    const country = project.country?.trim();
                    if (!selectedJurisdictions.includes(country)) return false;
                }
            }

            if (selectedCategories.length > 0) {
                if (Array.isArray(project.category)) {
                    const hasCategory = project.category.some((c) =>
                        selectedCategories.includes(c?.trim()),
                    );
                    if (!hasCategory) return false;
                } else {
                    const cat = project.category?.trim();
                    if (!selectedCategories.includes(cat)) return false;
                }
            }

            if (selectedTypes.length > 0) {
                if (Array.isArray(project.filters)) {
                    const hasType = project.filters.some((f) =>
                        selectedTypes.includes(f?.trim()),
                    );
                    if (!hasType) return false;
                } else {
                    return false;
                }
            }

            if (selectedInvestorTypes.length > 0) {
                if (Array.isArray(project.investor_type)) {
                    const hasInvestorType = project.investor_type.some((i) =>
                        selectedInvestorTypes.includes(i?.trim()),
                    );
                    if (!hasInvestorType) return false;
                } else {
                    const invType = project.investor_type?.trim();
                    if (!selectedInvestorTypes.includes(invType)) return false;
                }
            }

            const minInv = Number(project.min_investment);
            if (!isNaN(minInv) && minInv > selectedMaxInvestment) return false;

            return true;
        });
    }, [
        allProjects,
        selectedJurisdictions,
        selectedCategories,
        selectedTypes,
        selectedInvestorTypes,
        selectedMaxInvestment,
    ]);

    useEffect(() => {
        setCurrentPage(1);
    }, [
        selectedJurisdictions,
        selectedCategories,
        selectedTypes,
        selectedInvestorTypes,
        selectedMaxInvestment,
    ]);

    const paginatedProjects = useMemo(() => {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(offset, offset + ITEMS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const getFirstImageUrl = (rawArray) => {
        if (!Array.isArray(rawArray) || rawArray.length === 0) return null;
        for (const jsonString of rawArray) {
            try {
                const parsedObj =
                    typeof jsonString === 'string'
                        ? JSON.parse(jsonString)
                        : jsonString;
                if (parsedObj && parsedObj.type === 'image') {
                    return parsedObj.value;
                }
            } catch (error) {
                console.error('Error parsing content block image:', error);
            }
        }
        return null;
    };

    const dateFormatter = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
    };

    const handleJurisdictionChange = (country) => {
        setSelectedJurisdictions((prev) =>
            prev.includes(country)
                ? prev.filter((item) => item !== country)
                : [...prev, country],
        );
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((item) => item !== cat)
                : [...prev, cat],
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

    const handleInvestmentSliderChange = (e) => {
        setSelectedMaxInvestment(Number(e.target.value));
    };

    const toggleFilterPopup = (filterName) => {
        setActiveFilter((prev) => (prev === filterName ? null : filterName));
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

    if (isLoading) {
        return (
            <main className={classes.projectsPage}>
                <Loader />
            </main>
        );
    }

    return (
        <main className={classes.projectsPage}>
            <section className={classes.header}>
                <div className="wrapper">
                    <h2>Projects</h2>
                    <p>Discover projects with public and structured data</p>
                </div>
            </section>
            <section className={classes.projects}>
                <div className="wrapper">
                    <button
                        className={`${classes.mobileFiltersBtn} ${isMobileFiltersOpen ? classes.btnActive : ''}`}
                        onClick={() => setIsMobileFiltersOpen((prev) => !prev)}
                    >
                        <span>Filters</span>
                    </button>

                    <div
                        className={`${classes.filtersWrapper} ${isMobileFiltersOpen ? classes.mobileOpen : ''}`}
                    >
                        <div className={classes.desktopFilters}>
                            <div className={classes.projectsFilters}>
                                <div className={classes.projectsFilter}>
                                    <div
                                        className={`${classes.projectsFilterName} ${activeFilter === 'jurisdiction' ? classes.active : ''}`}
                                        onClick={() =>
                                            toggleFilterPopup('jurisdiction')
                                        }
                                    >
                                        Jurisdiction{' '}
                                        {activeFilter === 'jurisdiction'
                                            ? arrowUp
                                            : arrowDown}
                                    </div>
                                </div>
                                <div className={classes.projectsFilter}>
                                    <div
                                        className={`${classes.projectsFilterName} ${activeFilter === 'assetType' ? classes.active : ''}`}
                                        onClick={() =>
                                            toggleFilterPopup('assetType')
                                        }
                                    >
                                        Asset Type{' '}
                                        {activeFilter === 'assetType'
                                            ? arrowUp
                                            : arrowDown}
                                    </div>
                                </div>
                                <div className={classes.projectsFilter}>
                                    <div
                                        className={`${classes.projectsFilterName} ${activeFilter === 'types' ? classes.active : ''}`}
                                        onClick={() =>
                                            toggleFilterPopup('types')
                                        }
                                    >
                                        Types{' '}
                                        {activeFilter === 'types'
                                            ? arrowUp
                                            : arrowDown}
                                    </div>
                                </div>
                                <div className={classes.projectsFilter}>
                                    <div
                                        className={`${classes.projectsFilterName} ${activeFilter === 'investorType' ? classes.active : ''}`}
                                        onClick={() =>
                                            toggleFilterPopup('investorType')
                                        }
                                    >
                                        Investor Type{' '}
                                        {activeFilter === 'investorType'
                                            ? arrowUp
                                            : arrowDown}
                                    </div>
                                </div>
                                <div className={classes.projectsFilter}>
                                    <div
                                        className={`${classes.projectsFilterName} ${activeFilter === 'minTicket' ? classes.active : ''}`}
                                        onClick={() =>
                                            toggleFilterPopup('minTicket')
                                        }
                                    >
                                        Minimum Ticket{' '}
                                        {activeFilter === 'minTicket'
                                            ? arrowUp
                                            : arrowDown}
                                    </div>
                                </div>
                            </div>

                            {activeFilter === 'jurisdiction' && (
                                <div className={classes.projectsFilterValues}>
                                    {availableFilters.jurisdictions.length >
                                    0 ? (
                                        availableFilters.jurisdictions.map(
                                            (country) => (
                                                <label key={country}>
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
                                            No active jurisdictions
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeFilter === 'assetType' && (
                                <div className={classes.projectsFilterValues}>
                                    {availableFilters.categories.length > 0 ? (
                                        availableFilters.categories.map(
                                            (cat) => (
                                                <label key={cat}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(
                                                            cat,
                                                        )}
                                                        onChange={() =>
                                                            handleCategoryChange(
                                                                cat,
                                                            )
                                                        }
                                                    />
                                                    <span>{cat}</span>
                                                </label>
                                            ),
                                        )
                                    ) : (
                                        <p className={classes.noFilters}>
                                            No active Asset Types
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeFilter === 'types' && (
                                <div className={classes.projectsFilterValues}>
                                    {availableFilters.types.length > 0 ? (
                                        availableFilters.types.map((type) => (
                                            <label key={type}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(
                                                        type,
                                                    )}
                                                    onChange={() =>
                                                        handleTypeChange(type)
                                                    }
                                                />
                                                <span>{type}</span>
                                            </label>
                                        ))
                                    ) : (
                                        <p className={classes.noFilters}>
                                            No active Types
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeFilter === 'investorType' && (
                                <div className={classes.projectsFilterValues}>
                                    {availableFilters.investorTypes.length >
                                    0 ? (
                                        availableFilters.investorTypes.map(
                                            (type) => (
                                                <label key={type}>
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
                                            No active Investor Types
                                        </p>
                                    )}
                                </div>
                            )}
                            {activeFilter === 'minTicket' && (
                                <div className={classes.projectsFilterValues}>
                                    <div
                                        className={classes.projectsFilterSlider}
                                    >
                                        <div
                                            className={
                                                classes.selectedMaxInvestment
                                            }
                                        >
                                            ${selectedMaxInvestment}
                                        </div>
                                        <input
                                            type="range"
                                            className={classes.slider}
                                            min={minAvailableInvestment}
                                            max={maxAvailableInvestment}
                                            value={selectedMaxInvestment}
                                            onChange={
                                                handleInvestmentSliderChange
                                            }
                                        />
                                        <div className={classes.sliderLabels}>
                                            <span>
                                                ${minAvailableInvestment}
                                            </span>
                                            <span>
                                                ${maxAvailableInvestment}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div
                            className={`${classes.mobileFilters} ${isMobileFiltersOpen ? classes.mobileOpen : ''}`}
                        >
                            <div className={classes.mobileFilterSection}>
                                <h4>Jurisdiction</h4>
                                <div className={classes.mobileFilterValuesList}>
                                    {availableFilters.jurisdictions.length >
                                    0 ? (
                                        availableFilters.jurisdictions.map(
                                            (country) => (
                                                <label key={country}>
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
                                            No active jurisdictions
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={classes.mobileFilterSection}>
                                <h4>Asset Type</h4>
                                <div className={classes.mobileFilterValuesList}>
                                    {availableFilters.categories.length > 0 ? (
                                        availableFilters.categories.map(
                                            (cat) => (
                                                <label key={cat}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(
                                                            cat,
                                                        )}
                                                        onChange={() =>
                                                            handleCategoryChange(
                                                                cat,
                                                            )
                                                        }
                                                    />
                                                    <span>{cat}</span>
                                                </label>
                                            ),
                                        )
                                    ) : (
                                        <p className={classes.noFilters}>
                                            No active Asset Types
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={classes.mobileFilterSection}>
                                <h4>Types</h4>
                                <div className={classes.mobileFilterValuesList}>
                                    {availableFilters.types.length > 0 ? (
                                        availableFilters.types.map((type) => (
                                            <label key={type}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedTypes.includes(
                                                        type,
                                                    )}
                                                    onChange={() =>
                                                        handleTypeChange(type)
                                                    }
                                                />
                                                <span>{type}</span>
                                            </label>
                                        ))
                                    ) : (
                                        <p className={classes.noFilters}>
                                            No active Types
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={classes.mobileFilterSection}>
                                <h4>Investor Type</h4>
                                <div className={classes.mobileFilterValuesList}>
                                    {availableFilters.investorTypes.length >
                                    0 ? (
                                        availableFilters.investorTypes.map(
                                            (type) => (
                                                <label key={type}>
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
                                            No active Investor Types
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className={classes.mobileFilterSection}>
                                <h4>Minimum Ticket</h4>
                                <div
                                    className={classes.mobileFilterSliderBlock}
                                >
                                    <div
                                        className={
                                            classes.selectedMaxInvestment
                                        }
                                    >
                                        ${selectedMaxInvestment}
                                    </div>
                                    <input
                                        type="range"
                                        className={classes.slider}
                                        min={minAvailableInvestment}
                                        max={maxAvailableInvestment}
                                        value={selectedMaxInvestment}
                                        onChange={handleInvestmentSliderChange}
                                    />
                                    <div className={classes.sliderLabels}>
                                        <span>${minAvailableInvestment}</span>
                                        <span>${maxAvailableInvestment}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className={`${classes.mobileFiltersBtn} ${classes.closeFiltersBtn}`}
                                onClick={() =>
                                    setIsMobileFiltersOpen((prev) => !prev)
                                }
                            >
                                <span>Close Filters</span>
                            </button>
                        </div>
                    </div>

                    <div className={classes.projectsContainer}>
                        {paginatedProjects.length > 0 ? (
                            paginatedProjects.map((project, index) => (
                                <div
                                    key={project.$id || index}
                                    className={classes.projectsCard}
                                    onClick={() =>
                                        navigate(`/projects/${project.$id}`)
                                    }
                                >
                                    <div className={classes.projectsCardImage}>
                                        {getFirstImageUrl(
                                            project.content_blocks,
                                        ) ? (
                                            <img
                                                src={getFirstImageUrl(
                                                    project.content_blocks,
                                                )}
                                                alt="project image"
                                                className={
                                                    classes.projectsCardImg
                                                }
                                            />
                                        ) : (
                                            <p>Project Image</p>
                                        )}
                                        {project.is_verified && (
                                            <div
                                                className={
                                                    classes.projectVerified
                                                }
                                            >
                                                <div className="verifeidBox">
                                                    <img
                                                        src={verifeidIcon}
                                                        alt="verifeid"
                                                    />
                                                    Verified By UnitStake
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={classes.projectsCardInfo}>
                                        <div
                                            className={
                                                classes.projectsCardMainInfo
                                            }
                                        >
                                            <h3>{project.name}</h3>
                                            <p>{project.description}</p>
                                        </div>
                                        <div
                                            className={
                                                classes.projectsCardProgressNumbers
                                            }
                                        >
                                            <h4>Funding Progress</h4>
                                            {project.current_investments > 0 &&
                                                project.funding_goal > 0 && (
                                                    <p>
                                                        $
                                                        {formatAssetLabel(
                                                            project.current_investments,
                                                        )}{' '}
                                                        / $
                                                        {formatAssetLabel(
                                                            project.funding_goal,
                                                        )}
                                                    </p>
                                                )}
                                        </div>
                                        <div
                                            className={
                                                classes.projectsCardProgressBar
                                            }
                                        >
                                            <div
                                                className={
                                                    classes.projectsCardProgressBarLine
                                                }
                                                style={{
                                                    width: `${project.funding_goal ? Math.round((project.current_investments / project.funding_goal) * 100) : 0}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div
                                            className={
                                                classes.projectsCardStats
                                            }
                                        >
                                            <div
                                                className={
                                                    classes.projectsCardStat
                                                }
                                            >
                                                <h4>Progress</h4>
                                                {project.current_investments &&
                                                project.funding_goal ? (
                                                    <p>
                                                        {Math.round(
                                                            (project.current_investments /
                                                                project.funding_goal) *
                                                                100,
                                                        )}
                                                        %
                                                    </p>
                                                ) : (
                                                    <p>0%</p>
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    classes.projectsCardStat
                                                }
                                            >
                                                <h4>Token Price</h4>
                                                {project.min_investment > 0 ? (
                                                    <p>
                                                        $
                                                        {formatAssetLabel(
                                                            project.min_investment,
                                                        )}
                                                    </p>
                                                ) : (
                                                    <p>$0</p>
                                                )}
                                            </div>
                                            <div
                                                className={
                                                    classes.projectsCardStat
                                                }
                                            >
                                                <h4>Deadline</h4>
                                                <p>
                                                    {dateFormatter(
                                                        project.deadline,
                                                    ) == '01.01.1970'
                                                        ? '*'
                                                        : dateFormatter(
                                                              project.deadline,
                                                          )}
                                                </p>
                                            </div>
                                            <div
                                                className={
                                                    classes.projectsCardStat
                                                }
                                            >
                                                <h4>Investors</h4>
                                                <p>
                                                    {project.number_investors
                                                        ? project.number_investors
                                                        : '*'}
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={classes.projectsCardLink}
                                        >
                                            <div
                                                className={
                                                    classes.projectsCardLinkBtn
                                                }
                                                onClick={() =>
                                                    navigate(
                                                        `/projects/${project.$id}`,
                                                    )
                                                }
                                            >
                                                <p>View Details</p>
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
                            <p className={classes.noProjects}>
                                No projects available
                            </p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className={classes.Pagination}>
                            <div className={classes.PaginationBtns}>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={classes.PaginationBtnPrev}
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
                                                    setCurrentPage(pageNumber)
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
                                    disabled={currentPage === totalPages}
                                    className={classes.PaginationBtnNext}
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
            </section>
        </main>
    );
};

export default ProjectsPage;
