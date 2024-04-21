import React, { FormEvent, InputHTMLAttributes, memo, useEffect, useRef } from 'react';
import { HStack } from 'shared/UI/Stack';
import { RiSendPlane2Line } from '@remixicon/react';
import { Button } from 'shared/UI/Button';

import classes from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends Omit<HTMLInputProps, 'onSubmit'> {
    className?: string;
    value?: string;
    autoFocus?: boolean;
    readonly?: boolean;
    onChange?: (value: string) => void;
    error?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

export const Input = memo((props: InputProps) => {
    const ref = useRef<HTMLInputElement>(null);
    const {
        error,
        value,
        onChange,
        onSubmit,
        type = 'text',
        autoFocus,
        readonly,
        ...otherProps
    } = props;

    useEffect(() => {
        if (autoFocus) {
            ref.current?.focus();
        }
    }, [autoFocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <form className={classes.wrapper} style={{ width: '100%' }} onSubmit={onSubmit}>
            <HStack maxW>
                <input
                    ref={ref}
                    value={value || ''}
                    onChange={onChangeHandler}
                    className={classes.Input}
                    type={type}
                    readOnly={readonly}
                    {...otherProps}
                />
                <Button disabled={!value?.length} type="submit" variant="clear">
                    <RiSendPlane2Line />
                </Button>
            </HStack>
        </form>
    );
});
