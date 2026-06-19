import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_PROJECTS,
} from '../../../../lib/appwrite';

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

    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [activeFilter, setActiveFilter] = useState(null);

    const [availableJurisdictions, setAvailableJurisdictions] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [availableTypes, setAvailableTypes] = useState([]);

    const [selectedJurisdictions, setSelectedJurisdictions] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [minAvailableInvestment, setMinAvailableInvestment] = useState(0);
    const [maxAvailableInvestment, setMaxAvailableInvestment] =
        useState(100000000);
    const [selectedMaxInvestment, setSelectedMaxInvestment] =
        useState(100000000);

    useEffect(() => {
        const initializeFilters = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.limit(500),
                    ],
                });

                const countriesSet = new Set();
                const categoriesSet = new Set();
                const tagsSet = new Set();
                const investments = [];

                response.rows.forEach((row) => {
                    if (row.country && typeof row.country === 'string') {
                        const trimmedCountry = row.country.trim();
                        if (trimmedCountry) countriesSet.add(trimmedCountry);
                    }

                    let catValue = '';
                    if (Array.isArray(row.category)) {
                        catValue = row.category[0];
                    } else if (typeof row.category === 'string') {
                        catValue = row.category;
                    }
                    if (catValue && catValue.trim()) {
                        categoriesSet.add(catValue.trim());
                    }

                    if (Array.isArray(row.filters)) {
                        row.filters.forEach((f) => {
                            if (f && typeof f === 'string' && f.trim()) {
                                tagsSet.add(f.trim());
                            }
                        });
                    }

                    const inv = Number(row.min_investment);
                    if (!isNaN(inv) && row.min_investment !== null) {
                        investments.push(inv);
                    }
                });

                setAvailableJurisdictions([...countriesSet]);
                setAvailableCategories([...categoriesSet]);
                setAvailableTypes([...tagsSet]);

                if (investments.length > 0) {
                    const maxInv = Math.max(...investments);
                    const minInv = Math.min(...investments);
                    setMaxAvailableInvestment(maxInv);
                    setMinAvailableInvestment(minInv);
                    setSelectedMaxInvestment(maxInv);
                }
            } catch (error) {
                console.error('Error initializing page filters:', error);
            }
        };

        initializeFilters();
    }, []);

    const fetchFilteredProjects = useCallback(async () => {
        const offset = (currentPage - 1) * ITEMS_PER_PAGE;
        const queries = [
            Query.equal('is_published', true),
            Query.orderDesc('$createdAt'),
            Query.limit(ITEMS_PER_PAGE),
            Query.offset(offset),
        ];

        if (selectedJurisdictions.length > 0) {
            queries.push(Query.equal('country', selectedJurisdictions));
        }

        if (selectedCategories.length > 0) {
            queries.push(Query.equal('category', selectedCategories));
        }

        if (selectedTypes.length > 0) {
            queries.push(Query.contains('filters', selectedTypes));
        }

        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PROJECTS,
                queries: queries,
            });
            setProjects(response.rows);
            setTotalCount(response.total);
        } catch (error) {
            console.error('Error loading filtered projects:', error);
        }
    }, [currentPage, selectedJurisdictions, selectedCategories, selectedTypes]);

    useEffect(() => {
        fetchFilteredProjects();
    }, [fetchFilteredProjects]);

    const displayedProjects = projects.filter((project) => {
        if (
            project.min_investment === null ||
            project.min_investment === undefined
        ) {
            return true;
        }
        return Number(project.min_investment) <= selectedMaxInvestment;
    });

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

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
        setCurrentPage(1);
        setSelectedJurisdictions((prev) =>
            prev.includes(country)
                ? prev.filter((item) => item !== country)
                : [...prev, country],
        );
    };

    const handleCategoryChange = (cat) => {
        setCurrentPage(1);
        setSelectedCategories((prev) =>
            prev.includes(cat)
                ? prev.filter((item) => item !== cat)
                : [...prev, cat],
        );
    };

    const handleTypeChange = (type) => {
        setCurrentPage(1);
        setSelectedTypes((prev) =>
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
                                onClick={() => toggleFilterPopup('assetType')}
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
                                onClick={() => toggleFilterPopup('types')}
                            >
                                Types{' '}
                                {activeFilter === 'types' ? arrowUp : arrowDown}
                            </div>
                        </div>
                        <div className={classes.projectsFilter}>
                            <div
                                className={`${classes.projectsFilterName} ${activeFilter === 'minTicket' ? classes.active : ''}`}
                                onClick={() => toggleFilterPopup('minTicket')}
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
                            {availableJurisdictions.map((country) => (
                                <label key={country}>
                                    <input
                                        type="checkbox"
                                        checked={selectedJurisdictions.includes(
                                            country,
                                        )}
                                        onChange={() =>
                                            handleJurisdictionChange(country)
                                        }
                                    />
                                    <span>{country}</span>
                                </label>
                            ))}
                        </div>
                    )}
                    {activeFilter === 'assetType' && (
                        <div className={classes.projectsFilterValues}>
                            {availableCategories.map((cat) => (
                                <label key={cat}>
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(
                                            cat,
                                        )}
                                        onChange={() =>
                                            handleCategoryChange(cat)
                                        }
                                    />
                                    <span>{cat}</span>
                                </label>
                            ))}
                        </div>
                    )}
                    {activeFilter === 'types' && (
                        <div className={classes.projectsFilterValues}>
                            {availableTypes.map((type) => (
                                <label key={type}>
                                    <input
                                        type="checkbox"
                                        checked={selectedTypes.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    )}
                    {activeFilter === 'minTicket' && (
                        <div className={classes.projectsFilterValues}>
                            <div className={classes.projectsFilterSlider}>
                                <div className={classes.selectedMaxInvestment}>
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
                    )}
                    <div className={classes.projectsContainer}>
                        {displayedProjects.length > 0 ? (
                            displayedProjects.map((project, index) => (
                                <div
                                    key={project.$id || index}
                                    className={classes.projectsCard}
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
                                            <p>
                                                $
                                                {Math.round(
                                                    project.current_investments /
                                                        100000,
                                                ) / 10}
                                                M / $
                                                {Math.round(
                                                    project.funding_goal /
                                                        100000,
                                                ) / 10}
                                                M
                                            </p>
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
                                                <p>${project.min_investment}</p>
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
                                                    {project.number_investors ||
                                                        0}
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
