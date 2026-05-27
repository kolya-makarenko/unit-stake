import { useNavigate } from 'react-router-dom';
import classes from './AdminProjectEdit.module.css';

import plusIcon from '../../../../../assets/images/icons/plus.svg';

const AdminProjectEdit = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Edit Project</h2>
                <button onClick={() => navigate('/admin/projects')}>
                    <img src={plusIcon} alt="plus" />
                    Back to Projects
                </button>
            </div>
        </div>
    );
};

export default AdminProjectEdit;
