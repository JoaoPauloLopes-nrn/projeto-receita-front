export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSucess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCESS',
    payload: { token, user },
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: { name, email, password },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function getCnpjs() {
  return {
    type: '@auth/GET_CNPJS_REQUEST',
  };
}

export function getCnpjsSuccess(data) {
  return {
    type: '@auth/GET_CNPJS_SUCCESS',
    payload: { data },
  };
}

export function getBanco(cnpj) {
  return {
    type: '@auth/GET_BANCO_REQUEST',
    payload: { cnpj },
  };
}

export function setCnpjs(cnpj) {
  return {
    type: '@auth/SET_CNPJS_REQUEST',
    payload: { cnpj },
  };
}

export function setCnpjsSuccess(data, situacao) {
  return {
    type: '@auth/SET_CNPJS_SUCCESS',
    payload: { data, situacao },
  };
}

export function limpaLista() {
  return {
    type: '@auth/LIMPA_LISTA_SUCCESS',
  };
}

export function gravarCnpj(data) {
  return {
    type: '@auth/GRAVAR_CNPJS_REQUEST',
    payload: { data },
  };
}

export function gravarCnpjSuccess(data, situacao) {
  return {
    type: '@auth/GRAVAR_CNPJS_SUCCESS',
    payload: { data, situacao },
  };
}

export function cancelLoadingReceita() {
  return {
    type: '@auth/CANCEL_LOADING_RECEITA_SUCCESS',
  };
}
