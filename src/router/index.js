import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	//// route principal
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/auth/Sign-In.vue'),
	},
	{
		path: '/logout',
		name: 'Logout',
		component: () => import('../views/auth/logout.vue'),
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		layout: "dashboard",
		component: () => import('../views/dashboard/Dashboard.vue'),
	},
	{
		path: '/dashboard/classement/collecteur',
		name: 'Classement_collecteur',
		layout: "dashboard",
		component: () => import('../views/dashboard/classement_collecteur.vue'),
	},
	{
		path: '/dashboard/classement/carnet',
		name: 'Classement_carnet',
		layout: "dashboard",
		component: () => import('../views/dashboard/classement_carnet.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/carnets',
		name: 'Carnets',
		layout: "dashboard",
		component: () => import('../views/carnets/carnets.vue'),
	},
	{
		path: '/carnets/:id',
		name: 'Carnets_detail',
		layout: "dashboard",
		component: () => import('../views/carnets/detail_carnet.vue'),
	},
	{
		path: '/carnets-stock',
		name: 'Carnets_stock',
		layout: "dashboard",
		component: () => import('../views/carnet-stock/carnets.vue'),
	},
	{
		path: '/carnet-stock/:id',
		name: 'Carnets_stock_detail',
		layout: "dashboard",
		component: () => import('../views/carnet-stock/detail_carnet.vue'),
	},
	{
		path: '/carnets-non-livrer',
		name: 'Carnets_non_livrer',
		layout: "dashboard",
		component: () => import('../views/carnets/carnet_non_livrer/liste.vue'),
	},
	{
		path: '/carnets-livrer',
		name: 'Carnets_livrer',
		layout: "dashboard",
		component: () => import('../views/carnets/carnet_liver/liste.vue'),
	},
	{
		path: '/carnets-desactiver',
		name: 'Carnets_desactivate',
		layout: "dashboard",
		component: () => import('../views/carnets/carnet_block/liste.vue'),
	},
	{
		path: '/carnets-terminer',
		name: 'Carnets_terminer',
		layout: "dashboard",
		component: () => import('../views/carnets/carnet_terminer/liste.vue'),
	},
	{
		path: '/carnets/carnets-client-terminer/:id',
		name: 'Carnets_client_terminer',
		layout: "dashboard",
		component: () => import('../views/carnets/client_end/liste.vue'),
	},
	{
		path: '/carnets/carnets-client/:id',
		name: 'Carnets_client',
		layout: "dashboard",
		component: () => import('../views/carnets/clients/liste.vue'),
	},
	{
		path: '/carnets/classement',
		name: 'Carnets_classement',
		layout: "dashboard",
		component: () => import('../views/carnets/classement/liste.vue'),
	},
	{
		path: '/produit',
		name: 'Produit',
		layout: "dashboard",
		component: () => import('../views/produit/liste.vue'),
	},
	{
		path: '/produit/:id',
		name: 'Produit_detail',
		layout: "dashboard",
		component: () => import('../views/produit/detail.vue'),
	},
	{
		path: '/stockage',
		name: 'Produit_stock',
		layout: "dashboard",
		component: () => import('../views/stock/liste.vue'),
	},
	{
		path: '/produit/stock/:id',
		name: 'Produit_stock_detail',
		layout: "dashboard",
		component: () => import('../views/stock/detail.vue'),
	},
	/// compte routes
	{
		path: '/epargne',
		name: 'Epargne',
		layout: "dashboard",
		component: () => import('../views/epargne/liste.vue'),
	},
	{
		path: '/epargne/:id',
		name: 'Epargne_detail',
		layout: "dashboard",
		component: () => import('../views/epargne/detail.vue'),
	},
	{
		path: '/entreprise',
		name: 'Entreprise',
		layout: "dashboard",
		component: () => import('../views/entreprise/liste.vue'),
	},
	{
		path: '/entreprise/:id',
		name: 'Entreprise_detail',
		layout: "dashboard",
		component: () => import('../views/entreprise/detail.vue'),
	},
	{
		path: '/pret',
		name: 'Pret',
		layout: "dashboard",
		component: () => import('../views/pret/liste.vue'),
	},
	{
		path: '/pret/:id',
		name: 'Pret_detail',
		layout: "dashboard",
		component: () => import('../views/pret/detail.vue'),
	},
	{
		path: '/parametre/pret',
		name: 'Pret_parametre',
		layout: "dashboard",
		component: () => import('../views/pret/parametre.vue'),
	},
	{
		path: '/type/pret',
		name: 'Pret_type',
		layout: "dashboard",
		component: () => import('../views/pret/type_pret.vue'),
	},
	{
		path: '/client',
		name: 'Client',
		layout: "dashboard",
		component: () => import('../views/clients/liste.vue'),
	},
	{
		path: '/client/new',
		name: 'Client_new',
		layout: "dashboard",
		component: () => import('../views/clients/new.vue'),
	},
	{
		path: '/client/classement',
		name: 'Client_classement',
		layout: "dashboard",
		component: () => import('../views/clients/classement.vue'),
	},
	{
		path: '/client/not-visite',
		name: 'Client_not_visite',
		layout: "dashboard",
		component: () => import('../views/clients/nvisite.vue'),
	},
	{
		path: '/client/:id',
		name: 'Client_detail',
		layout: "dashboard",
		component: () => import('../views/clients/detail.vue'),
	},
	{
		path: '/client/:id/carnet/end',
		name: 'Client_carnet_end',
		layout: "dashboard",
		component: () => import('../views/clients/end.vue'),
	},
	
	{
		path: '/client/notification',
		name: 'Client_notification',
		layout: "dashboard",
		component: () => import('../views/clients/message.vue'),
	},
	/// agence agent route
	{
		path: '/collecteur',
		name: 'Collecteur',
		layout: "dashboard",
		component: () => import('../views/collecteur/liste.vue'),
	},
	{
		path: '/dashboard/collecteur/byville',
		name: 'Collecteur_ville',
		layout: "dashboard",
		component: () => import('../views/collecteur/collecteur_ville.vue'),
	},
	{
		path: '/dashboard/collecteur/classement',
		name: 'Collecteur_classement',
		layout: "dashboard",
		component: () => import('../views/collecteur/collecteur_classement.vue'),
	},
	{
		path: '/dashboard/collecteur/archived',
		name: 'Collecteur_archived',
		layout: "dashboard",
		component: () => import('../views/collecteur/collecteur_archived.vue'),
	},
	{
		path: '/collecteur/:id',
		name: 'Collecteur_detail',
		layout: "dashboard",
		component: () => import('../views/collecteur/detail.vue'),
	},
	{
		path: '/collecteur/:id/client',
		name: 'Collecteur_client',
		layout: "dashboard",
		component: () => import('../views/collecteur/client.vue'),
	},
	{
		path: '/collecteur/:id/depot',
		name: 'Collecteur_depot',
		layout: "dashboard",
		component: () => import('../views/collecteur/depot.vue'),
	},
	{
		path: '/collecteur/:id/visite/none',
		name: 'Collecteur_client_non_visité',
		layout: "dashboard",
		component: () => import('../views/collecteur/client_n.vue'),
	},
	
	{
		path: '/collecteur/:id/classement',
		name: 'Collecteur_classement',
		layout: "dashboard",
		component: () => import('../views/collecteur/classement.vue'),
	},
	{
		path: '/collecteur/:id/not-visite',
		name: 'Collecteur_not_visite',
		layout: "dashboard",
		component: () => import('../views/collecteur/nvisite.vue'),
	},
	{
		path: '/collecteur/:id/classement_carnet',
		name: 'Collecteur_classement_carnet',
		layout: "dashboard",
		component: () => import('../views/collecteur/classement_carnet.vue'),
	},
	{
		path: '/superviseur',
		name: 'Superviseur',
		layout: "dashboard",
		component: () => import('../views/superviseur/liste.vue'),
	},
	{
		path: '/superviseur/:id',
		name: 'Superviseur_detail',
		layout: "dashboard",
		component: () => import('../views/superviseur/detail.vue'),
	},
	{
		path: '/livreur',
		name: 'Livreur',
		layout: "dashboard",
		component: () => import('../views/livreur/liste.vue'),
	},
	{
		path: '/livreur/:id',
		name: 'Livreur_detail',
		layout: "dashboard",
		component: () => import('../views/livreur/detail.vue'),
	},
	{
		path: '/agence',
		name: 'Agence',
		layout: "dashboard",
		component: () => import('../views/agences/liste.vue'),
	},
	{
		path: '/agence/:id',
		name: 'Agence_detail',
		layout: "dashboard",
		component: () => import('../views/agences/detail.vue'),
	},
	{
		path: '/agence/carnet/:id',
		name: 'Agence_carnet_detail',
		layout: "dashboard",
		component: () => import('../views/agences/carnet.vue'),
	},
	{
		path: '/agence/client/:id',
		name: 'Agence_client_detail',
		layout: "dashboard",
		component: () => import('../views/agences/client.vue'),
	},
	{
		path: '/agence/:id/depot',
		name: 'Agence_depot',
		layout: "dashboard",
		component: () => import('../views/agences/depot.vue'),
	},
	{
		path: '/caissier',
		name: 'Caissier',
		layout: "dashboard",
		component: () => import('../views/agences/gerant/liste.vue'),
	},
	{
		path: '/caissier/:id',
		name: 'Caissier_detail',
		layout: "dashboard",
		component: () => import('../views/agences/gerant/detail.vue'),
	},
	/// admin & local route
	{
		path: '/chef_agence',
		name: 'Chef_agence',
		layout: "dashboard",
		component: () => import('../views/chef_agence/liste.vue'),
	},
	{
		path: '/chef_agence/transaction',
		name: 'Chef_agence_transaction',
		layout: "dashboard",
		component: () => import('../views/chef_agence/transaction.vue'),
	},
	{
		path: '/chef_agence/historique',
		name: 'Chef_agence_historique',
		layout: "dashboard",
		component: () => import('../views/chef_agence/historique.vue'),
	},
	{
		path: '/deploiement',
		name: 'Deploiement',
		layout: "dashboard",
		component: () => import('../views/deploiement/liste.vue'),
	},
	{
		path: '/admin',
		name: 'Admin',
		layout: "dashboard",
		component: () => import('../views/admin/liste.vue'),
	},
	{
		path: '/admin/:id',
		name: 'Admin_detail',
		layout: "dashboard",
		component: () => import('../views/admin/detail.vue'),
	},
	{
		path: '/synchronisation',
		name: 'Synchronisation',
		layout: "dashboard",
		component: () => import('../views/synchro/liste.vue'),
	},
	{
		path: '/synchronisation/:id',
		name: 'Synchronisation_detail',
		layout: "dashboard",
		component: () => import('../views/synchro/detail.vue'),
	},
	{
		path: '/compte',
		name: 'Compte',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/compte/compte.vue'),
	},
	{
		path: '/livraison',
		name: 'Livraison',
		layout: "dashboard",
		component: () => import('../views/livraison/livraison'),
	},
	{
		path: '/etat',
		name: 'Etat',
		layout: "dashboard",
		component: () => import('../views/livraison/etat'),
	},
	{
		path: '/launship/demande',
		name: 'Launship_demande',
		layout: "dashboard",
		component: () => import('../views/launship/demande.vue'),
	},
	{
		path: '/launship/liste/:id',
		name: 'Launship_liste',
		layout: "dashboard",
		component: () => import('../views/launship/liste.vue'),
	},
	{
		path: '/launship/detail/:id',
		name: 'Launship_detail',
		layout: "dashboard",
		component: () => import('../views/launship/detail.vue'),
	},
	{
		path: '/launship/point',
		name: 'Launship_point',
		layout: "dashboard",
		component: () => import('../views/launship/point.vue'),
	},
	
	{
		path: '/controle',
		name: 'Controle_list',
		layout: "dashboard",
		component: () => import('../views/controle/controle.vue'),
	},
	{
		path: '/controle/:id',
		name: 'Controle_detail',
		layout: "dashboard",
		component: () => import('../views/controle/liste.vue'),
	},
	{
		path: '/controleview/:id',
		name: 'Controle_view',
		layout: "dashboard",
		component: () => import('../views/controle/detail.vue'),
	},
	{
		path: '*',
		component: () => import('../views/404.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "default") {
	route.meta = route.meta || {};
	route.meta.layout = route.layout || parentLayout;

	if (route.children) {
		route.children = route.children.map((childRoute) => addLayoutToRoute(childRoute, route.meta.layout));
	}
	return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

export default router
