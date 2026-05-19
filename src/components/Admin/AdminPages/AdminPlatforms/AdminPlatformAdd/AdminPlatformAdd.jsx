import { useNavigate } from 'react-router-dom';
import classes from './AdminPlatformAdd.module.css';

const AdminPlatformAdd = () => {
    const navigate = useNavigate();
    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Add Platform</h2>
                <button onClick={() => navigate('/admin/platforms')}>
                    Back to Platforms
                </button>
            </div>
        </div>
    );
};

export default AdminPlatformAdd;
