import { number, object, ObjectSchema, string } from 'yup';

import { User } from './User';

export const UserValidationSchema: ObjectSchema<User> = object({
    id: number().optional(),
    firstname: string().required('Введите Ваше имя').min(6, 'Имя должно быть не менее 6 символов'),
    password: string()
        .required('Придумайте пароль')
        .min(8, 'Минамальная длина пароля должна быть 8 символов')
        .matches(
            /^[a-zA-Z0-9_]*$/,
            'Пароль может содержать только латинские буквы, цифры и символ нижнего подчеркивания',
        )
        .matches(/[a-z]/, 'Пароль должен содержать минимум одну строчную букву')
        .matches(/[A-Z]/, 'Пароль должен содержать минимум одну заглавную букву')
        .matches(/[0-9]/, 'Пароль должен содержать минимум одну цифру'),
    lastname: string()
        .required('Введите Вашу фамилию')
        .min(6, 'Фамилия должна быть не менее 6 символов'),
    username: string()
        .matches(
            /^[a-zA-Z0-9_]+$/,
            'Используйте только латинские буквы, цифры и знак подчеркивания',
        )
        .required('Придумайте имя пользователя')
        .min(6, 'Имя пользователя не может быть меньше 6 символов')
        .notOneOf(['admin', 'user', 'null', 'undefined', 'superadmin'], 'Хорошая попытка)'),
    avatar: string().optional(),
});
