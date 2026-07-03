import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PROJECTS,
    TABLE_ID_PLATFORMS,
} from '../../../../../lib/appwrite';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import AssetsPageFaq from '../../AssetsPage/AssetsPageFaq/AssetsPageFaq';
import ReadMoreText from '../../../../ReadMoreText/ReadMoreText';
import ExternalLink from '../../../../ExternalLink/ExternalLink';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import classes from './ProjectPage.module.css';

import linkedinIcon from '../../../../../assets/images/icons/linkedin.svg';
import telegramIcon from '../../../../../assets/images/icons/telegram.svg';
import twitterIcon from '../../../../../assets/images/icons/twitter.svg';
import shareBtnCopyIcon from '../../../../../assets/images/icons/shareBtnCopy.svg';
import linkedinSocial from '../../../../../assets/images/projectPageImages/linkedin.svg';
import twitterSocial from '../../../../../assets/images/projectPageImages/twitter.svg';
import instagramSocial from '../../../../../assets/images/projectPageImages/instagram.svg';
import facebookSocial from '../../../../../assets/images/projectPageImages/facebook.svg';
import youtubeSocial from '../../../../../assets/images/projectPageImages/youtube.svg';
import platformImgNone from '../../../../../assets/images/mainPageImages/platformImgNone.png';

const checkMark = (
    <svg
        width="13"
        height="9"
        viewBox="0 0 13 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.67471 6.89708L11.341 0.230063C11.6478 -0.0767591 12.1452 -0.0768607 12.4521 0.229837C12.7592 0.536675 12.7592 1.03436 12.4523 1.34131L5.34136 8.45226C4.97318 8.82044 4.37624 8.82044 4.00806 8.45226L0.230263 4.67446C-0.0765082 4.36769 -0.0765085 3.87032 0.230262 3.56355C0.537033 3.25678 1.03441 3.25678 1.34118 3.56355L4.67471 6.89708Z"
            fill="white"
        />
    </svg>
);

const documentIcon = (
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_520_1409)">
            <path
                d="M14.167 11.6667C14.167 11.8877 14.0792 12.0997 13.9229 12.2559C13.7666 12.4122 13.5547 12.5 13.3337 12.5H6.66699C6.44598 12.5 6.23402 12.4122 6.07774 12.2559C5.92146 12.0997 5.83366 11.8877 5.83366 11.6667C5.83366 11.4457 5.92146 11.2337 6.07774 11.0774C6.23402 10.9211 6.44598 10.8334 6.66699 10.8334H13.3337C13.5547 10.8334 13.7666 10.9211 13.9229 11.0774C14.0792 11.2337 14.167 11.4457 14.167 11.6667ZM10.8337 14.1667H6.66699C6.44598 14.1667 6.23402 14.2545 6.07774 14.4108C5.92146 14.567 5.83366 14.779 5.83366 15C5.83366 15.221 5.92146 15.433 6.07774 15.5893C6.23402 15.7456 6.44598 15.8334 6.66699 15.8334H10.8337C11.0547 15.8334 11.2666 15.7456 11.4229 15.5893C11.5792 15.433 11.667 15.221 11.667 15C11.667 14.779 11.5792 14.567 11.4229 14.4108C11.2666 14.2545 11.0547 14.1667 10.8337 14.1667ZM18.3337 8.73752V15.8334C18.3323 16.938 17.8929 17.9971 17.1118 18.7782C16.3307 19.5593 15.2717 19.9987 14.167 20H5.83366C4.729 19.9987 3.66996 19.5593 2.88884 18.7782C2.10773 17.9971 1.66832 16.938 1.66699 15.8334V4.16669C1.66832 3.06202 2.10773 2.00298 2.88884 1.22187C3.66996 0.440754 4.729 0.00134242 5.83366 1.92072e-05H9.59616C10.3625 -0.00195323 11.1216 0.148009 11.8297 0.441235C12.5377 0.734461 13.1806 1.16513 13.7212 1.70835L16.6245 4.61335C17.168 5.15355 17.599 5.79623 17.8923 6.50416C18.1857 7.2121 18.3357 7.9712 18.3337 8.73752ZM12.5428 2.88669C12.2806 2.63265 11.9861 2.41412 11.667 2.23669V5.83335C11.667 6.05437 11.7548 6.26633 11.9111 6.42261C12.0674 6.57889 12.2793 6.66669 12.5003 6.66669H16.097C15.9195 6.34768 15.7006 6.05347 15.4462 5.79169L12.5428 2.88669ZM16.667 8.73752C16.667 8.60002 16.6403 8.46835 16.6278 8.33335H12.5003C11.8373 8.33335 11.2014 8.06996 10.7326 7.60112C10.2637 7.13228 10.0003 6.49639 10.0003 5.83335V1.70585C9.86532 1.69335 9.73283 1.66669 9.59616 1.66669H5.83366C5.17062 1.66669 4.53473 1.93008 4.06589 2.39892C3.59705 2.86776 3.33366 3.50364 3.33366 4.16669V15.8334C3.33366 16.4964 3.59705 17.1323 4.06589 17.6011C4.53473 18.07 5.17062 18.3334 5.83366 18.3334H14.167C14.83 18.3334 15.4659 18.07 15.9348 17.6011C16.4036 17.1323 16.667 16.4964 16.667 15.8334V8.73752Z"
                fill="#19191C"
            />
        </g>
        <defs>
            <clipPath id="clip0_520_1409">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

