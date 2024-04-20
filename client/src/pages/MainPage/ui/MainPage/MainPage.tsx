import { Page } from 'widgets/Page/Page';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/UI/Stack';
import { CSSProperties, FormEvent, useCallback, useState } from 'react';
import { Input } from 'shared/UI/Input';
import { $api } from 'shared/api/api';
import { Text } from 'shared/UI/Text';
import { AxiosError } from 'axios';
import { Loader } from 'shared/UI/Loader';

import classes from './MainPage.module.scss';

const MainPage = () => {
    const bgStyles: CSSProperties = {
        background: `url(/static/bgImg.svg)`,
    };

    const [value, setValue] = useState<string>('');
    const [prediction, setPrediction] = useState<number>(83.5678);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setLoading(true);

            try {
                const makePrediction = await $api.post<number>('/api/calculate', value);
                if (typeof makePrediction === 'number') {
                    setPrediction(makePrediction * 100);
                }
            } catch (e) {
                const error = e as AxiosError;
                setPrediction(0);
                setError(error.response?.data.message || 'Произошла ошибка запроса на сервер');
            }
            setLoading(false);
            setValue('');
        },
        [value],
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
                <Input
                    disabled={loading}
                    onSubmit={onSubmit}
                    placeholder="Введите формулу"
                    value={value}
                    onChange={(val) => {
                        setValue(val);
                        setError('');
                    }}
                />
                {prediction > 0 && (
                    <Text
                        className={classes.textWrapper}
                        title={`Хуйня не произойдет с вероятностью ${prediction.toFixed(2)}%`}
                        size="large"
                    />
                )}
                {error && (
                    <Text
                        className={classes.textWrapper}
                        title={`Произошла ошибка во время вычисления: ${prediction}`}
                        size="large"
                        variant="error"
                    />
                )}
            </VStack>
        </Page>
    );
};

export default MainPage;
