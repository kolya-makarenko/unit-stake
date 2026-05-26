import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PROJECTS,
    Query,
} from '../../../../lib/appwrite';
import classes from './AdminProjects.module.css';

import editIcon from '../../../../assets/images/icons/edit.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import plusIcon from '../../../../assets/images/icons/plus.svg';

const ITEMS_PER_PAGE = 25;

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const offset = (currentPage - 1) * ITEMS_PER_PAGE;

                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_PROJECTS,
                    queries: [
                        Query.orderDesc('$createdAt'),
                        Query.limit(ITEMS_PER_PAGE),
                        Query.offset(offset),
                    ],
                });

                setProjects(response.rows);
                setTotalCount(response.total);
            } catch (error) {
                console.error('Error loading projects:', error.message);
                alert('Failed to load projects data.');
                navigate('/admin');
            }
        };

        fetchProjects();
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
                <h2>Projects</h2>
                <button onClick={() => navigate('/admin/projects/add')}>
                    <img src={plusIcon} alt="plus" />
                    Add Platform
                </button>
            </div>
            <table className={classes.platformsList}>
                <thead>
                    <tr>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Verifeid</th>
                        <th>Published</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index}>
                            <td className={classes.platformListName}>
                                {project.name}
                            </td>
                            <td className={classes.platformListCategory}>
                                {project.category}
                            </td>
                            <td>
                                {project.is_verified ? (
                                    <div
                                        className={
                                            classes.platformListVerificationOn
                                        }
                                    >
                                        Verified
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            classes.platformListVerificationOff
                                        }
                                    >
                                        Not Verified
                                    </div>
                                )}
                            </td>
                            <td>
                                {project.is_published ? (
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
                                {dateFormatter(project.$createdAt)}
                            </td>
                            <td className={classes.platformsListActions}>
                                <button className={classes.platformsListEdit}>
                                    <img src={editIcon} alt="edit" />
                                </button>
                                <button className={classes.platformsListDelete}>
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
                        Showing {currentPage} of {totalPages} projects
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

export default AdminProjects;
