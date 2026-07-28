import { useNavigate } from 'react-router-dom';
import classes from './LegalDisclaimer.module.css';

const LegalDisclaimer = () => {
    const navigate = useNavigate();
    return (
        <main className={classes.legalPage}>
            <div className="wrapper">
                <div className={classes.legalPageContainer}>
                    <h2>Risk Disclosure Statement</h2>
                    <div className={classes.effective}>
                        <p>
                            <span>Last updated:</span> June 12, 2026
                        </p>
                    </div>
                    <p>
                        This Risk Disclosure Statement (the "
                        <span>Statement</span>") forms an integral part of the
                        Unitstake Terms and Conditions (the "<span>Terms</span>
                        ") made available at{' '}
                        <span
                            className={classes.link}
                            onClick={() => navigate('/term-services')}
                        >
                            Terms and Conditions
                        </span>
                        . Capitalised terms used but not defined herein have the
                        meanings given to them in the Terms. Any matter not
                        specifically addressed in this Statement, including
                        disclaimers, limitations of liability, indemnification,
                        and dispute resolution, shall be governed by the Terms.
                    </p>
                    <p>
                        This Statement is intended to inform users of the
                        principal risks associated with tokenized real-world
                        assets, digital assets, tokens, and blockchain-based
                        instruments referenced on the Aggregator, and the use of
                        information and data provided by the Aggregator. This
                        Statement is not exhaustive. As the tokenized asset
                        market continues to evolve, additional risks may arise
                        that are not addressed herein. Users should conduct
                        their own research and seek independent professional
                        advice appropriate to their specific circumstances.
                    </p>
                    <p>
                        Unitstake reserves the right to update this Statement at
                        any time. The current version published on the Platform
                        supersedes all prior versions.
                    </p>
                    <h2>Nature Of The Platform</h2>
                    <p>
                        Unitstake operates exclusively as an information
                        aggregator and discovery platform. The Aggregator
                        provides users with structured access to publicly
                        available and issuer-submitted information relating to
                        tokenized real-world asset projects, tokenization
                        platforms, and ecosystem participants. The inclusion of
                        any project, platform, or ecosystem participant on the
                        Aggregator does not constitute an endorsement or
                        confirmation of its legitimacy, regulatory compliance,
                        or commercial viability.
                    </p>
                    <p>
                        All content available through the Aggregator is provided
                        for general informational purposes only and does not
                        constitute investment advice, a solicitation or offer to
                        buy or sell any financial instrument or digital asset,
                        or any form of financial, legal, or tax advice. Users
                        are encouraged to seek independent professional advice
                        (financial, legal, tax, investment or cybersecurity)
                        before making any decision based on information obtained
                        from the Aggregator.
                    </p>
                    <h2>Aggregator-Specific Risks</h2>
                    <p>
                        <span>Information Accuracy and Completeness.</span>{' '}
                        Information displayed on the Aggregator is aggregated
                        from multiple sources, including publicly available
                        data, third-party data providers, and information
                        submitted by ecosystem participants. Unitstake operates
                        exclusively as an information aggregator and does not
                        independently verify the accuracy, completeness,
                        currency, or fitness for purpose of any such
                        information. While Unitstake seeks to maintain accurate
                        and up-to-date information, users should be aware that
                        information displayed on the Aggregator may become
                        outdated, incomplete, or inaccurate over time. Users
                        should independently verify any information they
                        consider material before relying on it or making any
                        decision based upon it.
                    </p>
                    <p>
                        <span>No Due Diligence or Vetting.</span> The inclusion
                        of any project, platform, or entity on the Aggregator
                        does not imply that Unitstake has conducted due
                        diligence, legal review, financial analysis, or any form
                        of vetting of such project, platform, or entity.
                        Placement on the Aggregator is not an endorsement,
                        quality certification, or recommendation of any kind.
                    </p>
                    <p>
                        <span>Aggregator Availability and Continuity.</span>{' '}
                        Unitstake makes no warranty regarding the continuous
                        availability, functionality, or accuracy of the
                        Aggregator. The Aggregator may be subject to scheduled
                        maintenance, unplanned downtime, data latency, or
                        discontinuation of service at any time without prior
                        notice.
                    </p>
                    <p>
                        <span>Third-Party Links and External Platforms.</span>{' '}
                        The Aggregator may provide links to third-party
                        websites, platforms, or services for convenience and
                        reference purposes only. Unitstake exercises no control
                        over and accepts no responsibility for the content,
                        accuracy, security, or practices of any third-party
                        platform. Users access third-party platforms at their
                        own risk and should review the applicable terms and
                        privacy policies of any such platform independently.
                    </p>
                    <h2>Financial Risks</h2>
                    <p>
                        <span>Risk of Total Capital Loss.</span> Users who
                        decide to invest in tokenized projects displayed on the
                        Aggregator should be aware that such investments carry a
                        high risk of total and permanent loss of capital. The
                        value of any digital or tokenized instrument may fall to
                        zero as a result of, without limitation: project
                        failure, fraud, regulatory intervention, technological
                        failure, or loss of market confidence. Information
                        displayed on this Aggregator does not constitute an
                        assurance of asset value, project viability, or
                        investment suitability.
                    </p>
                    <p>
                        <span>Market Risk and Price Volatility.</span> The
                        market value of tokenized assets and digital assets is
                        subject to extreme volatility. Prices may fluctuate
                        significantly within short periods due to factors
                        including, but not limited to:
                    </p>
                    <ul>
                        <li>
                            Changes in market sentiment, macroeconomic
                            conditions, or geopolitical events;
                        </li>
                        <li>
                            Fluctuations in the value of the underlying
                            real-world asset;
                        </li>
                        <li>
                            Changes in the supply of or demand for a specific
                            token;
                        </li>
                        <li>
                            Speculative trading activity, market manipulation,
                            or flash crashes;
                        </li>
                        <li>
                            Announcements by issuers, regulators, or market
                            participants;
                        </li>
                        <li>
                            Technical events, including protocol upgrades, hard
                            forks, or security incidents.
                        </li>
                    </ul>
                    <p>
                        Unlike regulated securities markets, there may be no
                        circuit breakers, trading halts, or other market
                        stability mechanisms applicable to tokenized assets
                        traded on decentralised or unregulated venues.
                    </p>
                    <p>
                        <span>Liquidity Risk.</span> Many tokenized real-world
                        assets and digital tokens suffer from low or
                        intermittent liquidity. There may be no active secondary
                        market for a given token, which may prevent a token
                        holder from exiting at a desired time or price.
                        Liquidity may deteriorate rapidly and without warning,
                        particularly in adverse market conditions.
                    </p>
                    <p>
                        Tokens representing illiquid underlying assets — such as
                        real estate, private equity, or infrastructure — may
                        themselves be structurally illiquid regardless of the
                        trading infrastructure available. Lock-up periods,
                        redemption restrictions, and minimum holding
                        requirements may further constrain a token holder's
                        ability to realise value from such an instrument.
                    </p>
                    <p>
                        <span>Valuation Risk.</span> Valuation of tokenized
                        real-world assets may be complex, infrequent, or
                        unreliable. The on-chain price of a token may not
                        accurately reflect the value of the underlying asset due
                        to: illiquidity in secondary markets; delays in
                        valuation reporting; conflicts of interest in the
                        appraisal process; or structural features of the token
                        itself. Users should not rely on token prices as an
                        indicator of underlying asset value without independent
                        verification.
                    </p>
                    <h2>Regulatory and Legal Risks</h2>
                    <p>
                        <span>
                            Evolving and Uncertain Regulatory Environment.
                        </span>{' '}
                        The regulatory treatment of tokenized assets, digital
                        assets, and related platforms is rapidly evolving and
                        remains highly uncertain across jurisdictions.
                        Regulatory changes may affect projects, issuers,
                        platforms, or tokenized assets displayed on the
                        Aggregator; in particular, they may:
                    </p>
                    <ul>
                        <li>
                            Require a project or platform to cease operations,
                            restructure, or obtain additional licensing;
                        </li>
                        <li>
                            Result in the reclassification of a token as a
                            regulated security, e-money instrument, or other
                            regulated instrument;
                        </li>
                        <li>
                            Impose restrictions on the ability of users to
                            access, hold, or transfer certain tokens based on
                            their nationality, domicile, or investor
                            classification;
                        </li>
                        <li>
                            Subject a project, platform, or token holder to
                            unexpected tax, reporting, or compliance
                            obligations;
                        </li>
                        <li>
                            Result in enforcement actions, fines, or civil or
                            criminal liability for project operators or
                            participants.
                        </li>
                    </ul>
                    <p>
                        <span>Lack of Regulatory Protection.</span> Tokenized
                        assets, digital assets, and related projects may operate
                        in jurisdictions with limited regulatory oversight or
                        under regulatory frameworks that provide fewer
                        protections than those applicable in regulated financial
                        markets. Such assets and instruments are generally not
                        covered by deposit protection schemes, investor
                        compensation funds, or similar guarantee mechanisms. As
                        a result, token holders may have limited or no practical
                        recourse in the event of project insolvency, fraud,
                        theft, or operational failure.
                    </p>
                    <p>
                        <span>Cross-Jurisdictional Complexity.</span> A single
                        tokenized asset transaction may involve legal and
                        regulatory obligations across multiple jurisdictions
                        simultaneously — including the jurisdiction of asset
                        location, the jurisdiction of the issuing entity, the
                        jurisdiction governing the token issuance, and the
                        jurisdiction of the user. Users should seek independent
                        legal advice where there is uncertainty regarding the
                        legal or regulatory treatment of a tokenized asset.
                    </p>
                    <p>
                        <span>Tax Risks.</span> The tax treatment of tokenized
                        assets, digital asset transactions, and related income
                        (including gains, dividends, staking rewards, and
                        airdrops) is uncertain in many jurisdictions and may
                        change without notice. Users are solely responsible for
                        determining and meeting all applicable tax obligations
                        arising from their own activities. UnitStake does not
                        provide tax advice, and information on the Aggregator
                        should not be relied upon for any tax purposes.
                    </p>
                    <p>
                        <span>Geographic Considerations.</span> The availability
                        of tokenized projects may vary significantly across
                        jurisdictions. The inclusion of a project on the
                        Aggregator does not indicate that such a project is
                        available, lawful, or suitable for users in any
                        particular jurisdiction. Certain projects displayed on
                        the Aggregator may be restricted by the issuer or
                        unavailable to users in particular countries due to
                        applicable securities regulations, foreign investment
                        restrictions, economic sanctions, or anti-money
                        laundering requirements. Users are solely responsible
                        for ensuring that their access to, and participation in,
                        any tokenized projects complies with all applicable laws
                        and regulations in their jurisdiction of residence and
                        any other jurisdiction relevant to their circumstances.
                    </p>
                    <h2>Technology and Smart Contract Risks</h2>
                    <p>
                        <span>Blockchain and Protocol Risks.</span> Many
                        tokenized assets rely on blockchain or distributed
                        ledger technology. Such technology is experimental and
                        may be subject to:
                    </p>
                    <ul>
                        <li>
                            Protocol-level bugs, vulnerabilities, or failures;
                        </li>
                        <li>
                            Consensus mechanism failures or attacks (e.g., 51%
                            attacks, Sybil attacks);
                        </li>
                        <li>
                            Hard forks resulting in chain splits or loss of
                            token compatibility;
                        </li>
                        <li>
                            Scaling limitations, network congestion, or
                            prohibitively high transaction fees;
                        </li>
                        <li>
                            Deprecation, migration, or discontinuation of the
                            underlying blockchain.
                        </li>
                    </ul>
                    <p>
                        <span>Smart Contract Risk.</span> Many tokenized asset
                        structures rely on smart contracts — self-executing code
                        deployed on a blockchain — to automate key functions
                        such as token issuance, distribution, voting,
                        redemption, and custody. Smart contracts are subject to
                        the following risks:
                    </p>
                    <ul>
                        <li>
                            Coding errors or logical flaws that may lead to
                            unintended behaviour or permanent loss of assets;
                        </li>
                        <li>
                            Exploitation by malicious actors, identifying and
                            leveraging vulnerabilities;
                        </li>
                        <li>
                            Immutability: once deployed, smart contracts may be
                            impossible or impractical to modify, even if errors
                            are identified;
                        </li>
                        <li>
                            Dependence on external data oracles that may provide
                            inaccurate, delayed, or manipulated data;
                        </li>
                        <li>
                            Governance vulnerabilities in upgradeable proxy
                            contracts or multisig arrangements.
                        </li>
                    </ul>
                    <p>
                        Unitstake does not conduct smart contract audits. The
                        fact that information about a project appears on the
                        Aggregator does not imply that any smart contract audit
                        has been completed or that the results of any such audit
                        were satisfactory.
                    </p>
                    <p>
                        <span>Cybersecurity and Custody Risks.</span> Digital
                        assets stored in blockchain wallets or on custodial
                        platforms are subject to theft, hacking, and loss. Users
                        who self-custody digital assets bear sole responsibility
                        for the security of their private keys. Loss of private
                        keys results in permanent and irreversible loss of
                        access to associated assets. Third-party custodial
                        platforms may also be subject to hacking, insolvency, or
                        operational failures resulting in partial or total loss
                        of assets.
                    </p>
                    <p>
                        <span>Irreversibility of Blockchain Transactions.</span>{' '}
                        Transactions executed on blockchain networks are, in the
                        majority of cases, final and irreversible upon
                        confirmation. Errors in transaction details, including
                        the entry of incorrect wallet addresses or incorrect
                        asset amounts, may result in permanent and irrecoverable
                        loss, with limited or no possibility of cancellation or
                        recovery.
                    </p>
                    <h2>Asset-Specific Risks</h2>
                    <p>
                        <span>Uncertain Legal Rights.</span> Tokenized
                        real-world assets are representations of rights,
                        interests, or claims in real-world assets — including
                        but not limited to real estate, private credit,
                        commodities, infrastructure, art, intellectual property,
                        and private equity — that are recorded, transferred, and
                        managed on a distributed ledger or blockchain network
                        using digital tokens.
                    </p>
                    <p>
                        However, holding a token does not necessarily mean
                        holding a legal interest in the underlying real-world
                        asset. Different tokenized projects are structured
                        differently: some tokens may represent direct ownership,
                        while others may confer only a debt claim, a contractual
                        right, a participation interest, or no enforceable legal
                        right at all. The actual rights — if any — attached to a
                        specific token depend entirely on the legal
                        documentation, corporate structure, and jurisdiction
                        governing that particular project. Unitstake displays
                        information about tokenized projects but does not
                        assess, verify, or warrant what legal rights, if any, a
                        given token confers on its holder.
                    </p>
                    <p>
                        <span>Underlying Asset Risks.</span> Tokenized assets
                        remain exposed to the risks of their underlying assets.
                        Depending on the nature of the asset, these risks may
                        include real estate market risks, commodity price
                        volatility, business failure, dilution, illiquidity,
                        regulatory changes, or other asset-specific factors.
                        Tokenization does not eliminate or reduce the risks
                        associated with the underlying asset.
                    </p>
                    <h2>Counterparty and Operational Risks</h2>
                    <p>
                        <span>Issuer Risk.</span> Users who choose to
                        participate in, or otherwise interact with, tokenized
                        projects displayed on the Aggregator are exposed to
                        counterparty risk in relation to the issuer. Such risks
                        include:
                    </p>
                    <ul>
                        <li>
                            Insolvency, fraud, or misconduct by the issuer or
                            its principals;
                        </li>
                        <li>
                            Failure to deliver promised functionality, assets,
                            or returns;
                        </li>
                        <li>Misappropriation of funds or assets;</li>
                        <li>
                            Key person dependency and the inability to replace
                            critical personnel;
                        </li>
                        <li>
                            Conflicts of interest between project operators and
                            token holders.
                        </li>
                    </ul>
                    <p>
                        <span>Custodian and Service Provider Risk.</span>{' '}
                        Tokenized asset projects typically rely on third-party
                        service providers, including custodians, transfer
                        agents, property managers, auditors, legal counsel, and
                        technology providers. The failure, negligence,
                        insolvency, or misconduct of any such provider may
                        adversely affect the value, security, or continuity of a
                        tokenized asset or project.
                    </p>
                    <p>
                        <span>Operational and Business Continuity Risk.</span> A
                        tokenized project may be subject to operational
                        failures, including IT outages, human error, internal
                        fraud, natural disasters, or force majeure events. There
                        is no guarantee that adequate business continuity
                        measures are in place for any project displayed on the
                        Aggregator.
                    </p>
                </div>
            </div>
        </main>
    );
};

export default LegalDisclaimer;
