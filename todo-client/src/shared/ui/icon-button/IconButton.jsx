import './IconButton.css';

const IconButton = ({ onClick, icon, title = '', className = '' }) => {
    return (
        <button className={`shared-icon-button ${className}`} onClick={onClick} title={title}>
            <i className={icon}></i>
        </button>
    );
};

export default IconButton;