import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './MainPageMarket.module.css';

import tabPic1 from '../../../../../assets/images/mainPageImages/marketTab1.png';
import tabPic2 from '../../../../../assets/images/mainPageImages/marketTab2.png';
import tabPic3 from '../../../../../assets/images/mainPageImages/marketTab3.png';

const tbabsData = [
    {
        id: 'tab1',
        label: 'Projects block',
        header: 'Tokenised Asset Projects',
        paragraph:
            'Explore structured project overviews designed to support independent understanding and comparison.',
        fackeBtns: ['Location', 'Ownership Model', 'Platform', 'Asset Type'],
        img: tabPic1,
        btnName: 'View projects',
        btnLink: '/projects',
    },
    {
        id: 'tab2',
        label: 'Insights',
        header: 'Insights & Market Perspectives',
        paragraph:
            'Understand the key trends, models, and developments shaping tokenised real-world assets.',
        fackeBtns: ['Location', 'Structure', 'Platform', 'Asset Type'],
        img: tabPic2,
        btnName: 'View Insights',
        btnLink: '/insights',
    },
    {
        id: 'tab3',
        label: `Owner's Ecosystem`,
        header: 'Ecosystem Participants',
        paragraph:
            'The key roles shaping tokenised assets — from infrastructure and legal structuring to market positioning.',
        fackeBtns: ['Location', 'Structure', 'Platform', 'Asset Type'],
        img: tabPic3,
        btnName: 'View Ecosystem',
        btnLink: '/for-assets-owners',
    },
];

const MainPageMarket = () => {
    const [activeTab, setActiveTab] = useState('tab1');
    const navigate = useNavigate();
    return (
        <section className={`sectionMarginTop ${classes.market}`}>
            <div className="wrapper">
                <h2>One Market. One Structured View.</h2>
                <div className={classes.marketContainer}>
                    <div className={classes.marketTabs}>
                        {tbabsData.map((tab) => (
                            <div
                                key={tab.id}
                                className={`${classes.marketTabBtn} ${activeTab === tab.id ? classes.active : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>
                    {tbabsData
                        .filter((tab) => tab.id === activeTab)
                        .map((tab) => (
                            <div key={tab.id} className={classes.marketContent}>
                                <div className={classes.marketContentText}>
                                    <h3>{tab.header}</h3>
                                    <p>{tab.paragraph}</p>
                                    <div
                                        className={
                                            classes.marketContentFakeBtns
                                        }
                                    >
                                        {tab.fackeBtns.map((btn) => (
                                            <span
                                                key={btn}
                                                className={
                                                    classes.marketContentFakeBtn
                                                }
                                            >
                                                {btn}
                                            </span>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => navigate(tab.btnLink)}
                                    >
                                        {tab.btnName}
                                    </button>
                                </div>
                                <div className={classes.marketContentImg}>
                                    {tab.img && (
                                        <img src={tab.img} alt={tab.label} />
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
};

export default MainPageMarket;
