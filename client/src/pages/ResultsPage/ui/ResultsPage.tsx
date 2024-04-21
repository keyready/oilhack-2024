import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page/Page';
import { CSSProperties, memo, useCallback, useEffect, useState } from 'react';
import { $api } from 'shared/api/api';
import { useSearchParams } from 'react-router-dom';
import { VStack } from 'shared/UI/Stack';
import { Text } from 'shared/UI/Text';

import classes from './ResultsPage.module.scss';

interface ResultsPageProps {
    className?: string;
}

const ResultsPage = memo((props: ResultsPageProps) => {
    const { className } = props;

    const bgStyles: CSSProperties = {
        background: `url(/static/bgImg.svg)`,
    };

    useEffect(() => {
        document.title = 'Ожидайте результат';
    }, []);

    const [params] = useSearchParams();

    const fileId = params.get('fileId');

    const [file, setFile] = useState<string>();

    useEffect(() => {
        const intervalId = setInterval(async () => {
            try {
                const result = await $api.get(`/api/confirm?fileId=${fileId}`, {
                    responseType: 'blob',
                });

                if (result.status === 200) {
                    const fileUrl = URL.createObjectURL(result.data);
                    setFile(fileUrl);
                    clearInterval(intervalId);
                }
            } catch (e) {
                console.log(e);
            }
        }, 2500);
    }, [fileId]);

    return (
        <Page style={bgStyles} className={classNames(classes.ResultsPage, {}, [className])}>
            {file ? (
                <VStack gap="16" maxW align="center" className={classes.wrapper}>
                    <Text
                        titleClassname={classes.title}
                        title="Обработка завершена, теперь вы можете скачать файл"
                    />
                    <a className={classes.link} href={file} download>
                        Скачать файл
                    </a>
                </VStack>
            ) : (
                <Text
                    titleClassname={classes.title}
                    title="Ваш файл обрабатывается, ожидайте"
                    size="large"
                />
            )}
        </Page>
    );
});

export default ResultsPage;
