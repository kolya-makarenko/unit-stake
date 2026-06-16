import { useState, useEffect } from 'react';
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

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            const offset = (currentPage - 1) * ITEMS_PER_PAGE;

            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$createdAt'),
                        Query.limit(ITEMS_PER_PAGE),
                        Query.offset(offset),
                    ],
                });
                setProjects(response.rows);
                setTotalCount(response.total);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const getFirstImageUrl = (rawArray) => {
        if (!Array.isArray(rawArray) || rawArray.length === 0) {
            return null;
        }

        for (const jsonString of rawArray) {
            try {
                const parsedObj = JSON.parse(jsonString);

                if (parsedObj && parsedObj.type === 'image') {
                    return parsedObj.value;
                }
            } catch (error) {
                console.error('Error parsing array element:', error);
            }
        }

        return null;
    };

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
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
                    <div className={classes.projectsContainer}>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div
                                    key={index}
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
                                                    width: `${Math.round(
                                                        (project.current_investments /
                                                            project.funding_goal) *
                                                            100,
                                                    )}%`,
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
                                                <p>
                                                    {Math.round(
                                                        (project.current_investments /
                                                            project.funding_goal) *
                                                            100,
                                                    )}
                                                    %
                                                </p>
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
                                                    {project.number_investors}
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
