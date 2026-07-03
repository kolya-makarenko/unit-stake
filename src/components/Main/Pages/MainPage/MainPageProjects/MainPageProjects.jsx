import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    Query,
    TABLE_ID_PROJECTS,
} from '../../../../../lib/appwrite';
import classes from './MainPageProjects.module.css';

const MainPageProjects = () => {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.orderDesc('$createdAt'),
                        Query.limit(3),
                    ],
                });
                setProjects(response.rows);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

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

    const formatAssetLabel = (value) => {
        if (value >= 100000 && value <= 100000000) {
            return `${Math.round(value / 100000) / 10}M`;
        } else if (value >= 100000000) {
            return `${Math.round(value / 100000000) / 10}B`;
        } else {
            return value;
        }
    };

    return (
        <section className={classes.projects}>
            <div className="wrapper">
                <h2>Featured Investment Opportunities</h2>
                <p className={classes.projectsSimpleText}>
                    Curated projects with due diligence and transparent metrics
                </p>
                <div className={classes.projectsContainer}>
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div
                                key={index}
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
                                        />
                                    ) : (
                                        <p>Project Image</p>
                                    )}
                                </div>
                                <div className={classes.projectsCardInfo}>
                                    <div
                                        className={classes.projectsCardMainInfo}
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
                                                width: `${Math.round(
                                                    (project.current_investments /
                                                        project.funding_goal) *
                                                        100,
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className={classes.projectsCardStats}>
                                        <div
                                            className={classes.projectsCardStat}
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
                                            className={classes.projectsCardStat}
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
                                            className={classes.projectsCardStat}
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
                                            className={classes.projectsCardStat}
                                        >
                                            <h4>Investors</h4>
                                            <p>
                                                {project.number_investors
                                                    ? project.number_investors
                                                    : '*'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={classes.projectsCardLink}>
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
                        <h6>No projects available</h6>
                    )}
                </div>
                <div className={classes.linkToProjects}>
                    <button onClick={() => navigate('/projects')}>
                        View All Projects
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
            </div>
        </section>
    );
};

export default MainPageProjects;
