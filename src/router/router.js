import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/components/Authentification/Login.vue"
import Dashboard from "@/components/Dashboard/Dashboard.vue"
import Users from "@/components/Users/Users.vue"
import Equipements from '@/components/Equipements/Equipements.vue'
import RTGPlanningOutput from '@/components/Cranes/RTG-Crane/RTGPlanningOutput.vue'
import RTGhome from '@/components/Cranes/RTG-Crane/RTGhome.vue'
import RTG from '@/components/Planning/RTGPlanning/RTG.vue'
import PlanningDashbord from '@/components/Planning/PlanningDashbord.vue'

const Router = createRouter({
    history:createWebHistory(),
    routes : [
        {path:'/',component:RTG},
        {path:'/PlanningDashbord',component:PlanningDashbord,name:'PlanningDashbord'},
        {path:'/rtgPlanning',component:RTG,name:'rtg'},
        {path:'/stsPlanning',component:RTG,name:'sts'},
        {path:'/dashboard',component:Dashboard,name:'dashboard'},
        {path: '/users' , component:Users,name:'users'},
        {path:'/equipements' , component:Equipements,name:'equipements'},
        {path:'/rtg-home', component:RTGhome,name:'rtg-home'},
    ]
})

export default Router
