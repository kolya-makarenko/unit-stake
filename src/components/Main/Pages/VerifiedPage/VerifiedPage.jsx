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
            Verified by UnitStake is a data verification service provided by
            UnitStake as an informational service. UnitStake is an informational
            aggregator. UnitStake is not a broker, investment adviser, financial
            intermediary, or regulated entity.
        </p>
        <p>
            Nothing on this platform, including the Verified by UnitStake
            designation, constitutes investment advice, a financial promotion,
            an offer or invitation to buy or sell any asset, or a recommendation
            of any kind.
        </p>
        <p>
            The Verified by UnitStake designation reflects the results of the
            verification of data disclosed by the project and publicly available
            information as of the date the verification was conducted.
        </p>
        <p>
            The materials presented are for informational purposes only and do
            not constitute a recommendation to take any action.
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
