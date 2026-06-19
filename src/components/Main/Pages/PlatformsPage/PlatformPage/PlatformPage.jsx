import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    TABLE_ID_PROJECTS,
    Query,
    TABLE_ID_TEAMS,
} from '../../../../../lib/appwrite';
import AssetsPageFaq from '../../AssetsPage/AssetsPageFaq/AssetsPageFaq';

import classes from './PlatformPage.module.css';

import platformImgNone from '../../../../../assets/images/mainPageImages/platformImgNone.png';
import linkedinIcon from '../../../../../assets/images/icons/linkedin.svg';
import telegramIcon from '../../../../../assets/images/icons/telegram.svg';
import twitterIcon from '../../../../../assets/images/icons/twitter.svg';
import shareBtnCopyIcon from '../../../../../assets/images/icons/shareBtnCopy.svg';
import verifeidIcon from '../../../../../assets/images/icons/verifeid.svg';
import locationMarkIcon from '../../../../../assets/images/icons/locationMark.svg';

const PlatformPage = () => {
    const { id: platformId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});
    const [projects, setProjects] = useState([]);
    const [team, setTeam] = useState([]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchPlatformData = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PLATFORMS,
                    rowId: platformId,
                });

                const responseProjects = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.equal('is_published', true),
                        Query.equal('platform_id', platformId),
                        Query.orderDesc('$createdAt'),
                        Query.limit(3),
                    ],
                });

                const responseTeam = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_TEAMS,
                    queries: [Query.equal('platform_id', platformId)],
                });

                setData(response);
                setProjects(responseProjects.rows);
                setTeam(responseTeam.rows);
            } catch (error) {
                console.error('Error fetching platform data:', error);
                alert('Failed to load platform data.');
                navigate('/platforms');
            }
        };
        fetchPlatformData();
    }, [platformId, navigate]);

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    const shareUrl = encodeURIComponent(
        typeof window !== 'undefined' ? window.location.href : '',
    );

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const contentBlocks = (data?.text_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

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

    return (
        <main className={classes.platformPage}>
            <section className={classes.info}>
                <div className="wrapper">
                    <div className={classes.mainInfoContainer}>
                        <div className={classes.mainInfo}>
                            <p className={classes.updatedDate}>
                                The information on this page was updated on{' '}
                                {dateFormatter(data.$updatedAt)}
                            </p>
                            <div className={classes.identity}>
                                <div className={classes.logo}>
                                    {data.image_url ? (
                                        <img src={data.image_url} alt="logo" />
                                    ) : (
                                        <img src={platformImgNone} alt="logo" />
                                    )}
                                </div>
                                <div className={classes.name}>{data.name}</div>
                            </div>
                        </div>
                        <div className={classes.shareButtons}>
                            Share
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={linkedinIcon} alt="linkedin" />
                            </a>
                            <a
                                href={`https://t.me/share/url?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={telegramIcon} alt="telegram" />
                            </a>
                            <a
                                href={`https://x.com/intent/tweet?url=${shareUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={classes.shareBtn}
                            >
                                <img src={twitterIcon} alt="twitter" />
                            </a>
                            <div
                                onClick={copyToClipboard}
                                className={classes.shareBtn}
                            >
                                <img src={shareBtnCopyIcon} alt="share link" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.secondaryInfo}>
                        <div className={classes.secondaryInfoNumbers}>
                            <div className={classes.secondaryInfoNumbersBox}>
                                <h3>Total Tokenized Asset Volume</h3>
                                <h4>{data.assets ? `$${data.assets}` : '—'}</h4>
                            </div>
                            <div className={classes.secondaryInfoNumbersBox}>
                                <h3>Platform Age</h3>
                                <p>
                                    {data.platform_age
                                        ? data.platform_age
                                        : '—'}
                                </p>
                            </div>
                            <div className={classes.secondaryInfoNumbersBox}>
                                <h3>Projects</h3>
                                <h4>
                                    {data.total_projects
                                        ? data.total_projects
                                        : '—'}
                                </h4>
                            </div>
                            <div className={classes.secondaryInfoNumbersBox}>
                                <h3>Jurisdiction</h3>
                                <p>
                                    {data.jurisdiction
                                        ? data.jurisdiction
                                        : '—'}
                                </p>
                            </div>
                        </div>
                        {data.platform_website && (
                            <div className={classes.secondaryInfoLink}>
                                <a
                                    href={data.platform_website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Platform Website
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className={classes.content}>
                <div className="wrapper">
                    <div className={classes.contentContainer}>
                        {contentBlocks.map((block, index) => {
                            switch (block.type) {
                                case 'h4':
                                    return (
                                        <h4
                                            key={index}
                                            className={classes.contentHeading}
                                        >
                                            {block.value}
                                        </h4>
                                    );

                                case 'p':
                                    return (
                                        <p
                                            key={index}
                                            className={classes.contentParagraph}
                                        >
                                            {block.value}
                                        </p>
                                    );

                                case 'ul':
                                    return (
                                        <ul
                                            key={index}
                                            className={classes.contentList}
                                        >
                                            {Array.isArray(block.value) &&
                                                block.value.map((item, i) => (
                                                    <li
                                                        key={i}
                                                        className={
                                                            classes.contentListItem
                                                        }
                                                    >
                                                        <span></span>
                                                        {item}
                                                    </li>
                                                ))}
                                        </ul>
                                    );

                                case 'image':
                                    return (
                                        <div
                                            key={index}
                                            className={
                                                classes.contentImageWrapper
                                            }
                                        >
                                            <img
                                                src={block.value}
                                                alt="Platform detail"
                                                className={classes.contentImage}
                                            />
                                        </div>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </div>
                </div>
            </section>
            {projects.length > 0 && (
                <section className={classes.projects}>
                    <div className="wrapper">
                        <h2>Projects on the Platform</h2>
                        <div className={classes.projectsContainer}>
                            {projects.map((project, index) => (
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
                                                    ''
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
                            ))}
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
            )}
            {team.length > 0 && (
                <section className={classes.team}>
                    <div className="wrapper">
                        <div className={classes.teamHeader}>
                            <h2>Team</h2>
                            <p>
                                The platform team comprises experienced
                                professionals with expertise across multiple
                                jurisdictions, contributing to governance,
                                strategic direction, and day-to-day operational
                                management. All information presented is based
                                on publicly available sources.
                            </p>
                        </div>
                        <div className={classes.teamContainer}>
                            {team.map((employer) => (
                                <div
                                    key={employer.$id}
                                    className={classes.employer}
                                >
                                    <div className={classes.employerPhoto}>
                                        {employer.image_url && (
                                            <img
                                                src={employer.image_url}
                                                alt="photo"
                                            />
                                        )}
                                    </div>
                                    {employer.linkedin_url && (
                                        <div
                                            className={classes.employerLinkedin}
                                        >
                                            <a
                                                href={employer.linkedin_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img
                                                    src={linkedinIcon}
                                                    alt="linkedin Icon"
                                                />
                                            </a>
                                        </div>
                                    )}
                                    <div className={classes.employerName}>
                                        {employer.name}
                                    </div>
                                    <div className={classes.employerPosition}>
                                        {employer.position}
                                    </div>
                                    <div
                                        className={classes.employerDescription}
                                    >
                                        {employer.description}
                                    </div>
                                    <div className={classes.employerLocation}>
                                        <img
                                            src={locationMarkIcon}
                                            alt="location Mark Icon"
                                        />
                                        {employer.location}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <div className={classes.platformFaq}>
                <AssetsPageFaq pageName="platform" />
            </div>
        </main>
    );
};

export default PlatformPage;
