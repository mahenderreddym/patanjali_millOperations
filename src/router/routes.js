
import Cookies from 'js-cookie';

// Route Guard function

const requireAuth = (to, from, next) => {
  if (Cookies.get("isUserLoggedIn") === "true") {
    next();  
  } else {
    next('/login');  
  }
}


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'login' },
      { path: 'Dashboard', component: () => import('pages/Dashboard.vue'), beforeEnter: requireAuth },
      { path: 'SterilisationStationLog', component: () => import('pages/SterilisationStationLog.vue'), beforeEnter: requireAuth },
      { path: 'TurbineLog', component: () => import('pages/TurbineLog.vue'), beforeEnter: requireAuth },
      { path: 'BoilerLog', component: () => import('pages/BoilerLog.vue'), beforeEnter: requireAuth },
      { path: 'ShiftReport', component: () => import('pages/ShiftReport.vue'), beforeEnter: requireAuth },
      { path: 'ViewReports', component: () => import('pages/ViewReports.vue'), beforeEnter: requireAuth },
      { path: 'About', component: () => import('src/pages/AboutApp.vue'), beforeEnter: requireAuth },
      { path: 'Sync', component: () => import('src/pages/Sync.vue'), beforeEnter: requireAuth },
      { path: 'Settings', component: () => import('src/pages/Settings.vue'), beforeEnter: requireAuth },
      { path: 'resetPassword', component: () => import('src/pages/resetPassword.vue'), beforeEnter: requireAuth },
      { path: 'ViewReportOfSterilisation', component: () => import('src/pages/ViewReportOfSterilisation.vue'), beforeEnter: requireAuth },
      { path: 'ViewReportOfTurbine', component: () => import('src/pages/ViewReportOfTurbine.vue'), beforeEnter: requireAuth },
      { path: 'ViewReportOfBoiler', component: () => import('src/pages/ViewReportOfBoiler.vue'), beforeEnter: requireAuth },
      { path: 'ViewReportOfShift', component: () => import('src/pages/ViewReportOfShift.vue'), beforeEnter: requireAuth },
      { path: 'SyncSterilisationLog', component: () => import('src/pages/SyncSterilisationLog.vue'), beforeEnter: requireAuth },
      { path: 'SyncTurbineLog', component: () => import('src/pages/SyncTurbineLog.vue'), beforeEnter: requireAuth },
      { path: 'SyncBoilerLog', component: () => import('src/pages/SyncBoilerLog.vue'), beforeEnter: requireAuth },
      { path: 'SyncShiftLog', component: () => import('src/pages/SyncShiftLog.vue'), beforeEnter: requireAuth },
      { path: 'ClarificationLog', component: () => import('src/pages/ClarificationLog.vue'), beforeEnter: requireAuth },
      { path: 'PressStationLog', component: () => import('src/pages/PressStationLog.vue'), beforeEnter: requireAuth },
      {
        path:'/ThermicFluidHeaterLog',
        component:()=>import('pages/ThermicFluidHeaterLog'), beforeEnter: requireAuth
      },
     
      {
        path:'/SludgeDryerLog',
        component:()=>import('pages/SludgeDryerLog'),beforeEnter:requireAuth
      },
      {
        path:'/KernelStationLog',
        component:()=>import('pages/KernelStationLog'), beforeEnter: requireAuth
      },
      {
        path:'/DailyLogSheetForROPlantLog',
        component:()=>import('pages/DailyLogSheetForROPlantLog'), beforeEnter: requireAuth
      },

      {
        path:'/UFandROLog',
        component:()=>import('pages/UFandROLog'), beforeEnter: requireAuth
      },
      {
        path:'/ExpellerSectionLog',
        component:()=>import('pages/ExpellerSectionLog'), beforeEnter: requireAuth
      },

    ]
  },
  {
    path: '/login',
    component: () => import('pages/auth/login.vue')
  },

  {
    path: '*',
    component: () => import('pages/Error404.vue'),
    beforeEnter: requireAuth  
  }
]

export default routes;
