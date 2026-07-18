import { useState, useEffect, useRef } from 'react';
import { tablesDB, DATABASE_ID, ID } from '../../../../lib/appwrite';
import { useNavigate } from 'react-router-dom';

import classes from './ContactUs.module.css';

const arrowDown = (
    <svg
        width="13"
        height="7"
        viewBox="0 0 13 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M0.849609 0.849976L6.34961 5.84998L11.8496 0.849976"
            stroke="#19191C99"
            strokeWidth="1.7"
            strokeLinecap="round"
        />
    </svg>
);

const TABLE_ID_CATEGORIES = 'categories';
const TABLE_ID_FORM_MESSAGES = 'form_messages';

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        projectName: '',
        email: '',
        contactValue: '',
        country: '',
    });

    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [todoOptions, setTodoOptions] = useState([]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await tablesDB.listRows({
                    databaseId: DATABASE_ID,
                    tableId: TABLE_ID_CATEGORIES,
                });

                if (response.rows && response.rows.length > 0) {
                    const rawCategories = response.rows.map(
                        (row) => row.project_categories,
                    );

                    const flattened = rawCategories.flat().filter(Boolean);

                    const cleanCategories = flattened.map((cat) =>
                        typeof cat === 'string' ? cat.trim() : cat,
                    );

                    const uniqueCategories = [...new Set(cleanCategories)];

                    setCategories(uniqueCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category],
        );
    };

    const handleTodoToggle = (option) => {
        setTodoOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option)
                : [...prev, option],
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');

        if (selectedCategories.length === 0) {
            setSubmitError('Please select at least one Industry / Asset Type.');
            return;
        }

        if (todoOptions.length === 0) {
            setSubmitError(
                'Please select at least one option under "What would you like to do?".',
            );
            return;
        }

        setIsSubmitting(true);

        try {
            const data = {
                name: formData.fullName,
                project_company_name: formData.projectName,
                mail: formData.email,
                whatsapp_telegram: formData.contactValue,
                country: formData.country,
                industry_asset_type: selectedCategories,
                actions_todo: todoOptions,
                purpose: 'contact form',
            };

            await tablesDB.createRow({
                databaseId: DATABASE_ID,
                tableId: TABLE_ID_FORM_MESSAGES,
                rowId: ID.unique(),
                data: data,
            });

            alert('Your message has been sent successfully!');
            navigate('/');

            setFormData({
                fullName: '',
                projectName: '',
                email: '',
                contactValue: '',
                country: '',
            });
            setSelectedCategories([]);
            setTodoOptions([]);
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmitError(`Failed to send message: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={classes.contactContainer}>
            <div className="wrapper">
                <div className={classes.contactHeader}>
                    <h2>Contact Information</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className={classes.contactForm}
                    id="form"
                >
                    <div className={classes.formGrid}>
                        <div className={classes.formGroup}>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Full Name*"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                className={classes.formInput}
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <input
                                type="text"
                                name="projectName"
                                placeholder="Project / Company Name"
                                value={formData.projectName}
                                onChange={handleInputChange}
                                className={classes.formInput}
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email*"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={classes.formInput}
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <input
                                type="text"
                                name="contactValue"
                                placeholder="WhatsApp / Telegram*"
                                value={formData.contactValue}
                                onChange={handleInputChange}
                                className={classes.formInput}
                                required
                            />
                        </div>

                        <div className={classes.formGroup}>
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className={classes.formInput}
                            />
                        </div>

                        <div className={classes.formGroup} ref={dropdownRef}>
                            <div
                                className={classes.customDropdown}
                                onClick={() =>
                                    setIsDropdownOpen(!isDropdownOpen)
                                }
                            >
                                <span className={classes.dropdownPlaceholder}>
                                    {selectedCategories.length > 0
                                        ? selectedCategories.join(', ')
                                        : 'Industry / Asset Type*'}
                                </span>
                                <span
                                    className={`${classes.dropdownArrow} ${isDropdownOpen ? classes.arrowOpen : ''}`}
                                >
                                    {arrowDown}
                                </span>
                            </div>

                            {isDropdownOpen && (
                                <div className={classes.dropdownMenu}>
                                    {categories.length === 0 ? (
                                        <div
                                            className={classes.dropdownLoading}
                                        >
                                            Loading categories...
                                        </div>
                                    ) : (
                                        categories.map((category) => (
                                            <label
                                                key={category}
                                                className={classes.dropdownItem}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(
                                                        category,
                                                    )}
                                                    onChange={() =>
                                                        handleCategoryToggle(
                                                            category,
                                                        )
                                                    }
                                                    className={
                                                        classes.checkboxInput
                                                    }
                                                />
                                                <span>{category}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={classes.actionSection}>
                        <p className={classes.actionSectionTitle}>
                            What would you like to do?*
                        </p>

                        <div className={classes.checkboxGrid}>
                            {[
                                'Apply for Asset Tokenization',
                                'Submit Asset to UnitStake Aggregator',
                                'Apply for Verification',
                                'Other',
                            ].map((option) => (
                                <label
                                    key={option}
                                    className={classes.actionCheckboxLabel}
                                >
                                    <input
                                        type="checkbox"
                                        checked={todoOptions.includes(option)}
                                        onChange={() =>
                                            handleTodoToggle(option)
                                        }
                                        className={classes.checkboxInput}
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={classes.formFooter}>
                        {submitError && (
                            <p className={classes.errorMessage}>
                                {submitError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={classes.submitBtn}
                        >
                            {isSubmitting ? 'Sending...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
