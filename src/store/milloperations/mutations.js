export function MutateLoginState(state, isLoggedIn) {
  state.IsLoggedIn = isLoggedIn;
}

export function MutateEmpCodeState(state, empCode) {
  state.emp_code = empCode;
}

export function MutateUsernameState(state, userName) {
  state.user_name = userName;
}

export function MutateAppTypeState(state, appType) {
  state.app_type = appType;
}

export function MutateEmpNameState(state, empName) {
  state.emp_name = empName;
}

export function MutateStateCodeState(state, stateCode) {
  state.state_code = stateCode;
}

export function MutateStateNameState(state, stateName) {
  state.state_name = stateName;
}

export function MutatePlantCodeState(state, plantCode) {
  state.plant_code = plantCode;
}

export function MutatePlantNameState(state, plantName) {
  state.plant_name = plantName;
}

export function MutateClusterCodeState(state, clusterCode) {
  state.cluster_code = clusterCode;
}

export function MutateClusterNameState(state, clusterName) {
  state.cluster_name = clusterName;
}

export function MutateloadReportWiseLogData(state,loadReportWiseLogData){
  state.load_report_wise_log_data=loadReportWiseLogData;
}