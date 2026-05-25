import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminPlatforms.module.css';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    Query,
} from '../../../../lib/appwrite';

import editIcon from '../../../../assets/images/icons/edit.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import plusIcon from '../../../../assets/images/icons/plus.svg';

const ITEMS_PER_PAGE = 25;

const AdminPlatforms = () => {
    const [platforms, setPlatforms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    const fetchPlatforms = async () => {
        try {
            const offset = (currentPage - 1) * ITEMS_PER_PAGE;

            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                queries: [
                    Query.orderDesc('$createdAt'),
                    Query.limit(ITEMS_PER_PAGE),
                    Query.offset(offset),
                ],
            });

            setPlatforms(response.rows);
            setTotalCount(response.total);
        } catch (error) {
            console.error('Error loading platforms:', error.message);
            alert('Failed to load platforms data.');
            navigate('/admin');
        }
    };

    const editPlatform = (platformId) => {
        navigate(`/admin/platforms/edit/${platformId}`);
    };

    const deletePlatform = async (platformId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this platform?',
        );
        if (!confirmDelete) return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
                rowId: platformId,
            });
            setPlatforms((prevPlatforms) =>
                prevPlatforms.filter((platform) => platform.$id !== platformId),
            );
            setTotalCount((prev) => Math.max(0, prev - 1));
            alert('Platform deleted successfully.');
        } catch (error) {
            console.error('Error deleting platform:', error.message);
            alert('Failed to delete platform. Please try again.');
        }
    };

    useEffect(() => {
        fetchPlatforms();
    }, [currentPage]);

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const dateFormatter = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Platforms</h2>
                <button onClick={() => navigate('/admin/platforms/add')}>
                    <img src={plusIcon} alt="plus" />
                    Add Platform
                </button>
            </div>
            <table className={classes.platformsList}>
                <thead>
                    <tr>
                        <th>Platform</th>
                        <th>Category</th>
                        <th>Assets</th>
                        <th>Published</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {platforms.map((platform, index) => (
                        <tr key={index}>
                            <td className={classes.platformListName}>
                                {platform.name}
                            </td>
                            <td className={classes.platformListCategory}>
                                {platform.category}
                            </td>
                            <td className={classes.platformListCategory}>
                                ${platform.assets}
                            </td>
                            <td>
                                {platform.is_published ? (
                                    <div
                                        className={
                                            classes.platformListVerificationOn
                                        }
                                    >
                                        Published
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            classes.platformListVerificationOff
                                        }
                                    >
                                        Not Published
                                    </div>
                                )}
                            </td>
                            <td className={classes.platformListDate}>
                                {dateFormatter(platform.$createdAt)}
                            </td>
                            <td className={classes.platformsListActions}>
                                <button
                                    className={classes.platformsListEdit}
                                    onClick={() => editPlatform(platform.$id)}
                                >
                                    <img src={editIcon} alt="edit" />
                                </button>
                                <button
                                    className={classes.platformsListDelete}
                                    onClick={() => deletePlatform(platform.$id)}
                                >
                                    <img src={deleteIcon} alt="delete" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {totalPages > 1 && (
                <div className={classes.adminMailsPagination}>
                    <h4 className={classes.adminMailsPaginationInfo}>
                        Showing {currentPage} of {totalPages} platforms
                    </h4>
                    <div className={classes.adminMailsPaginationBtns}>
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={classes.adminMailsPaginationBtnPrev}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.25 10.5L8.75 7L5.25 3.5"
                                    stroke="#808080"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => {
                            const pageNumber = index + 1;
                            return (
                                <button
                                    key={pageNumber}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`${classes.adminMailsPaginationBtnNumber} ${
                                        currentPage === pageNumber
                                            ? classes.active
                                            : ''
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={classes.adminMailsPaginationBtnNext}
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M5.25 10.5L8.75 7L5.25 3.5"
                                    stroke="#808080"
                                    strokeWidth="1.16667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPlatforms;
