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

    const [draggedIndex, setDraggedIndex] = useState(null);

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
                                    type: parsed.type || 'p',
                                    value:
                                        parsed.value !== undefined
                                            ? parsed.value
                                            : parsed.text || parsed.title || '',
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

    const addBlock = (type) => {
        const newBlock = {
            id: ID.unique(),
            type: type,
            value: '',
        };
        setBlocks([...blocks, newBlock]);
    };

    const handleBlockChange = (id, value) => {
        setBlocks(
            blocks.map((block) =>
                block.id === id ? { ...block, value: value } : block,
            ),
        );
    };

    const removeBlock = (id) => {
        setBlocks(blocks.filter((block) => block.id !== id));
    };

    const handleDragStart = (e, index) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        if (draggedIndex === null || draggedIndex === index) return;

        const updatedBlocks = [...blocks];
        const draggedBlock = updatedBlocks[draggedIndex];

        updatedBlocks.splice(draggedIndex, 1);
        updatedBlocks.splice(index, 0, draggedBlock);

        setDraggedIndex(index);
        setBlocks(updatedBlocks);
    };

    const handleDragEnd = () => {
        setDraggedIndex(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const serializedBlocks = blocks.map((block) =>
                JSON.stringify({
                    type: block.type,
                    value: block.value,
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
                                    className={`${classes.addPlatformFormBlocksListItem} ${classes[block.type] || ''} ${
                                        draggedIndex === index
                                            ? classes.dragging
                                            : ''
                                    }`}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                >
                                    <div
                                        className={`${classes.addPlatformFormBlocksListItemHeader}`}
                                        draggable="true"
                                        onDragStart={(e) =>
                                            handleDragStart(e, index)
                                        }
                                        onDragEnd={handleDragEnd}
                                        style={{ cursor: 'grab' }}
                                    >
                                        <span>
                                            ☰ Block {index + 1}:{' '}
                                            <strong>
                                                {block.type === 'h3' && 'Title'}
                                                {block.type === 'h4' &&
                                                    'Subtitle'}
                                                {block.type === 'strong' &&
                                                    'Bold Text'}
                                                {block.type === 'p' &&
                                                    'Body Text'}
                                            </strong>
                                        </span>
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
                                        {block.type === 'h3' ||
                                        block.type === 'h4' ? (
                                            <input
                                                type="text"
                                                placeholder={`Enter ${block.type === 'h3' ? 'title' : 'subtitle'}...`}
                                                value={block.value}
                                                onChange={(e) =>
                                                    handleBlockChange(
                                                        block.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    classes.addPlatformFormBlocksListItemInputTitle
                                                }
                                                required
                                            />
                                        ) : (
                                            <textarea
                                                placeholder={`Enter ${block.type === 'strong' ? 'bold text' : 'paragraph content'}...`}
                                                value={block.value}
                                                onChange={(e) =>
                                                    handleBlockChange(
                                                        block.id,
                                                        e.target.value,
                                                    )
                                                }
                                                className={
                                                    classes.addPlatformFormBlocksListItemInputTitle
                                                }
                                                rows={
                                                    block.type === 'p' ? 6 : 1
                                                }
                                                required
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={classes.addPlatformFormBlockButtons}>
                            <button
                                type="button"
                                onClick={() => addBlock('h3')}
                            >
                                + Add Title
                            </button>
                            <button
                                type="button"
                                onClick={() => addBlock('h4')}
                            >
                                + Add Subtitle
                            </button>
                            <button
                                type="button"
                                onClick={() => addBlock('strong')}
                            >
                                + Add Bold Text
                            </button>
                            <button type="button" onClick={() => addBlock('p')}>
                                + Add Body Text
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
