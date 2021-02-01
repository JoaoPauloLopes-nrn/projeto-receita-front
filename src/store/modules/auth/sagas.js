import { takeLatest, put, call, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
  signInSucess,
  signFailure,
  setCnpjsSuccess,
  setCnpjs,
  cancelLoadingReceita,
  getCnpjsSuccess,
  limpaLista,
} from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      toast.error('Usuário não autorizado');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Informações de login incorretas');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados.');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export function* getCnpjs() {
  try {
    const response = yield call(api.get, '/cnpjs');

    yield put(getCnpjsSuccess(response.data));
  } catch (err) {
    yield put(cancelLoadingReceita());
    toast.error('Erro ao obter os Cnpjs da base');
  }
}

export function* setCnpj({ payload }) {
  try {
    const response = yield call(api.post, '/setcnpjs', payload);
    if (response.data.length > 0) {
      yield put(setCnpjsSuccess(response.data[0], true));
    } else {
      const response2 = yield call(
        api.get,
        `https://cors-anywhere.herokuapp.com/http://www.receitaws.com.br/v1/cnpj/${payload.cnpj}`
      );
      if (response2.data) {
        yield put(setCnpjsSuccess(response2.data, false));
      }
    }
  } catch (err) {
    yield put(cancelLoadingReceita());
    toast.error(
      'Erro. Muitas requisições feitas. Aguarde um momento e tente novamente.'
    );
  }
}

export function* getBanco({ payload }) {
  try {
    const response = yield call(api.post, '/getbanco', payload);
    if (response.data.length > 0) {
      yield put(setCnpjsSuccess(response.data[0], true));
    } else {
      yield put(limpaLista());
    }
  } catch (err) {
    yield put(cancelLoadingReceita());
    toast.error(
      'Erro. Muitas requisições feitas. Aguarde um momento e tente novamente.'
    );
  }
}

export function* gravarCnpjs({ payload }) {
  try {
    const response = yield call(api.post, '/gravarcnpjs', payload);
    if (response.data.msg === 'success') {
      yield put(setCnpjs(response.data.cnpj));
      toast.success('CNPJ adicionado ao banco de dados com sucesso.');
    }
  } catch (err) {
    yield put(cancelLoadingReceita());
    toast.error('Erro ao gravar Cnpj na base');
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/GET_CNPJS_REQUEST', getCnpjs),
  takeLatest('@auth/SET_CNPJS_REQUEST', setCnpj),
  takeLatest('@auth/GRAVAR_CNPJS_REQUEST', gravarCnpjs),
  takeLatest('@auth/GET_BANCO_REQUEST', getBanco),
]);
