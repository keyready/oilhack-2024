import { Page } from 'widgets/Page/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/UI/Stack';
import { CSSProperties, FormEvent, useCallback, useState } from 'react';
import { Text } from 'shared/UI/Text';
import { AxiosError } from 'axios';
import { Loader } from 'shared/UI/Loader';
import { FileUploader } from 'shared/UI/FileUploader';
import { Button } from 'shared/UI/Button';
import { $api } from 'shared/api/api';

import classes from './MainPage.module.scss';

const MainPage = () => {
    const bgStyles: CSSProperties = {
        background: `url(/static/bgImg.svg)`,
    };

    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<string>('');

    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleFileChange = useCallback((file: File) => {
        setError('');
        setFile(file);
    }, []);

    const onSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setLoading(true);

            try {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);

                    const resultedFile = await $api.post<string>('/api/calculate', formData);
                    // const resultedFile = 'file_123.csv';
                    if (typeof resultedFile === 'string') {
                        setResult(resultedFile);
                    }
                }
            } catch (e) {
                const error = e as AxiosError;
                setResult('');
                setError(error.response?.data.message || 'Произошла ошибка запроса на сервер');
            }
            setLoading(false);
            setFile(undefined);
        },
        [file],
    );

    return (
        <Page style={bgStyles} className={classNames(classes.MainPage, {}, [])}>
            {loading && (
                <div className={classes.overlay}>
                    <Loader />
                </div>
            )}
            <VStack gap="32" maxW justify="center" align="center">
                <img className={classes.mainLogo} src="/static/mainLogo.svg" alt="Картинка" />

                <form onSubmit={onSubmit} style={{ width: '100%' }}>
                    <VStack gap="32" align="center" maxW>
                        <FileUploader file={file} setFile={handleFileChange} />
                        {file && <Button type="submit">Отправить на обработку</Button>}
                    </VStack>
                </form>

                {result && (
                    <a className={classes.link} download href={`/media/${result}`}>
                        Скачать результат
                    </a>
                )}
                {error && (
                    <Text
                        className={classes.textWrapper}
                        title={error}
                        size="large"
                        variant="error"
                    />
                )}
            </VStack>
        </Page>
    );
};

export default MainPage;
