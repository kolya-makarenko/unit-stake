import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PROJECTS,
} from '../../../../../lib/appwrite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import classes from './ProjectPage.module.css';

import linkedinIcon from '../../../../../assets/images/icons/linkedin.svg';
import telegramIcon from '../../../../../assets/images/icons/telegram.svg';
import twitterIcon from '../../../../../assets/images/icons/twitter.svg';
import shareBtnCopyIcon from '../../../../../assets/images/icons/shareBtnCopy.svg';

const ProjectPage = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const [copied, setCopied] = useState(false);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    rowId: projectId,
                });

                setData(response);
            } catch (error) {
                console.error('Error fetching project data:', error);
                alert('Failed to load project data.');
                navigate('/projects');
            }
        };
        fetchProject();
    }, [projectId]);

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

    const contentBlocksImages = (data?.content_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter((obj) => obj.type === 'image');

    const isLoopRequired = contentBlocksImages.length > 4;

    const daysUntil = (targetDateString) => {
        const targetDate = new Date(targetDateString);
        targetDate.setHours(0, 0, 0, 0);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (targetDate < today) {
            return 'The deadline has passed';
        }

        const differenceInTime = targetDate.getTime() - today.getTime();

        const differenceInDays = `${Math.ceil(
            differenceInTime / (1000 * 3600 * 24),
        )} days`;

        return differenceInDays;
    };

    const contentBlocks = (data?.content_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

    return (
        <main className={classes.projectPage}>
            <section className={classes.info}>
                <div className="wrapper">
                    <div className={classes.mainInfoContainer}>
                        <div className={classes.mainInfo}>
                            <p className={classes.updatedDate}>
                                The information on this page was updated on{' '}
                                {dateFormatter(data.$updatedAt)}
                            </p>
                            <div className={classes.identity}>
                                <div className={classes.name}>{data.name}</div>
                            </div>
                            <div className={classes.identityDescription}>
                                {data.description}
                            </div>
                            {data.filters && (
                                <div className={classes.mainInfoFilters}>
                                    {data.filters.map((item, index) => (
                                        <div
                                            key={index}
                                            className={classes.mainInfoFilter}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            )}
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
                </div>
            </section>
            <section className={classes.preview}>
                <div className="wrapper">
                    <div className={classes.contecntPreview}>
                        <div className={classes.contentGalery}>
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-navigation-size': '24px',
                                }}
                                loop={contentBlocksImages.length > 4}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{
                                    swiper:
                                        thumbsSwiper && !thumbsSwiper.destroyed
                                            ? thumbsSwiper
                                            : null,
                                }}
                                modules={[Navigation, Thumbs]}
                                className={classes.mainSwiper}
                            >
                                {contentBlocksImages.map((slide, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={classes.mainSwiperBox}>
                                            <img
                                                src={slide.value}
                                                alt="galery image"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={contentBlocksImages.length > 4}
                                spaceBetween={12}
                                slidesPerView={3}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className={classes.thumbsSwiper}
                            >
                                {contentBlocksImages.map((slide, index) => (
                                    <SwiperSlide
                                        key={index}
                                        className={classes.thumbsSwiperBox}
                                    >
                                        <div
                                            className={classes.thumbsSwiperItem}
                                        >
                                            <img
                                                src={slide.value}
                                                alt="galery image"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className={classes.contentMainNumbers}>
                            <div className={classes.currentInvestments}>
                                {data.current_investments
                                    ? `$${data.current_investments}`
                                    : '$0'}
                            </div>
                            <div className={classes.progress}>
                                {data.current_investments && data.funding_goal
                                    ? `${Math.round(
                                          (data.current_investments /
                                              data.funding_goal) *
                                              100,
                                      )}% raised of $${data.funding_goal}`
                                    : '$0'}
                                <div className={classes.progressBar}>
                                    <div
                                        className={classes.progressBarProcent}
                                        style={{
                                            width: `${Math.round(
                                                (data.current_investments /
                                                    data.funding_goal) *
                                                    100,
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                                {data.number_investors && (
                                    <div className={classes.nunumberInvestors}>
                                        <div
                                            className={
                                                classes.nunumberInvestorsNum
                                            }
                                        >
                                            {data.number_investors}
                                        </div>
                                        Investors
                                    </div>
                                )}
                                {data.deadline && (
                                    <div className={classes.deadline}>
                                        <div className={classes.daysUntil}>
                                            {daysUntil(data.deadline)}
                                        </div>
                                        Left to invest
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={classes.content}>
                <div className="wrapper">
                    <div className={classes.contentContainer}>
                        <div className={classes.contentBlocks}>
                            {contentBlocks.map((block, index) => {
                                switch (block.type) {
                                    case 'h4':
                                        return (
                                            <h4
                                                key={index}
                                                className={
                                                    classes.contentHeading
                                                }
                                            >
                                                {block.value}
                                            </h4>
                                        );

                                    case 'p':
                                        return (
                                            <p
                                                key={index}
                                                className={
                                                    classes.contentParagraph
                                                }
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
                                                    block.value.map(
                                                        (item, i) => (
                                                            <li
                                                                key={i}
                                                                className={
                                                                    classes.contentListItem
                                                                }
                                                            >
                                                                <span></span>
                                                                {item}
                                                            </li>
                                                        ),
                                                    )}
                                            </ul>
                                        );
                                    case 'youtube':
                                        return (
                                            <iframe
                                                key={index}
                                                width="100%"
                                                height="350"
                                                src="https://www.youtube.com/embed/uvGt0svH1SU?si=GIRpdMev7GK92dEE"
                                                title="YouTube video player"
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            ></iframe>
                                        );
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                        <aside></aside>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProjectPage;
