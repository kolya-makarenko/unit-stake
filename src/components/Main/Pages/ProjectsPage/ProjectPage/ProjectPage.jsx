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
                                    borderRadius: '16px',
                                    marginBottom: '16px',
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
                                className="main-swiper"
                            >
                                {contentBlocksImages.map((slide) => (
                                    <SwiperSlide key={slide.id}>
                                        <div
                                            style={{
                                                position: 'relative',
                                                width: '100%',
                                                height: '500px',
                                            }}
                                        >
                                            <img
                                                src={slide.value}
                                                alt="galery image"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* 2. Слайдер мініатюр (Нижній ряд) */}
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={contentBlocksImages.length > 4}
                                spaceBetween={12}
                                slidesPerView={3}
                                watchSlidesProgress={true}
                                modules={[Navigation, Thumbs]}
                                className="thumbs-swiper"
                            >
                                {contentBlocksImages.map((slide) => (
                                    <SwiperSlide
                                        key={slide.id}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '150px',
                                                borderRadius: '12px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <img
                                                src={slide.value}
                                                alt="galery image"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProjectPage;
