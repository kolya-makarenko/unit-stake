import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_PLATFORMS,
    TABLE_ID_TEAMS,
    BUCKET_ID,
    ID,
    storage,
} from '../../../../lib/appwrite';
import classes from './AdminTeams.module.css';

import plusIcon from '../../../../assets/images/icons/plus.svg';
import deleteIcon from '../../../../assets/images/icons/delete.svg';
import upLoadIcon from '../../../../assets/images/icons/upload.svg';
import imageIcon from '../../../../assets/images/icons/imageIcon.svg';
import editIcon from '../../../../assets/images/icons/edit.svg';

const AdminTeams = () => {
    const [teams, setTeams] = useState([]);
    const [platforms, setPlatforms] = useState([]);

    const [name, setName] = useState('');
    const [platformId, setPlatformId] = useState('');
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [location, setLocation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchData = async () => {
        try {
            setIsLoading(true);

            const teamsResponse = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_TEAMS,
            });
            setTeams(teamsResponse.rows || []);

            const platformsResponse = await tablesDB.listRows({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_PLATFORMS,
            });
            setPlatforms(platformsResponse.rows || []);
        } catch (error) {
            console.error('Error loading admin teams data:', error.message);
            alert('Unable to load team or platform data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleAddClick = () => {
        setName('');
        setPlatformId(platforms[0]?.$id || '');
        setPosition('');
        setDescription('');
        setLinkedinUrl('');
        setLocation('');
        setImageUrl('');
        setImageFile(null);
        setEditingTeamId(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (member) => {
        setName(member.name || '');
        setPlatformId(member.platform_id || '');
        setPosition(member.position || '');
        setDescription(member.description || '');
        setLinkedinUrl(member.linkedin_url || '');
        setLocation(member.location || '');
        setImageUrl(member.image_url || '');
        setImageFile(null);
        setEditingTeamId(member.$id);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (memberId) => {
        if (!window.confirm('Are you sure you want to remove this employee?'))
            return;

        try {
            await tablesDB.deleteRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_TEAMS,
                rowId: memberId,
            });
            alert('The employee has been successfully removed!');
            fetchData();
        } catch (error) {
            console.error('Error deleting team member:', error);
            alert('Error deleting team member.');
        }
    };

    const handleCancel = () => {
        setIsFormOpen(false);
        setEditingTeamId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        setIsSubmitting(true);

        try {
            let finalImageUrl = imageUrl;

            if (imageFile) {
                const uploadedFile = await storage.createFile(
                    BUCKET_ID,
                    ID.unique(),
                    imageFile,
                );
                finalImageUrl = `${storage.client.config.endpoint}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${storage.client.config.project}`;
            }

            const data = {
                name: name,
                platform_id: platformId,
                position: position,
                description: description,
                linkedin_url: linkedinUrl,
                location: location,
                image_url: finalImageUrl,
            };

            if (editingTeamId) {
                await tablesDB.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_TEAMS,
                    rowId: editingTeamId,
                    data: data,
                });
                alert(`The employee's information has been updated!`);
            } else {
                await tablesDB.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_TEAMS,
                    rowId: ID.unique(),
                    data: data,
                });
                alert('The employee has been successfully added!');
            }

            setIsFormOpen(false);
            fetchData();
        } catch (error) {
            console.error('Error saving team member:', error);
            alert(`Error saving: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getPlatformName = (id) => {
        const found = platforms.find((p) => p.$id === id);
        return found ? found.name : 'Not Assigned';
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading data...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            {isFormOpen ? (
                <div className={classes.AdminHeader}>
                    <h2>{editingTeamId ? 'Edit Member' : 'Add Member'}</h2>
                    <button onClick={handleCancel}>Back to Teams</button>
                </div>
            ) : (
                <div className={classes.AdminHeader}>
                    <h2>Teams</h2>
                    <button onClick={handleAddClick}>
                        <img src={plusIcon} alt="plus" />
                        Add Member
                    </button>
                </div>
            )}
            {isFormOpen && (
                <form
                    onSubmit={handleSubmit}
                    className={classes.addPlatformForm}
                >
                    <div className={classes.addPlatformFormIdentity}>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="memberName">Full Name</label>
                            <input
                                type="text"
                                id="memberName"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="memberPlatform">Platform</label>
                            <select
                                id="memberPlatform"
                                value={platformId}
                                onChange={(e) => setPlatformId(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Select Platform
                                </option>
                                {platforms.map((plat) => (
                                    <option key={plat.$id} value={plat.$id}>
                                        {plat.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="memberPosition">Position</label>
                            <input
                                type="text"
                                id="memberPosition"
                                placeholder="CEO / Lead Developer"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="memberLocation">Location</label>
                            <input
                                type="text"
                                id="memberLocation"
                                placeholder="UK, London"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <div className={classes.addPlatformFormIdentityField}>
                            <label htmlFor="memberLinkedin">LinkedIn URL</label>
                            <input
                                type="text"
                                id="memberLinkedin"
                                placeholder="https://linkedin.com/in/username"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                            />
                        </div>
                        <div
                            className={classes.addPlatformFormIdentityField}
                            style={{ gridColumn: '1 / -1' }}
                        >
                            <label htmlFor="memberDescription">
                                Description
                            </label>
                            <textarea
                                id="memberDescription"
                                className={
                                    classes.addPlatformFormBlocksListItemInputTitle
                                }
                                placeholder="Tell something about this member..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                            />
                        </div>
                        <div
                            className={
                                classes.addPlatformFormIdentityFieldImage
                            }
                        >
                            <p>Photo</p>
                            <label htmlFor="memberImage">
                                {imageFile || imageUrl ? (
                                    <div
                                        className={`${classes.addPlatformFormIdentityFieldImagePlaceholder} ${classes.active}`}
                                    >
                                        <img src={imageIcon} alt="upload" />
                                        <span>
                                            {imageFile
                                                ? imageFile.name
                                                : 'Current Photo (Uploaded)'}
                                        </span>
                                    </div>
                                ) : (
                                    <div
                                        className={
                                            classes.addPlatformFormIdentityFieldImagePlaceholder
                                        }
                                    >
                                        <img src={upLoadIcon} alt="upload" />
                                        <span>Select a photo</span>
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="memberImage"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className={classes.submitBtn}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            )}

            {!isFormOpen && (
                <div className={classes.adminPartners}>
                    <h3>Team Members List</h3>
                    <div className={classes.adminPartnersContaner}>
                        {teams.length === 0 ? (
                            <p className={classes.addPlatformFormHeader}>
                                No team members have been added
                            </p>
                        ) : (
                            teams.map((member) => (
                                <div
                                    key={member.$id}
                                    className={classes.adminPartnersListItem}
                                >
                                    <div
                                        className={
                                            classes.adminPartnersListItemName
                                        }
                                    >
                                        <h4>{member.name}</h4>
                                        <h4>
                                            <span>
                                                {getPlatformName(
                                                    member.platform_id,
                                                )}
                                            </span>{' '}
                                            | {member.position || 'No Position'}
                                        </h4>
                                        {member.location && (
                                            <h4>📍 {member.location}</h4>
                                        )}
                                        {member.linkedin_url && (
                                            <a
                                                href={member.linkedin_url}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                LinkedIn Profile
                                            </a>
                                        )}
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
                                                handleEditClick(member)
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
                                                handleDeleteClick(member.$id)
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

export default AdminTeams;
