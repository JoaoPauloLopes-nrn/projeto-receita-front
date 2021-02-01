import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '~/services/api';

import { updateProfileSucess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.data;

        const profile = {
            name,
            email,
            avatar_id,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);

        toast.success('Perfil atualizado com sucesso!');

        yield put(updateProfileSucess(response.data));
    } catch (err) {
        toast.error('Erro ao atulizar perfil, confira seus dados!');

        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@auth/UPDATE_PROFILE_REQUEST', updateProfile)]);
