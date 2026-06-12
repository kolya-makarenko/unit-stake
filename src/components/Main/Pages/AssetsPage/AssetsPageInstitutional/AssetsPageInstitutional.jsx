import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';

import classes from './AssetsPageInstitutional.module.css';

import cardLogo1 from '../../../../../assets/images/assetsPageImages/logo1.svg';
import cardLogo2 from '../../../../../assets/images/assetsPageImages/logo2.svg';
import cardLogo3 from '../../../../../assets/images/assetsPageImages/logo3.svg';
import cardLogo4 from '../../../../../assets/images/assetsPageImages/logo4.svg';
import cardLogo6 from '../../../../../assets/images/assetsPageImages/logo6.svg';
import cardLogo7 from '../../../../../assets/images/assetsPageImages/logo7.svg';
import cardLogo8 from '../../../../../assets/images/assetsPageImages/logo8.svg';
import cardLogo9 from '../../../../../assets/images/assetsPageImages/logo9.svg';

const cards = [
    {
        id: '01',
        title: 'BlackRock',
        subTitle: 'Fund Infrastructure',
        text: 'Launched the tokenized fund BUIDL, signaling institutional confidence in blockchain-based fund infrastructure.',
        logo: cardLogo1,
    },
    {
        id: '02',
        title: 'JPMorgan Chase',
        subTitle: 'Institutional Pilot',
        text: 'Through its Onyx platform, JPMorgan has executed tokenized asset and settlement pilots for institutional finance.',
        logo: cardLogo2,
    },
    {
        id: '03',
        title: 'HSBC',
        subTitle: 'Tokenized Gold',
        text: 'Explored tokenized gold ownership models and digital asset custody solutions for institutional clients.',
        logo: cardLogo3,
    },
    {
        id: '04',
        title: 'Franklin Templeton',
        subTitle: 'Digital Asset Market',
        text: 'Launched blockchain-based money market fund products available on public blockchain rails.',
        logo: cardLogo4,
    },
    {
        id: '05',
        title: 'KPMG / Deloitte / PwC',
        subTitle: 'Advisory Research',
        text: 'All have published research and advisory work around tokenized real-world assets, ownership modernization, and digital capital markets.',
        logo: cardLogo3,
    },
    {
        id: '06',
        title: 'United Arab Emirates / Dubai',
        subTitle: 'Legal Framework',
        text: 'Dubai has become one of the most active jurisdictions supporting tokenized real estate and digital asset frameworks.',
        logo: cardLogo6,
    },
    {
        id: '07',
        title: 'Switzerland',
        subTitle: 'Legal Framework',
        text: 'Switzerland remains a leading jurisdiction for compliant tokenized asset structures.',
        logo: cardLogo7,
    },
    {
        id: '08',
        title: 'Paxos',
        subTitle: 'Tokenized Gold',
        text: 'Developed tokenized gold products backed by allocated physical gold.',
        logo: cardLogo8,
    },
    {
        id: '09',
        title: 'Tether Gold Products',
        subTitle: 'Tokenized Gold',
        text: 'Expanded tokenized gold offerings to global markets.',
        logo: cardLogo9,
    },
];

