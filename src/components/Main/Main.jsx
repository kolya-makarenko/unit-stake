import { Outlet } from 'react-router-dom';
import Header from './Header/Header';

const Main = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Main;
