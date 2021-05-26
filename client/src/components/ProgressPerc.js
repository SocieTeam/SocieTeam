import { useEffect } from 'react';
import useStorage from '../imageHooks/useStorage';

const Progress = ({file, setFile, setFileURL}) => {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        if(url) {
            setFileURL(url);
        }
    }, [url, setFileURL])
    if (progress === 100 || !progress) {
        return null;
    }
    else{
        return (
            <div>
                {`${progress}%`}
            </div>
        )
    }
}

export default Progress;