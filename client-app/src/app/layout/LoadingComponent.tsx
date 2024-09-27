import './LoadingComponent.css';

interface Props {
    content?: string;
}

export default function LoadingComponent({ content = 'Loading...' }: Props) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>{content}</p>
        </div>
    );
}
