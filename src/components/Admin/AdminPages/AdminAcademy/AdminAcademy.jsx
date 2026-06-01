import { useState, useEffect } from 'react';
import {
    tablesDB,
    DATABASE_ID,
    TABLE_ID_ACADEMY,
    ID,
} from '../../../../lib/appwrite';

import classes from './AdminAcademy.module.css';

import deleteIcon from '../../../../assets/images/icons/delete.svg';

const AdminAcademy = () => {
    const [blocks, setBlocks] = useState([]);
    const [recordId, setRecordId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchAcademyData = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_ACADEMY,
                });

                if (response.rows && response.rows.length > 0) {
                    const record = response.rows[0];
                    setRecordId(record.$id);

                    if (
                        record.content_blocks &&
                        record.content_blocks.length > 0
                    ) {
                        const parsedBlocks = record.content_blocks.map(
                            (blockStr) => {
                                const parsed = JSON.parse(blockStr);
                                return {
                                    id: ID.unique(),
                                    title: parsed.title || '',
                                    text: parsed.text || '',
                                };
                            },
                        );
                        setBlocks(parsedBlocks);
                    }
                }
            } catch (error) {
                console.error('Error loading academy data:', error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAcademyData();
    }, []);

    const addBlock = () => {
        const newBlock = {
            id: ID.unique(),
            title: '',
            text: '',
        };
        setBlocks([...blocks, newBlock]);
    };

    const handleBlockChange = (id, field, value) => {
        setBlocks(
            blocks.map((block) =>
                block.id === id ? { ...block, [field]: value } : block,
            ),
        );
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter((block) => block.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const serializedBlocks = blocks.map((block) =>
                JSON.stringify({
                    title: block.title,
                    text: block.text,
                }),
            );

            const data = {
                content_blocks: serializedBlocks,
            };

            if (recordId) {
                await tablesDB.updateRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_ACADEMY,
                    rowId: recordId,
                    data: data,
                });
                alert('Academy content updated successfully!');
            } else {
                await tablesDB.createRow({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_ACADEMY,
                    rowId: ID.unique(),
                    data: data,
                });
                alert('Academy content created successfully!');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error saving academy data:', error);
            alert(`Failed to save academy content: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className={classes.adminPage}>
                <h3>Loading academy data...</h3>
            </div>
        );
    }

    return (
        <div className={classes.adminPage}>
            <div className={classes.AdminHeader}>
                <h2>Academy</h2>
            </div>

            <form onSubmit={handleSubmit} className={classes.addPlatformForm}>
                <div className={classes.addPlatformFormContent}>
                    <h3 className={classes.addPlatformFormHeader}>
                        Academy Content Blocks
                    </h3>

                    <div className={classes.addPlatformFormContentBlocks}>
                        <div className={classes.addPlatformFormBlocksList}>
                            {blocks.map((block, index) => (
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
                                        <span>Content Block {index + 1}</span>
                                        <button
                                            type="button"
                                            className={classes.deleteBlockBtn}
                                            onClick={() =>
                                                removeBlock(block.id)
                                            }
                                        >
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                            />
                                        </button>
                                    </div>

                                    <div className={classes.academyBlockFields}>
                                        <input
                                            type="text"
                                            placeholder="Section Title (e.g., Introduction)"
                                            value={block.title}
                                            onChange={(e) =>
                                                handleBlockChange(
                                                    block.id,
                                                    'title',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                            required
                                        />
                                        <textarea
                                            placeholder="Write the section content here..."
                                            value={block.text}
                                            onChange={(e) =>
                                                handleBlockChange(
                                                    block.id,
                                                    'text',
                                                    e.target.value,
                                                )
                                            }
                                            className={
                                                classes.addPlatformFormBlocksListItemInputTitle
                                            }
                                            rows={6}
                                            required
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={classes.addPlatformFormBlockButtons}>
                            <button type="button" onClick={addBlock}>
                                + Add Content Block
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={classes.submitBtn}
                >
                    {isSubmitting
                        ? 'Saving Changes...'
                        : 'Save Academy Content'}
                </button>
            </form>
        </div>
    );
};

export default AdminAcademy;
