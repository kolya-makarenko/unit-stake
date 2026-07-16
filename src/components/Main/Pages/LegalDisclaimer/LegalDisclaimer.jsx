import classes from './LegalDisclaimer.module.css';

const LegalDisclaimer = () => {
    return (
        <main className={classes.legalPage}>
            <div className="wrapper">
                <div className={classes.legalPageContainer}>
                    <h2>Legal Disclaimer</h2>
                    <div className={classes.effective}>
                        <p>Effective Date: [Insert Date]</p>
                    </div>
                    <p>
                        This Platform is operated by Unit Stake (“Company”,
                        “we”, “us”, or “our”). Unit Stake is provided for
                        general informational, educational, research, and
                        market-visibility purposes only. The Platform may
                        contain structured information, summaries, overviews,
                        ecosystem mapping, project references, platform
                        references, and links to third-party materials relating
                        to tokenised real-world assets and associated market
                        participants. Unless expressly stated otherwise, Unit
                        Stake does not constitute a marketplace, investment
                        platform, brokerage service, exchange, custody solution,
                        legal service, tax service, or regulated financial
                        service.
                    </p>
                    <p>
                        Nothing on Unit Stake constitutes or should be
                        understood as financial, investment, legal, tax, or
                        regulatory advice, or as an offer, recommendation,
                        endorsement, invitation, approval, or solicitation to
                        buy, sell, hold, structure, tokenise, market,
                        distribute, or otherwise engage with any asset, token,
                        platform, or transaction. Users must carry out their own
                        independent legal, tax, investment, regulatory, and
                        commercial review before making any decision. Unless
                        expressly stated otherwise, the Platform does not
                        constitute an offer of securities, financial
                        instruments, or crypto-assets, an invitation to engage
                        in investment activity, a prospectus, offering document,
                        information memorandum, white paper, financial
                        promotion, or solicitation on behalf of any issuer,
                        seller, promoter, intermediary, or service provider.
                    </p>
                    <p>
                        Unit Stake may refer or link to third-party websites,
                        projects, issuers, platforms, legal firms, marketing
                        agencies, service providers, and other external
                        resources. Such references are provided for convenience
                        and general visibility only. We do not control, verify,
                        endorse, or guarantee the legality of any third-party
                        offering, the regulatory status of any third party, or
                        the accuracy, completeness, timeliness, performance,
                        credibility, safety, or suitability of any third-party
                        project, platform, service, or material. Although the
                        Platform may present information in a structured and
                        professional format, users must not rely exclusively on
                        it when making legal, financial, strategic, commercial,
                        or regulatory decisions. Any use of or reliance on the
                        Platform is entirely at the user’s own risk.
                    </p>
                    <p>
                        Certain content, projects, platforms, structures,
                        communications, or opportunities referenced on Unit
                        Stake may not be available, appropriate, or lawful in
                        all jurisdictions. Users are solely responsible for
                        determining whether access to, use of, or interaction
                        with any content, platform, project, or service is
                        lawful in their own jurisdiction. Tokenised real-world
                        assets and related digital structures may involve
                        substantial legal, regulatory, technical, operational,
                        valuation, liquidity, enforcement, counterparty, and
                        market risks. Regulatory treatment may vary across
                        jurisdictions and may change over time, and any
                        reference to historical performance, targets,
                        projections, structures, or outcomes does not guarantee
                        future results.
                    </p>
                    <p>
                        We do not guarantee that any content on the Platform is
                        complete, accurate, current, or error-free. Information
                        may be simplified, summarised, translated, reformatted,
                        incomplete, or dependent on third-party disclosures. We
                        reserve the right to update, modify, suspend, remove, or
                        limit any content or functionality at any time without
                        notice. To the fullest extent permitted by law, Unit
                        Stake disclaims responsibility for any loss, damage,
                        cost, or liability arising out of or connected with the
                        use of or reliance on the Platform, the use of or
                        reliance on third-party content, errors, omissions,
                        delays, interruptions, inaccuracies, access
                        restrictions, technical failures, security incidents, or
                        decisions taken by users based on Platform content.
                        Nothing in this disclaimer excludes liability that
                        cannot lawfully be excluded. If you are considering
                        launching, structuring, tokenising, promoting, listing,
                        acquiring, or investing in any asset, token, or project
                        referenced on the Platform, you should obtain
                        independent advice from appropriately qualified legal,
                        tax, regulatory, financial, and technical professionals.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LegalDisclaimer;
