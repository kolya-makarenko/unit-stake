import { useState, useEffect } from 'react';
import {
    DATABASE_ID,
    TABLE_ID_CATEGORIES,
    tablesDB,
} from '../../../../lib/appwrite';
import classes from './AdminCategories.module.css';

import deleteIcon from '../../../../assets/images/icons/delete.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';
import doneIcon from '../../../../assets/images/icons/done.svg';
import cancelIcon from '../../../../assets/images/icons/cancel.svg';

const AdminCategories = () => {
    const [docId, setDocId] = useState(null);
    const [platformCategories, setPlatformCategories] = useState([]);
    const [projectCategories, setProjectCategories] = useState([]);
    const [projectFilters, setProjectFilters] = useState([]);
    const [partnerCategories, setPartnerCategories] = useState([]);

    const [newPlatform, setNewPlatform] = useState('');
    const [newProject, setNewProject] = useState('');
    const [newFilter, setNewFilter] = useState('');
    const [newPartner, setNewPartner] = useState('');

    const [editPlatformIndex, setEditPlatformIndex] = useState(-1);
    const [editPlatformValue, setEditPlatformValue] = useState('');

    const [editProjectIndex, setEditProjectIndex] = useState(-1);
    const [editProjectValue, setEditProjectValue] = useState('');

    const [editFilterIndex, setEditFilterIndex] = useState(-1);
    const [editFilterValue, setEditFilterValue] = useState('');

    const [editPartnerIndex, setEditPartnerIndex] = useState(-1);
    const [editPartnerValue, setEditPartnerValue] = useState('');

    const fetchCategories = async () => {
        try {
            const response = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_CATEGORIES,
            });

            if (response.rows && response.rows.length > 0) {
                const dataDoc = response.rows[0];
                setDocId(dataDoc.$id || dataDoc.id);
                setPlatformCategories(dataDoc.platform_categories || []);
                setProjectCategories(dataDoc.project_categories || []);
                setProjectFilters(dataDoc.project_filters || []);
                setPartnerCategories(dataDoc.partner_categories || []);
            }
        } catch (error) {
            console.error(
                'Error loading categories and filters:',
                error.message,
            );
            alert('Failed to load data from database.');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const updateDatabase = async (
        updatedPlatforms,
        updatedProjects,
        updatedFilters,
        updatedPartners,
    ) => {
        if (!docId) {
            alert('Error: The document ID was not found in the database.');
            return false;
        }

        try {
            await tablesDB.updateRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_CATEGORIES,
                rowId: docId,
                data: {
                    platform_categories: updatedPlatforms,
                    project_categories: updatedProjects,
                    project_filters: updatedFilters,
                    partner_categories: updatedPartners,
                },
            });
            return true;
        } catch (error) {
            console.error('Error updating database:', error.message);
            alert('Unable to save changes to the database.');
            return false;
        }
    };

    const handleAddPlatform = async (e) => {
        e.preventDefault();
        if (!newPlatform.trim()) return;

        const updated = [...platformCategories, newPlatform.trim()];
        const success = await updateDatabase(
            updated,
            projectCategories,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setPlatformCategories(updated);
            setNewPlatform('');
        }
    };

    const handleDeletePlatform = async (categoryToDelete) => {
        if (!window.confirm(`Delete category "${categoryToDelete}"?`)) return;

        const updated = platformCategories.filter(
            (cat) => cat !== categoryToDelete,
        );
        const success = await updateDatabase(
            updated,
            projectCategories,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setPlatformCategories(updated);
            setEditPlatformIndex(-1);
        }
    };

    const startEditPlatform = (index, value) => {
        setEditPlatformIndex(index);
        setEditPlatformValue(value);
    };

    const handleSavePlatformEdit = async (index) => {
        if (!editPlatformValue.trim()) return;

        const updated = [...platformCategories];
        updated[index] = editPlatformValue.trim();

        const success = await updateDatabase(
            updated,
            projectCategories,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setPlatformCategories(updated);
            setEditPlatformIndex(-1);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        if (!newProject.trim()) return;

        const updated = [...projectCategories, newProject.trim()];
        const success = await updateDatabase(
            platformCategories,
            updated,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setProjectCategories(updated);
            setNewProject('');
        }
    };

    const handleDeleteProject = async (categoryToDelete) => {
        if (!window.confirm(`Delete category "${categoryToDelete}"?`)) return;

        const updated = projectCategories.filter(
            (cat) => cat !== categoryToDelete,
        );
        const success = await updateDatabase(
            platformCategories,
            updated,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setProjectCategories(updated);
            setEditProjectIndex(-1);
        }
    };

    const startEditProject = (index, value) => {
        setEditProjectIndex(index);
        setEditProjectValue(value);
    };

    const handleSaveProjectEdit = async (index) => {
        if (!editProjectValue.trim()) return;

        const updated = [...projectCategories];
        updated[index] = editProjectValue.trim();

        const success = await updateDatabase(
            platformCategories,
            updated,
            projectFilters,
            partnerCategories,
        );
        if (success) {
            setProjectCategories(updated);
            setEditProjectIndex(-1);
        }
    };

    const handleAddFilter = async (e) => {
        e.preventDefault();
        if (!newFilter.trim()) return;

        const updated = [...projectFilters, newFilter.trim()];
        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            updated,
            partnerCategories,
        );
        if (success) {
            setProjectFilters(updated);
            setNewFilter('');
        }
    };

    const handleDeleteFilter = async (filterToDelete) => {
        if (!window.confirm(`Delete filter "${filterToDelete}"?`)) return;

        const updated = projectFilters.filter(
            (filt) => filt !== filterToDelete,
        );
        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            updated,
            partnerCategories,
        );
        if (success) {
            setProjectFilters(updated);
            setEditFilterIndex(-1);
        }
    };

    const startEditFilter = (index, value) => {
        setEditFilterIndex(index);
        setEditFilterValue(value);
    };

    const handleSaveFilterEdit = async (index) => {
        if (!editFilterValue.trim()) return;

        const updated = [...projectFilters];
        updated[index] = editFilterValue.trim();

        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            updated,
            partnerCategories,
        );
        if (success) {
            setProjectFilters(updated);
            setEditFilterIndex(-1);
        }
    };

    const handleAddPartner = async (e) => {
        e.preventDefault();
        if (!newPartner.trim()) return;

        const updated = [...partnerCategories, newPartner.trim()];
        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            projectFilters,
            updated,
        );
        if (success) {
            setPartnerCategories(updated);
            setNewPartner('');
        }
    };

    const handleDeletePartner = async (categoryToDelete) => {
        if (!window.confirm(`Delete category "${categoryToDelete}"?`)) return;

        const updated = partnerCategories.filter(
            (cat) => cat !== categoryToDelete,
        );
        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            projectFilters,
            updated,
        );
        if (success) {
            setPartnerCategories(updated);
            setEditPartnerIndex(-1);
        }
    };

    const startEditPartner = (index, value) => {
        setEditPartnerIndex(index);
        setEditPartnerValue(value);
    };

    const handleSavePartnerEdit = async (index) => {
        if (!editPartnerValue.trim()) return;

        const updated = [...partnerCategories];
        updated[index] = editPartnerValue.trim();

        const success = await updateDatabase(
            platformCategories,
            projectCategories,
            projectFilters,
            updated,
        );
        if (success) {
            setPartnerCategories(updated);
            setEditPartnerIndex(-1);
        }
    };

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Categories & Filters</h2>
            </div>
            <div className={classes.adminCategories}>
                <div className={classes.adminCategoriesContainer}>
                    <h3>Platforms</h3>

                    <form
                        onSubmit={handleAddPlatform}
                        className={classes.addForm}
                    >
                        <input
                            type="text"
                            value={newPlatform}
                            onChange={(e) => setNewPlatform(e.target.value)}
                            placeholder="New category"
                        />
                        <button type="submit">+ Add category</button>
                    </form>

                    <ul className={classes.categoryList}>
                        {platformCategories.map((cat, index) => (
                            <li key={index} className={classes.categoryItem}>
                                {editPlatformIndex === index ? (
                                    <div className={classes.editWrapper}>
                                        <input
                                            type="text"
                                            value={editPlatformValue}
                                            onChange={(e) =>
                                                setEditPlatformValue(
                                                    e.target.value,
                                                )
                                            }
                                            className={classes.editInput}
                                        />
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    handleSavePlatformEdit(
                                                        index,
                                                    )
                                                }
                                                className={classes.saveBtn}
                                            >
                                                <img
                                                    src={doneIcon}
                                                    alt="done"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditPlatformIndex(-1)
                                                }
                                                className={classes.cancelBtn}
                                            >
                                                <img
                                                    src={cancelIcon}
                                                    alt="cancel"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.categoryView}>
                                        <span className={classes.categoryText}>
                                            {cat}
                                        </span>
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    startEditPlatform(
                                                        index,
                                                        cat,
                                                    )
                                                }
                                                className={classes.editBtn}
                                            >
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeletePlatform(cat)
                                                }
                                                className={classes.deleteBtn}
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={classes.adminCategoriesContainer}>
                    <h3>Projects</h3>

                    <form
                        onSubmit={handleAddProject}
                        className={classes.addForm}
                    >
                        <input
                            type="text"
                            value={newProject}
                            onChange={(e) => setNewProject(e.target.value)}
                            placeholder="New category"
                        />
                        <button type="submit">+ Add category</button>
                    </form>

                    <ul className={classes.categoryList}>
                        {projectCategories.map((cat, index) => (
                            <li key={index} className={classes.categoryItem}>
                                {editProjectIndex === index ? (
                                    <div className={classes.editWrapper}>
                                        <input
                                            type="text"
                                            value={editProjectValue}
                                            onChange={(e) =>
                                                setEditProjectValue(
                                                    e.target.value,
                                                )
                                            }
                                            className={classes.editInput}
                                        />
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    handleSaveProjectEdit(index)
                                                }
                                                className={classes.saveBtn}
                                            >
                                                <img
                                                    src={doneIcon}
                                                    alt="done"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditProjectIndex(-1)
                                                }
                                                className={classes.cancelBtn}
                                            >
                                                <img
                                                    src={cancelIcon}
                                                    alt="cancel"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.categoryView}>
                                        <span className={classes.categoryText}>
                                            {cat}
                                        </span>
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    startEditProject(index, cat)
                                                }
                                                className={classes.editBtn}
                                            >
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteProject(cat)
                                                }
                                                className={classes.deleteBtn}
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={classes.adminCategoriesContainer}>
                    <h3>Project Filters</h3>

                    <form
                        onSubmit={handleAddFilter}
                        className={classes.addForm}
                    >
                        <input
                            type="text"
                            value={newFilter}
                            onChange={(e) => setNewFilter(e.target.value)}
                            placeholder="New filter"
                        />
                        <button type="submit">+ Add filter</button>
                    </form>

                    <ul className={classes.categoryList}>
                        {projectFilters.map((filt, index) => (
                            <li key={index} className={classes.categoryItem}>
                                {editFilterIndex === index ? (
                                    <div className={classes.editWrapper}>
                                        <input
                                            type="text"
                                            value={editFilterValue}
                                            onChange={(e) =>
                                                setEditFilterValue(
                                                    e.target.value,
                                                )
                                            }
                                            className={classes.editInput}
                                        />
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    handleSaveFilterEdit(index)
                                                }
                                                className={classes.saveBtn}
                                            >
                                                <img
                                                    src={doneIcon}
                                                    alt="done"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditFilterIndex(-1)
                                                }
                                                className={classes.cancelBtn}
                                            >
                                                <img
                                                    src={cancelIcon}
                                                    alt="cancel"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.categoryView}>
                                        <span className={classes.categoryText}>
                                            {filt}
                                        </span>
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    startEditFilter(index, filt)
                                                }
                                                className={classes.editBtn}
                                            >
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteFilter(filt)
                                                }
                                                className={classes.deleteBtn}
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={classes.adminCategoriesContainer}>
                    <h3>Partners</h3>

                    <form
                        onSubmit={handleAddPartner}
                        className={classes.addForm}
                    >
                        <input
                            type="text"
                            value={newPartner}
                            onChange={(e) => setNewPartner(e.target.value)}
                            placeholder="New category"
                        />
                        <button type="submit">+ Add category</button>
                    </form>

                    <ul className={classes.categoryList}>
                        {partnerCategories.map((cat, index) => (
                            <li key={index} className={classes.categoryItem}>
                                {editPartnerIndex === index ? (
                                    <div className={classes.editWrapper}>
                                        <input
                                            type="text"
                                            value={editPartnerValue}
                                            onChange={(e) =>
                                                setEditPartnerValue(
                                                    e.target.value,
                                                )
                                            }
                                            className={classes.editInput}
                                        />
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    handleSavePartnerEdit(index)
                                                }
                                                className={classes.saveBtn}
                                            >
                                                <img
                                                    src={doneIcon}
                                                    alt="done"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setEditPartnerIndex(-1)
                                                }
                                                className={classes.cancelBtn}
                                            >
                                                <img
                                                    src={cancelIcon}
                                                    alt="cancel"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.categoryView}>
                                        <span className={classes.categoryText}>
                                            {cat}
                                        </span>
                                        <div className={classes.actions}>
                                            <button
                                                onClick={() =>
                                                    startEditPartner(index, cat)
                                                }
                                                className={classes.editBtn}
                                            >
                                                <img
                                                    src={editIcon}
                                                    alt="edit"
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeletePartner(cat)
                                                }
                                                className={classes.deleteBtn}
                                            >
                                                <img
                                                    src={deleteIcon}
                                                    alt="delete"
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminCategories;
