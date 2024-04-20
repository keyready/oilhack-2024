import classes from '../ui/Button.module.scss';

import { buttonVariants } from './button.types';

export const variantsMapper: Record<buttonVariants, string> = {
    primary: classes.primary,
    inverted: classes.inverted,
    clear: classes.clear,
    danger: classes.danger,
    success: classes.success,
    warning: classes.warning,
    outlined: classes.outlined,
};
