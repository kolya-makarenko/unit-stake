import { Outlet } from 'react-router-dom';
import AdminMenu from './AdminMenu/AdminMenu';
import classes from './Admin.module.css';

const Admin = () => {
    return (
        <>
            <main className={classes.adminPage}>
                <AdminMenu />
                <section>
                    <Outlet />
                </section>
            </main>
        </>
    );
};

export default Admin;
