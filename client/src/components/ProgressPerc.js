import { useEffect } from 'react';
import useStorage from '../imageHooks/useStorage';

const Progress = ({file, setFile, setFileURL}) => {
    const { url, progress } = useStorage(file);

    useEffect(() => {
        if(url) {
            setFileURL(url);
        }
    }, [url, setFileURL])

    console.log(progress, url);
    return (
        <div>
            {`${progress}%`}
        </div>
    )
}

export default Progress;