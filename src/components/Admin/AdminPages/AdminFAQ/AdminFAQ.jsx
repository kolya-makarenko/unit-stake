import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_FAQS_PAGE,
    TABLE_ID_PARTNERS,
    TABLE_ID_PLATFORMS,
    TABLE_ID_PROJECTS,
    TABLE_ID_NEWS,
    ID,
} from '../../../../lib/appwrite';
import classes from './AdminFAQ.module.css';

import plusIcon from '../../../../assets/images/icons/plus.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';

const AdminFAQ = () => {
    const [faqGroups, setFaqGroups] = useState([]);

    const [platforms, setPlatforms] = useState([]);
    const [projects, setProjects] = useState([]);
    const [partners, setPartners] = useState([]);
    const [newsList, setNewsList] = useState([]);

    const [pageType, setPageType] = useState('assets_owners');
    const [relatedId, setRelatedId] = useState('');

    const [faqBlocks, setFaqBlocks] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingFaqGroupId, setEditingFaqGroupId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const [faqsRes, platformsRes, projectsRes, partnersRes, newsRes] =
                await Promise.all([
                    tablesDB.listRows({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_FAQS_PAGE,
                    }),
                    tablesDB.listRows({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_PLATFORMS,
                    }),
                    tablesDB.listRows({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_PROJECTS,
                    }),
                    tablesDB.listRows({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_PARTNERS,
                    }),
                    tablesDB.listRows({
                        databaseId: DATABASE_ID,
                        tableId: TABLE_ID_NEWS,
                    }),
                ]);

            setFaqGroups(faqsRes.rows || []);
            setPlatforms(platformsRes.rows || []);
            setProjects(projectsRes.rows || []);
            setPartners(partnersRes.rows || []);
            setNewsList(newsRes.rows || []);
        } catch (error) {
            console.error('Error loading FAQ data:', error.message);
            alert('Error loading FAQ data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const addFaqBlock = () => {
        const newBlock = {
            id: ID.unique(),
            question: '',
            answer: '',
        };
        setFaqBlocks([...faqBlocks, newBlock]);
    };

    const handleBlockChange = (id, field, value) => {
        setFaqBlocks(
            faqBlocks.map((block) =>
                block.id === id ? { ...block, [field]: value } : block,
            ),
        );
    };

    const removeFaqBlock = (id) => {
        setFaqBlocks(faqBlocks.filter((block) => block.id !== id));
    };

    const handleAddClick = () => {
        setPageType('assets_owners');
        setRelatedId('');
        setFaqBlocks([]);
        setEditingFaqGroupId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (faqGroup) => {
        setPageType(faqGroup.page_type || 'assets_owners');
        setRelatedId(faqGroup.related_id || '');
        setEditingFaqGroupId(faqGroup.$id);

        if (faqGroup.faq_blocks && faqGroup.faq_blocks.length) {
            const parsedBlocks = faqGroup.faq_blocks.map((blockStr) => {
                const block = JSON.parse(blockStr);
                return {
                    id: ID.unique(),
                    question: block.question || '',
                    answer: block.answer || '',
                };
            });
            setFaqBlocks(parsedBlocks);
        } else {
            setFaqBlocks([]);
        }

        setIsFormOpen(true);
    };

    const handleDeleteClick = async (groupId) => {
        if (
            !window.confirm(
                'Are you sure you want to delete this entire FAQ section?',
            )
        )
            return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FAQS_PAGE,
                rowId: groupId,
            });
            alert('The FAQ section has been successfully deleted!');
            fetchData();
        } catch (error) {
            console.error('Error deleting FAQ group:', error);
            alert('Error deleting the FAQ section.');
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingFaqGroupId(null);
    };

    const handlePageTypeChange = (e) => {
        setPageType(e.target.value);
        setRelatedId('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (faqBlocks.length === 0) {
            alert('Please add at least one question.');
            return;
        }

        setIsSubmitting(true);

        try {
            const stringifiedBlocks = faqBlocks.map((block) =>
                JSON.stringify({
                    question: block.question,
                    answer: block.answer,
                }),
            );

            const data = {
                page_type: pageType,
                related_id: relatedId,
                faq_blocks: stringifiedBlocks,
            };

            if (editingFaqGroupId) {
                await tablesDB.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_FAQS_PAGE,
                    rowId: editingFaqGroupId,
                    data: data,
                });
                alert('The FAQ has been successfully updated!');
            } else {
                await tablesDB.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_FAQS_PAGE,
                    rowId: ID.unique(),
                    data: data,
                });
                alert('FAQ successfully added!');
            }

            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error saving FAQ:', error);
            alert(`Error saving: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPageTypeLabel = (type) => {
        const labels = {
            assets_owners: 'For Assets Owners',
            about_us: 'About us',
            platform: 'Platform',
            project: 'Project',
            news: 'News & Articles',
            partner: 'Partners',
        };
        return labels[type] || type;
    };

    const getRelatedNameLabel = (faqGroup) => {
        if (!faqGroup.related_id) return '';

        if (faqGroup.page_type === 'platform') {
            const found = platforms.find((p) => p.$id === faqGroup.related_id);
            return found ? `${found.name}` : 'Platform Not Found';
        }
        if (faqGroup.page_type === 'project') {
            const found = projects.find((p) => p.$id === faqGroup.related_id);
            return found ? `${found.name}` : 'Project Not Found';
        }
        if (faqGroup.page_type === 'news') {
            const found = newsList.find((n) => n.$id === faqGroup.related_id);
            return found ? `${found.title}` : 'Article Not Found';
        }
        if (faqGroup.page_type === 'partner') {
            const found = partners.find((p) => p.$id === faqGroup.related_id);
            return found ? `${found.name}` : 'Partner Not Found';
        }
        return '';
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading FAQ...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            {isFormOpen ? (
                <div className={classes.AdminHeader}>
                    <h2>
                        {editingFaqGroupId ? 'Edit FAQ Group' : 'Add FAQ Group'}
                    </h2>
                    <button onClick={handleCancel}>
                        Back to FAQ Management
                    </button>
                </div>
            ) : (
                <div className={classes.AdminHeader}>
                    <h2>FAQ Management</h2>
                    <button onClick={handleAddClick}>
                        <img src={plusIcon} alt="plus" />
                        Create FAQ Group
                    </button>
                </div>
            )}

            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className={classes.addPlatformForm}
                >
                    <h3 className={classes.addPlatformFormHeader}>
                        {editingFaqGroupId
                            ? 'Edit FAQ Group'
                            : 'Create New FAQ Group'}
                    </h3>

                    <div className={classes.addPlatformFormIdentity}>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="pageType">Target Page</label>
                            <select
                                id="pageType"
                                value={pageType}
                                onChange={handlePageTypeChange}
                                required
                            >
                                <option value="assets_owners">
                                    For Assets Owners
                                </option>
                                <option value="about_us">About us</option>
                                <option value="platform">Platform</option>
                                <option value="project">Project</option>
                                <option value="news">News & Articles</option>
                                <option value="partner">Partners</option>
                            </select>
                        </div>

                        {/* {pageType === 'platform' && (
                            <div
                                className={classes.addPlatformFormIdentityField}
                            >
                                <label htmlFor="relatedPlatform">
                                    Select Specific Platform
                                </label>
                                <select
                                    id="relatedPlatform"
                                    value={relatedId}
                                    onChange={(e) =>
                                        setRelatedId(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Choose Platform
                                    </option>
                                    {platforms.map((p) => (
                                        <option key={p.$id} value={p.$id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )} */}

                        {/* {pageType === 'project' && (
                            <div
                                className={classes.addPlatformFormIdentityField}
                            >
                                <label htmlFor="relatedProject">
                                    Select Specific Project
                                </label>
                                <select
                                    id="relatedProject"
                                    value={relatedId}
                                    onChange={(e) =>
                                        setRelatedId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Choose Project
                                    </option>
                                    {projects.map((p) => (
                                        <option key={p.$id} value={p.$id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )} */}

                        {pageType === 'news' && (
                            <div
                                className={classes.addPlatformFormIdentityField}
                            >
                                <label htmlFor="relatedNews">
                                    Select Specific Article
                                </label>
                                <select
                                    id="relatedNews"
                                    value={relatedId}
                                    onChange={(e) =>
                                        setRelatedId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Choose Article
                                    </option>
                                    {newsList.map((n) => (
                                        <option key={n.$id} value={n.$id}>
                                            {n.title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {pageType === 'partner' && (
                            <div
                                className={classes.addPlatformFormIdentityField}
                            >
                                <label htmlFor="relatedPartner">
                                    Select Specific Partner
                                </label>
                                <select
                                    id="relatedPartner"
                                    value={relatedId}
                                    onChange={(e) =>
                                        setRelatedId(e.target.value)
                                    }
                                    required
                                >
                                    <option value="" disabled>
                                        Choose Partner
                                    </option>
                                    {partners.map((p) => (
                                        <option key={p.$id} value={p.$id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <div className={classes.addPlatformFormContent}>
                        <h3 className={classes.addPlatformFormHeader}>
                            Questions & Answers Builder
                        </h3>
                        <div className={classes.addPlatformFormContentBlocks}>
                            <div className={classes.addPlatformFormBlocksList}>
                                {faqBlocks.map((block, index) => (
                                    <div
                                        key={block.id}
                                        className={
                                            classes.addPlatformFormBlocksListItem
                                        }
                                    >
                                        <div
                                            className={
                                                classes.addPlatformFormBlocksListItemHeader
                                            }
                                        >
                                            <span>FAQ Block {index + 1}</span>
                                            <button
                                                type="button"
                                                className={
                                                    classes.deleteBlockBtn
                                                }
                                                onClick={() =>
                                                    removeFaqBlock(block.id)
                                                }
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="Delete"
                                                />
                                            </button>
                                        </div>
                                        <div className={classes.adminFaqBlock}>
                                            <div
                                                className={
                                                    classes.adminFaqBlockItem
                                                }
                                            >
                                                <label>Question</label>
                                                <input
                                                    type="text"
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    placeholder="Enter question..."
                                                    value={block.question}
                                                    onChange={(e) =>
                                                        handleBlockChange(
                                                            block.id,
                                                            'question',
                                                            e.target.value,
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div
                                                className={
                                                    classes.adminFaqBlockItem
                                                }
                                            >
                                                <label>Answer</label>
                                                <textarea
                                                    placeholder="Enter answer..."
                                                    className={
                                                        classes.addPlatformFormBlocksListItemInputTitle
                                                    }
                                                    value={block.answer}
                                                    onChange={(e) =>
                                                        handleBlockChange(
                                                            block.id,
                                                            'answer',
                                                            e.target.value,
                                                        )
                                                    }
                                                    rows={3}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={classes.addPlatformFormBlockButtons}
                            >
                                <button type="button" onClick={addFaqBlock}>
                                    + Add Q&A Block
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className={classes.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save FAQ Group'}
                        </button>
                    </div>
                </form>
            )}

            {!isFormOpen && (
                <div className={classes.adminPartners}>
                    <h3 className={classes.adminFaqHeader}>
                        Existing FAQs List
                    </h3>
                    <div className={classes.adminFaqGrid}>
                        {faqGroups.length === 0 ? (
                            <p className={classes.addPlatformFormHeader}>
                                No FAQ blocks have been created
                            </p>
                        ) : (
                            faqGroups.map((group) => (
                                <div
                                    key={group.$id}
                                    className={classes.adminFaqGridItem}
                                >
                                    <div
                                        className={classes.adminFaqGridItemName}
                                    >
                                        <h5>
                                            {getPageTypeLabel(group.page_type)}
                                        </h5>
                                        <h6>{getRelatedNameLabel(group)}</h6>
                                    </div>
                                    <div
                                        className={
                                            classes.adminPartnersListItemActions
                                        }
                                    >
                                        <button
                                            type="button"
                                            className={
                                                classes.adminPartnersListItemEdit
                                            }
                                            onClick={() =>
                                                handleEditClick(group)
                                            }
                                        >
                                            <img src={editIcon} alt="edit" />
                                        </button>
                                        <button
                                            type="button"
                                            className={
                                                classes.adminPartnersListItemDelete
                                            }
                                            onClick={() =>
                                                handleDeleteClick(group.$id)
                                            }
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminFAQ;
