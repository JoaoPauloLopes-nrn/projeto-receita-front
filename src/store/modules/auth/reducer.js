import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  info: {},
  situacao: false,
  drop: [],
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      case '@auth/SET_CNPJS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SET_CNPJS_SUCCESS': {
        draft.info = action.payload.data;
        draft.situacao = action.payload.situacao;
        draft.loading = false;
        break;
      }
      case '@auth/CANCEL_LOADING_RECEITA_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/GET_CNPJS_SUCCESS': {
        draft.drop = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@auth/LIMPA_LISTA_SUCCESS': {
        draft.info.status = 'ERROR';
        draft.loading = false;
        break;
      }
      case '@auth/GET_BANCO_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/GRAVAR_CNPJS_REQUEST': {
        draft.loading = true;
        break;
      }
      default:
    }
  });
}
