export function updateProfileRequest(data) {
    return {
        type: '@auth/UPDATE_PROFILE_REQUEST',
        payload: { data },
    };
}

export function updateProfileSucess(profile) {
    return {
        type: '@auth/UPDATE_PROFILE_SUCESS',
        payload: { profile },
    };
}

export function updateProfileFailure() {
    return {
        type: '@auth/UPDATE_PROFILE_FAILURE',
    };
}
