import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, memo, useCallback } from 'react';
import { Text } from 'shared/UI/Text';

import classes from './FileUploader.module.scss';

interface FileUploaderProps {
    className?: string;
    setFile: (file: File) => void;
    file?: File;
}

export const FileUploader = memo((props: FileUploaderProps) => {
    const { className, file, setFile } = props;

    const getFileSize = useCallback((file: File): string => {
        const sizeInBytes = file.size;
        const units: string[] = ['б', 'Кб', 'Мб', 'Гб', 'Тб'];

        let unitIndex = 0;
        let size = sizeInBytes;

        while (size > 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex += 1;
        }

        return `${size.toFixed(2)} ${units[unitIndex]}`;
    }, []);

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (event.target?.files?.length) {
                setFile(event.target.files[0]);
            }
        },
        [setFile],
    );

    return (
        <label htmlFor="file_upload" className={classes.button}>
            {file?.size ? (
                <Text
                    titleClassname={classes.title}
                    title={file.name}
                    text={getFileSize(file)}
                    align="center"
                />
            ) : (
                <Text align="center" titleClassname={classes.title} title="Выберите файл" />
            )}

            <input
                id="file_upload"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                type="file"
                accept=".csv"
                className={classNames(classes.FileUploader, {}, [className])}
            />
        </label>
    );
});
