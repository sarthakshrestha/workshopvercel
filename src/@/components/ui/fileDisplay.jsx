import React, { useState, useEffect } from 'react';
import apiClient from 'config/apiClient';

const FileDisplay = ({ fileId, altText }) => {
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchFile = async () => {
            if (!fileId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await apiClient.get(`/download/${fileId}`);
                if (isMounted) {
                    setFileData(response.data);
                }
            } catch (error) {
                console.error("Error fetching the file:", error);
                if (isMounted) {
                    setError("Failed to load file");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchFile();

        return () => {
            isMounted = false;
        };
    }, [fileId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!fileData) return null;

    const { file_name, mime_type, content_url } = fileData;

    const ImageComponent = () => {
        const [loaded, setLoaded] = useState(false);
        return (
            <>
                {!loaded && <div className="w-full h-40 bg-gray-200 animate-pulse" />}
                <img 
                    src={content_url}
                    alt={altText || file_name} 
                    className={`w-full h-auto max-h-40 object-contain transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLoaded(true)}
                    loading="lazy"
                />
            </>
        );
    };

    if (mime_type.startsWith('image/')) {
        return <ImageComponent />;
    } else if (mime_type.startsWith('video/')) {
        return (
            <video 
                src={content_url}
                controls 
                className="w-full h-auto max-h-40"
                preload="metadata"
            >
                Your browser does not support the video tag.
            </video>
        );
    } else {
        return <a href={content_url} download={file_name}>Download {file_name}</a>;
    }
};

export default FileDisplay;
