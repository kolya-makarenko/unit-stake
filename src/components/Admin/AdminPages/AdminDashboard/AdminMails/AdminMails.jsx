import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FORM_MESSAGES,
    ID,
    Query,
} from '../../../../../lib/appwrite';

import classes from './AdminMails.module.css';

const ITEMS_PER_PAGE = 25;

const AdminMails = () => {
    const [messages, setMessages] = useState([]);
    const [totalUnreadMails, setTotalUnreadMails] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    const fetchMessages = async (page) => {
        try {
            const offset = (page - 1) * ITEMS_PER_PAGE;

            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                queries: [
                    Query.orderDesc('$createdAt'),
                    Query.limit(ITEMS_PER_PAGE),
                    Query.offset(offset),
                ],
            });
            setMessages(response.rows);
            setTotalCount(response.total);

            const responseUnreadMails = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                queries: [Query.equal('is_read', false)],
            });
            setTotalUnreadMails(responseUnreadMails.rows.length);
        } catch (error) {
            console.error('Error loading messages:', error.message);
            alert('Failed to load mails data.');
        }
    };

    useEffect(() => {
        fetchMessages(currentPage);
    }, [currentPage]);

    const viewMessage = (mailId) => {
        navigate(`/admin/mail/${mailId}`);
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const formatLocalDate = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
            .format(date)
            .replace(',', '');
    };

    return (
        <div className={classes.adminMails}>
            <div className={classes.adminMailsHeader}>
                <h4>Mails</h4>
                <div className={classes.adminMailsTotal}>
                    <div className={classes.adminMailsTotalMails}>
                        <span>Total mails: {messages.length}</span>
                    </div>
                    <div className={classes.adminMailsTotalUnreadMails}>
                        <span>New mails: {totalUnreadMails}</span>
                    </div>
                </div>
            </div>
            <div className={classes.adminMailsTable}>
                <div className={classes.adminMailsTableHeader}>
                    <span>E-mail</span>
                    <span>Name</span>
                    <span>Phone number</span>
                    <span>Date</span>
                </div>
                {messages.map((message, index) => (
                    <div
                        key={index || message.$id}
                        onClick={() => viewMessage(message.$id)}
                        className={
                            message.is_read
                                ? classes.adminMailsTableRow
                                : `${classes.adminMailsTableRow} ${classes.new}`
                        }
                    >
                        <span className={classes.adminMailsTableRowMail}>
                            {message.mail}
                        </span>
                        <span className={classes.adminMailsTableRowName}>
                            {message.name}
                        </span>
                        <span className={classes.adminMailsTableRowPhone}>
                            {message.phone_number}
                        </span>
                        <span className={classes.adminMailsTableRowDate}>
                            {formatLocalDate(message.$createdAt)}
                        </span>
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className={classes.adminMailsPagination}>
                    <h4 className={classes.adminMailsPaginationInfo}>
                        Showing {currentPage} of {totalPages} mails
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

export default AdminMails;
