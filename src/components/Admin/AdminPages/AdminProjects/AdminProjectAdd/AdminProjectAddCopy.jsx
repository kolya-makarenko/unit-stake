import { useNavigate } from 'react-router-dom';
import classes from './AdminProjectAdd.module.css';

import plusIcon from '../../../../../assets/images/icons/plus.svg';

const AdminProjectAdd = () => {
    const navigate = useNavigate();

    const getTodayDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd}`;
    };
    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Add Project</h2>
                <button onClick={() => navigate('/admin/projects')}>
                    <img src={plusIcon} alt="plus" />
                    Back to Projects
                </button>
            </div>
            <form className={classes.addPlatformForm}>
                <h3 className={classes.addPlatformFormHeader}>
                    Project Identity
                </h3>
                <div className={classes.addPlatformFormIdentity}>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="projectName">Project Name</label>
                        <input
                            type="text"
                            id="projectName"
                            placeholder="e.g. NexusFi"
                            required
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="category">Primary Category</label>
                        <select id="category" className={classes.selectInput}>
                            <option value="">Select a category</option>
                        </select>
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="minInvestment">
                            Minimum investment
                        </label>
                        <input
                            type="number"
                            id="minInvestment"
                            placeholder="500"
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="maxInvestment">
                            Maximum investment
                        </label>
                        <input
                            type="number"
                            id="maxInvestment"
                            placeholder="75000000"
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="fundingGoal">Funding goal</label>
                        <input
                            type="number"
                            id="fundingGoal"
                            placeholder="75000000"
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="currentInvestments">
                            Current investments
                        </label>
                        <input
                            type="number"
                            id="currentInvestments"
                            placeholder="50000000"
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="numberInvestors">
                            Number of investors
                        </label>
                        <input
                            type="number"
                            id="numberInvestors"
                            placeholder="63"
                        />
                    </div>
                    <div className={classes.addPlatformFormIdentityField}>
                        <label htmlFor="deadline">Deadline</label>
                        <input type="date" id="deadline" min={getTodayDate()} />
                    </div>
                </div>
                <div className={classes.addPlatformFormContent}>
                    <h3 className={classes.addPlatformFormHeader}>
                        Token addresses
                    </h3>
                    <div className={classes.addPlatformFormContentBlocks}>
                        <div
                            className={classes.addPlatformFormBlocksList}
                        ></div>
                        <div className={classes.addPlatformFormBlockButtons}>
                            <button type="button">+ Token address</button>
                        </div>
                    </div>
                </div>
                <div className={classes.addPlatformFormContent}>
                    <h3 className={classes.addPlatformFormHeader}>
                        Content Blocks
                    </h3>
                    <div className={classes.addPlatformFormContentBlocks}>
                        <div
                            className={classes.addPlatformFormBlocksList}
                        ></div>
                        <div className={classes.addPlatformFormBlockButtons}>
                            <button type="button">+ Add Title</button>
                            <button type="button">+ Add Body Text</button>
                            <button type="button">+ Add List</button>
                            <button type="button">+ Add Image</button>
                            <button type="button">+ Add Document</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminProjectAdd;
