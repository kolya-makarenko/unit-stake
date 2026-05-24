import classes from './AdminDashboard.module.css';
import AdminMails from './AdminMails/AdminMails';

const AdminDashboard = () => {
    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Dashboard</h2>
            </div>
            <AdminMails />
        </div>
    );
};

export default AdminDashboard;
