import VerifiedPageHeroSection from './VerifiedPageHeroSection/VerifiedPageHeroSection';
import VerifiedPageWeDo from './VerifiedPageWeDo/VerifiedPageWeDo';
import VerifiedPageMatters from './VerifiedPageMatters/VerifiedPageMatters';
import VerifiedPageDisclaimer from './VerifiedPageDisclaimer/VerifiedPageDisclaimer';
import VerifiedPageStatus from './VerifiedPageStatus/VerifiedPageStatus';
import VerifiedPageCategories from './VerifiedPageCategories/VerifiedPageCategories';
import VerifiedPagePlatform from './VerifiedPagePlatform/VerifiedPagePlatform';
import classes from './VerifiedPage.module.css';

const firstDisclaimerTxt = (
    <p>
        Data verification does not constitute independent professional advice or
        expert due diligence. Before making any decisions, it is recommended to
        seek independent consultation from a qualified professional.
    </p>
);

const secondDisclaimerTxt = (
    <>
        <p>
            Verified by Unit Stake is a data verification service provided by
            Unit Stake as an informational service. Unit Stake is not a broker,
            investment adviser, financial intermediary, or regulated entity
        </p>
        <p>
            Nothing on this platform, including the Verified by Unit Stake
            status, constitutes:
        </p>
        <ul>
            <li>investment advice</li>
            <li>a financial promotion</li>
            <li>an offer or solicitation to buy or sell any asset</li>
            <li>a recommendation of any kind</li>
        </ul>
        <p>
            Verified status reflects the outcome of a review of disclosed
            information and publicly available data as of the verification date.
            All materials are provided for informational purposes only and
            should not be relied upon as a basis for investment or financial
            decisions.
        </p>
    </>
);

const VerifiedPage = () => {
    return (
        <main className={classes.verifiedPage}>
            <VerifiedPageHeroSection />
            <VerifiedPageWeDo />
            <VerifiedPageMatters />
            <VerifiedPageDisclaimer text={firstDisclaimerTxt} />
            <VerifiedPageStatus />
            <VerifiedPageDisclaimer text={secondDisclaimerTxt} />
            <VerifiedPageCategories />
            <VerifiedPagePlatform />
        </main>
    );
};

export default VerifiedPage;