const AssetsPageInstitutional = () => {
    return (
        <section className={`sectionMarginTop ${classes.institutional}`}>
            <div className="wrapper">
                <div className={classes.fakeBtn}>
                    <div className={classes.fakeBtnContainer}>
                        <div className={classes.fakeBtnCircle}></div>
                        <p>Live Market Signals</p>
                    </div>
                </div>
                <div className={classes.institutionalHeader}>
                    <div className={classes.headerLeft}>
                        <h2>Institutional Momentum</h2>
                        <p className={classes.institutionalHeaderText}>
                            Major financial institutions, advisory firms, and
                            jurisdictions are actively shaping tokenized asset
                            markets — a curated stream of credible adoption
                            signals.
                        </p>
                    </div>
                </div>
                <div className={classes.navigationButtons}>
                    <button
                        className={`${classes.navBtn} ${classes.prevBtn} js-swiper-prev`}
                    >
                        <svg
                            width="10"
                            height="20"
                            viewBox="0 0 10 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.65672 6.71109L2.34547 0.39984C2.08785 0.143745 1.73935 0 1.3761 0C1.01284 0 0.664346 0.143745 0.406723 0.39984C0.277846 0.527664 0.175554 0.67974 0.105747 0.847297C0.0359404 1.01485 0 1.19457 0 1.37609C0 1.55761 0.0359404 1.73733 0.105747 1.90488C0.175554 2.07244 0.277846 2.22452 0.406723 2.35234L6.73172 8.64984C6.8606 8.77767 6.96289 8.92974 7.0327 9.0973C7.10251 9.26485 7.13845 9.44458 7.13845 9.62609C7.13845 9.80761 7.10251 9.98733 7.0327 10.1549C6.96289 10.3224 6.8606 10.4745 6.73172 10.6023L0.406723 16.8998C0.147805 17.1569 0.00162238 17.5064 0.000333071 17.8712C-0.000956242 18.2361 0.142755 18.5865 0.399849 18.8455C0.656943 19.1044 1.00636 19.2506 1.37124 19.2519C1.73611 19.2531 2.08656 19.1094 2.34547 18.8523L8.65672 12.5411C9.4292 11.7677 9.8631 10.7192 9.8631 9.62609C9.8631 8.53296 9.4292 7.48453 8.65672 6.71109Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                    <button
                        className={`${classes.navBtn} ${classes.nextBtn} js-swiper-next`}
                    >
                        <svg
                            width="10"
                            height="20"
                            viewBox="0 0 10 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M8.65672 6.71109L2.34547 0.39984C2.08785 0.143745 1.73935 0 1.3761 0C1.01284 0 0.664346 0.143745 0.406723 0.39984C0.277846 0.527664 0.175554 0.67974 0.105747 0.847297C0.0359404 1.01485 0 1.19457 0 1.37609C0 1.55761 0.0359404 1.73733 0.105747 1.90488C0.175554 2.07244 0.277846 2.22452 0.406723 2.35234L6.73172 8.64984C6.8606 8.77767 6.96289 8.92974 7.0327 9.0973C7.10251 9.26485 7.13845 9.44458 7.13845 9.62609C7.13845 9.80761 7.10251 9.98733 7.0327 10.1549C6.96289 10.3224 6.8606 10.4745 6.73172 10.6023L0.406723 16.8998C0.147805 17.1569 0.00162238 17.5064 0.000333071 17.8712C-0.000956242 18.2361 0.142755 18.5865 0.399849 18.8455C0.656943 19.1044 1.00636 19.2506 1.37124 19.2519C1.73611 19.2531 2.08656 19.1094 2.34547 18.8523L8.65672 12.5411C9.4292 11.7677 9.8631 10.7192 9.8631 9.62609C9.8631 8.53296 9.4292 7.48453 8.65672 6.71109Z"
                                fill="white"
                            />
                        </svg>
                    </button>
                </div>
                <div className={classes.institutionalContainer}>
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            prevEl: '.js-swiper-prev',
                            nextEl: '.js-swiper-next',
                        }}
                        loop={true}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 16,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                        }}
                        className={classes.mySwiper}
                    >
                        {cards.map((card) => (
                            <SwiperSlide key={card.id}>
                                <div className={classes.institutionalCard}>
                                    <div
                                        className={classes.institutionalCardImg}
                                    >
                                        <div
                                            className={
                                                classes.institutionalCardLogo
                                            }
                                        >
                                            <img src={card.logo} alt="logo" />
                                        </div>
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
                                    <div
                                        className={
                                            classes.institutionalCardPosition
                                        }
                                    >
                                        <h4>{card.subTitle}</h4>
                                        <p>Signal · {card.id}</p>
                                    </div>
                                    <div
                                        className={classes.institutionalCardTxt}
                                    >
                                        <div
                                            className={
                                                classes.institutionalCardText
                                            }
                                        >
                                            <h3>{card.title}</h3>
                                            <p>{card.text}</p>
                                        </div>
                                        <div
                                            className={
                                                classes.institutionalCardVerified
                                            }
                                        >
                                            Verified Source
                                            <div
                                                className={
                                                    classes.partnerVerified
                                                }
                                            >
                                                <div
                                                    className={
                                                        classes.grinCircle
                                                    }
                                                ></div>
                                                Verified
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={classes.institutionalAfter}>
                    <div className={classes.institutionalAfterTxt}>
                        Drag · Scroll · Explore
                    </div>
                    <div className={classes.institutionalAfterTxt}>
                        9 Institutional Signals
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AssetsPageInstitutional;