const ProjectPage = () => {
    const { id: projectId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState({});

    const [platform, setPlatform] = useState([]);

    const [copied, setCopied] = useState(false);
    const [copiedToken, setCopiedToken] = useState(false);

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [targetUrl, setTargetUrl] = useState('');

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await tablesDB.getRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    rowId: projectId,
                });

                setData(response);
                if (response.platform_id) {
                    const responsePlatform = await tablesDB.getRow({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_PLATFORMS,
                        rowId: response.platform_id,
                    });
                    setPlatform(responsePlatform);
                }
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

    const contentBlocksDocuments = (data?.content_blocks || [])
        .map((block) => {
            try {
                return typeof block === 'string' ? JSON.parse(block) : block;
            } catch (error) {
                console.error('Content block parsing error:', error);
                return null;
            }
        })
        .filter((obj) => obj.type === 'document');

    const formatAssetLabel = (value) => {
        if (value >= 100000 && value <= 100000000) {
            return `${Math.round(value / 100000) / 10}M`;
        } else if (value >= 100000000) {
            return `${Math.round(value / 100000000) / 10}B`;
        } else {
            return value;
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString + 'T00:00:00');

        const options = { month: 'long', year: 'numeric' };

        return new Intl.DateTimeFormat('en-US', options).format(date);
    }

    const parseTokenData = (data?.token_addresses || [])
        .map((adress) => {
            try {
                return typeof adress === 'string' ? JSON.parse(adress) : adress;
            } catch (error) {
                console.error('Token adress parsing error:', error);
                return null;
            }
        })
        .filter(Boolean);

    const copyToken = (tokenAdress) => {
        navigator.clipboard.writeText(tokenAdress);
        setCopied(true);
        alert('Copied');
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExternalLinkClick = (e, url) => {
        e.preventDefault();
        setTargetUrl(url);
        setIsModalOpen(true);
    };

    const handleConfirmTransition = () => {
        setIsModalOpen(false);
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
    };

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
                                    {data.investor_type.map((item, index) => (
                                        <div
                                            key={index}
                                            className={classes.mainInfoFilter}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                    {data.category.map((item, index) => (
                                        <div
                                            key={index}
                                            className={classes.mainInfoFilter}
                                        >
                                            {item}
                                        </div>
                                    ))}
                                    {data.country.map((item, index) => (
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
                                    ? `$${formatAssetLabel(data.current_investments)}`
                                    : '$0'}
                            </div>
                            <div className={classes.progress}>
                                {data.current_investments && data.funding_goal
                                    ? `${Math.round(
                                          (data.current_investments /
                                              data.funding_goal) *
                                              100,
                                      )}% raised of $${formatAssetLabel(data.funding_goal)}`
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

                                    case 'h5':
                                        return (
                                            <h5
                                                key={index}
                                                className={
                                                    classes.contentSubtitle
                                                }
                                            >
                                                {block.value}
                                            </h5>
                                        );

                                    case 'b':
                                        return (
                                            <b
                                                key={index}
                                                className={
                                                    classes.contentBoldTxt
                                                }
                                            >
                                                {block.value}
                                            </b>
                                        );

                                    case 'p':
                                        return (
                                            <ReadMoreText
                                                text={block.value}
                                                key={index}
                                            />
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

                                    case 'imageForContent':
                                        return (
                                            <div
                                                key={index}
                                                className={
                                                    classes.contentImageWrapper
                                                }
                                            >
                                                <img
                                                    src={block.value}
                                                    alt="Project detail"
                                                    className={
                                                        classes.contentImage
                                                    }
                                                />
                                            </div>
                                        );
                                    case 'youtube':
                                        return (
                                            <iframe
                                                key={index}
                                                width="100%"
                                                height="350"
                                                src={block.value}
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
                        <aside>
                            {data.is_verified && (
                                <div className={classes.verified}>
                                    <p>Verified by UnitStake</p>
                                    <ul>
                                        <li>
                                            Legal
                                            <div className={classes.checked}>
                                                {checkMark}
                                            </div>
                                        </li>
                                        <li>
                                            Financials
                                            <div className={classes.checked}>
                                                {checkMark}
                                            </div>
                                        </li>
                                        <li>
                                            Team KYC
                                            <div className={classes.checked}>
                                                {checkMark}
                                            </div>
                                        </li>
                                        <li>
                                            Reputation
                                            <div className={classes.checked}>
                                                {checkMark}
                                            </div>
                                        </li>
                                        <li>
                                            Tech Verification
                                            <div className={classes.checked}>
                                                {checkMark}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )}
                            <div className={classes.dealTerms}>
                                <p>Deal terms</p>
                                <ul>
                                    <li>
                                        Minimum investment
                                        <div>
                                            $
                                            {data.min_investment
                                                ? formatAssetLabel(
                                                      data.min_investment,
                                                  )
                                                : 0}
                                        </div>
                                    </li>
                                    <li>
                                        Maximum investment
                                        <div>
                                            $
                                            {data.max_investment
                                                ? formatAssetLabel(
                                                      data.max_investment,
                                                  )
                                                : 0}
                                        </div>
                                    </li>
                                    <li>
                                        Funding goal
                                        <div>
                                            $
                                            {data.funding_goal
                                                ? formatAssetLabel(
                                                      data.funding_goal,
                                                  )
                                                : 0}
                                        </div>
                                    </li>
                                    <li>
                                        Deadline
                                        <div>
                                            {data.deadline &&
                                                dateFormatter(data.deadline)}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {data.platform_id && (
                                <div className={classes.platform}>
                                    <p>Platform</p>
                                    <div className={classes.platformIdentify}>
                                        <div className={classes.platformImg}>
                                            {platform.image_url ? (
                                                <img
                                                    src={platform.image_url}
                                                    alt="platform logo"
                                                />
                                            ) : (
                                                <img
                                                    src={platformImgNone}
                                                    alt="platform logo"
                                                />
                                            )}
                                        </div>
                                        <div className={classes.platformName}>
                                            <h4>{platform.name}</h4>
                                            <span>{platform.description}</span>
                                        </div>
                                    </div>
                                    <a
                                        href={data.website_url}
                                        onClick={(e) =>
                                            handleExternalLinkClick(
                                                e,
                                                data.website_url,
                                            )
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Visit the project
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
                                    </a>
                                </div>
                            )}
                            {contentBlocksDocuments.length > 0 && (
                                <div className={classes.documents}>
                                    <p>Documents</p>
                                    <div
                                        className={classes.documentsDescription}
                                    >
                                        {data.legal_name}
                                    </div>
                                    <div className={classes.documentsList}>
                                        <p>Company documents</p>
                                        <ul>
                                            {contentBlocksDocuments.map(
                                                (document, index) => (
                                                    <li key={index}>
                                                        <a
                                                            href={
                                                                document.value
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            {documentIcon}
                                                            {document.name}
                                                        </a>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {parseTokenData.length > 0 && (
                                <div className={classes.tokens}>
                                    <div className={classes.tokensHeader}>
                                        <p>Blockchain Addresses</p>
                                        <span>
                                            Verified on-chain contract details.
                                        </span>
                                    </div>
                                    <div className={classes.tokensContainer}>
                                        {parseTokenData.map((item, index) => (
                                            <div
                                                key={index}
                                                className={classes.token}
                                            >
                                                <p>{item.name}</p>
                                                <div
                                                    onClick={() =>
                                                        copyToken(item.address)
                                                    }
                                                    className={
                                                        classes.shareBtnToken
                                                    }
                                                >
                                                    <span>{item.address}</span>
                                                    <svg
                                                        width="15"
                                                        height="15"
                                                        viewBox="0 0 15 15"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M5.725 0.0249996C5.29167 0.0749998 4.94167 0.158333 4.675 0.275C4.55833 0.341666 4.4375 0.433333 4.3125 0.55C4.1875 0.666666 4.09583 0.783333 4.0375 0.9C3.97917 1.01667 3.925 1.1875 3.875 1.4125C3.825 1.6375 3.79167 1.85833 3.775 2.075L3.75 2.5H5.25L5.3 2.075C5.33333 1.79167 5.36667 1.63333 5.4 1.6C5.43333 1.56667 5.74167 1.54167 6.325 1.525C6.90833 1.50833 7.925 1.5 9.375 1.5C10.975 1.5 12.0292 1.50833 12.5375 1.525C13.0458 1.54167 13.325 1.58333 13.375 1.65C13.425 1.71667 13.4583 1.98333 13.475 2.45C13.4917 2.91667 13.5 3.97083 13.5 5.6125C13.5 7.25417 13.4917 8.3125 13.475 8.7875C13.4583 9.2625 13.4292 9.525 13.3875 9.575C13.3458 9.625 13.1917 9.66667 12.925 9.7L12.525 9.75L12.5 11.225L12.875 11.2C13.8583 11.1667 14.4833 10.85 14.75 10.25C14.8333 10.0667 14.8917 9.85833 14.925 9.625C14.9583 9.35833 14.9833 8.925 15 8.325C15 7.825 15 6.925 15 5.625C15 4.15833 14.9917 3.13333 14.975 2.55C14.9583 1.96667 14.925 1.575 14.875 1.375C14.7917 1.00833 14.6375 0.720833 14.4125 0.5125C14.1875 0.304167 13.875 0.158333 13.475 0.0749998C13.3417 0.0583334 13.0417 0.0458326 12.575 0.0374994C12.1083 0.0291662 11.125 0.0166664 9.625 0C7.275 0 5.975 0.00833321 5.725 0.0249996ZM1.475 3.775C1.15833 3.84167 0.858333 4.01667 0.575 4.3C0.291667 4.58333 0.116667 4.89167 0.05 5.225C0.0166667 5.39167 0 6.775 0 9.375C0 11.975 0.0166667 13.35 0.05 13.5C0.116667 13.8333 0.291667 14.1417 0.575 14.425C0.858333 14.7083 1.16667 14.8833 1.5 14.95C1.65 14.9833 3.025 15 5.625 15C8.225 15 9.60833 14.9833 9.775 14.95C10.1083 14.8833 10.4167 14.7083 10.7 14.425C10.9833 14.1417 11.1583 13.8333 11.225 13.5C11.2417 13.35 11.25 11.975 11.25 9.375C11.25 6.775 11.2417 5.39167 11.225 5.225C11.1583 4.89167 10.9833 4.58333 10.7 4.3C10.4167 4.01667 10.1083 3.84167 9.775 3.775C9.625 3.75833 8.2375 3.75 5.6125 3.75C2.9875 3.75 1.60833 3.75833 1.475 3.775ZM9.65 5.35L9.75 5.475V13.25L9.525 13.5H1.75L1.5 13.25V5.475L1.75 5.25H9.525L9.65 5.35Z"
                                                            fill="#19191c"
                                                        />
                                                    </svg>
                                                </div>
                                                <a
                                                    href={
                                                        item.blockchainAddress
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={(e) =>
                                                        handleExternalLinkClick(
                                                            e,
                                                            data.website_url,
                                                        )
                                                    }
                                                >
                                                    View on {item.network}
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
                                                </a>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </section>
            <section className={classes.about}>
                <div className="wrapper">
                    <h2>About Project</h2>
                    <div className={classes.aboutContainer}>
                        <div className={classes.aboutInfo}>
                            <div className={classes.aboutInfoItem}>
                                <p>Legal Name</p>
                                <div className={classes.aboutInfoItemValue}>
                                    {data.legal_name}
                                </div>
                            </div>
                            <div className={classes.aboutInfoItem}>
                                <p>Employees</p>
                                <div className={classes.aboutInfoItemValue}>
                                    {data.employees_count}
                                </div>
                            </div>
                            <div className={classes.aboutInfoItem}>
                                <p>Founded</p>
                                <div className={classes.aboutInfoItemValue}>
                                    {data.founded_date &&
                                        formatDate(data.founded_date)}
                                </div>
                            </div>
                            <div className={classes.aboutInfoItem}>
                                <p>Website</p>
                                <div className={classes.aboutInfoItemValue}>
                                    <a
                                        href={data.website_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) =>
                                            handleExternalLinkClick(
                                                e,
                                                data.website_url,
                                            )
                                        }
                                    >
                                        Project website
                                    </a>
                                </div>
                            </div>
                            <div className={classes.aboutInfoItem}>
                                <p>Form</p>
                                <div className={classes.aboutInfoItemValue}>
                                    {data.country && data.country.join(', ')}
                                </div>
                            </div>
                            <div className={classes.aboutInfoItem}>
                                <p>Social Media</p>
                                <div
                                    className={classes.aboutInfoItemValueSocial}
                                >
                                    {data.linkedin_url && (
                                        <a
                                            href={data.linkedin_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={linkedinSocial}
                                                alt="linkedin"
                                            />
                                        </a>
                                    )}
                                    {data.x_url && (
                                        <a
                                            href={data.x_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={twitterSocial}
                                                alt="twitter"
                                            />
                                        </a>
                                    )}
                                    {data.instagram_url && (
                                        <a
                                            href={data.instagram_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={instagramSocial}
                                                alt="instagram"
                                            />
                                        </a>
                                    )}
                                    {data.facebook_url && (
                                        <a
                                            href={data.facebook_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={facebookSocial}
                                                alt="facebook"
                                            />
                                        </a>
                                    )}
                                    {data.youtube_url && (
                                        <a
                                            href={data.youtube_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={youtubeSocial}
                                                alt="youtube"
                                            />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={classes.map}>
                            <iframe
                                src={data.google_maps_url}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
            <section className={classes.faq}>
                <AssetsPageFaq pageName="project" />
            </section>

            <section className={classes.download}>
                <div className="wrapper">
                    <div className={classes.downloadContainer}>
                        <h2>
                            Explore the Full Project on the Official Website
                        </h2>
                        <p>Get complete details directly from the source.</p>
                        {data.website_url && (
                            <a
                                href={data.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) =>
                                    handleExternalLinkClick(e, data.website_url)
                                }
                            >
                                View project
                            </a>
                        )}
                    </div>
                </div>
            </section>
            <ExternalLink
                isOpen={isModalOpen}
                url={targetUrl}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmTransition}
            />
        </main>
    );
};

export default ProjectPage;
