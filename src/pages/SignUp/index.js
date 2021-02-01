import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  nome: Yup.string().required('O nome é obrigatório.'),
  email: Yup.string()
    .email('Insira um e-mail válido.')
    .required('E-mail obrigatório.'),
  password: Yup.string()
    .min(6, 'Senha com no mínimo 6 caractéres.')
    .required('A senha é obrigatória.'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ nome, email, password }) {
    dispatch(signUpRequest(nome, email, password));
  }

  return (
    <>
      <img src={logo} size={38} alt="PS" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="nome" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
