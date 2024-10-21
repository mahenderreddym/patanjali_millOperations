export function UpdateLoginState ({ commit }, newValue) {
    console.log("2",newValue)
    commit('MutateLoginState', newValue);
}

export function UpdateEmpCodeState ({ commit }, newValue) {
    commit('MutateEmpCodeState', newValue);
}

export function UpdateEmpNameState ({ commit }, newValue) {
    commit('MutateEmpNameState', newValue);
}

export function UpdateUsernameState ({ commit }, newValue) {
    commit('MutateUsernameState', newValue);
}

export function UpdateAppTypeState ({ commit }, newValue) {
    commit('MutateAppTypeState', newValue);
}


export function UpdateStateNameState ({ commit }, newValue) {
    commit('MutateStateNameState', newValue);
}

export function UpdateStateCodeState ({ commit }, newValue) {
    commit('MutateStateCodeState', newValue);
}


export function UpdatePlantCodeState ({ commit }, newValue) {
    commit('MutatePlantCodeState', newValue);
}

export function UpdatePlantNameState ({ commit }, newValue) {
    commit('MutatePlantNameState', newValue);
}

export function UpdateClusterCodeState ({ commit }, newValue) {
    commit('MutateClusterCodeState', newValue);
}

export function UpdateClusterNameState ({ commit }, newValue) {
    commit('MutateClusterNameState', newValue);
}
  

