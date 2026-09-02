/* eslint-disable react-refresh/only-export-components */
import { useDispatch, useStore, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { server } from "../../bff";
import { Button, Input, H2 } from "../../components";
import { setUser } from "../../actions";
import { selectUserRole } from "../../selectors";
import { ROLE } from "../../constans";
import styled from "styled-components";

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required("Заполните логин")
        .matches(
            /^\w+$/,
            "Неверно заполнен логин. Нужно использовать только буквы и цифры",
        )
        .min(3, "Неверно заполнен логин. Минимум 3 символа")
        .max(21, "Неверно заполнен логин. Максимальная длина 21 символ"),
    password: yup
        .string()
        .required("Заполните пароль")
        .matches(
            /^[\w#%]+$/,
            "Неверно заполнен пароль. Допускаются буквы, цифры, % и #",
        )
        .min(8, "Неверно заполнен пароль. Минимум 8 символа")
        .max(21, "Неверно заполнен пароль. Максимальная длина 21 символ"),
});

const StyledLink = styled(Link)`
    text-align: center;
    margin: 20px 0;
    font-size: 18px;
    text-decoration: underline;
`;

const ErrorMessage = styled.div`
    margin: 10px 0 0;
    padding: 10px;
    font-size: 18px;
    background-color: #fcadad;
`;

const AuthorizationContainer = ({ className }) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        resolver: yupResolver(authFormSchema),
    });

    const [serverError, setServerError] = useState(null);
    const dispatch = useDispatch();
    const store = useStore();
    const roleId = useSelector(selectUserRole);
    useEffect(() => {
        let currentWasLogout = store.getState().app.wasLogout;
        return store.subscribe(() => {
            let previousWasLogout = currentWasLogout;
            currentWasLogout = store.getState().app.wasLogout;

            if (currentWasLogout !== previousWasLogout) {
                reset();
            }
        });
    }, [reset, store]);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }

            dispatch(setUser(res));
        });
    };
    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Авторзация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register("login", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    {...register("password", {
                        onChange: () => setServerError(null),
                    })}
                />
                <Button type="submit" disabled={!!formError}>
                    Авторизоваться
                </Button>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    flex-direction: column;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
