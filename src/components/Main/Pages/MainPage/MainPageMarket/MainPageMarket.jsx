import { useState } from 'react';
import classes from './MainPageMarket.module.css';

import tabPic1 from '../../../../../assets/images/mainPageImages/marketTab1.png';
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
    },
    {
        id: 'tab2',
        label: 'Insights',
        header: 'Insights & Market Perspectives',
        paragraph:
            'Understand the key trends, models, and developments shaping tokenised real-world assets.',
        fackeBtns: ['Location', 'Structure', 'Platform', 'Asset Type'],
        img: null,
    },
    {
        id: 'tab3',
        label: `Owner's Ecosystem`,
        header: 'Ecosystem Participants',
        paragraph:
            'The key roles shaping tokenised assets — from infrastructure and legal structuring to market positioning.',
        fackeBtns: ['Location', 'Structure', 'Platform', 'Asset Type'],
        img: tabPic3,
    },
];

const MainPageMarket = () => {
    const [activeTab, setActiveTab] = useState('tab1');
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
                </div>
            </div>
        </section>
    );
};

export default MainPageMarket;
