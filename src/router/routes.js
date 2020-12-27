import Error404Page from '../pages/public/error/404/'
import IndexPage from '../pages/public/index/'
import CatalogPage from '../pages/public/catalog/'

const meta = {
    public: {
        section: 'public',
        layout: 'public-layout'
    }
}

/**
 * Application routes configuration
 * @type {Array.<object>}
 */
const routes = [
    {
        name: 'index',
        path: '/',
        component: IndexPage,
        meta: {
            ...meta.public
        }
    },
    {
        name: 'catalog',
        path: '/catalog/',
        component: CatalogPage,
        meta: {
            ...meta.public
        }
    },
    {
        name: 'not-found',
        path: '*',
        component: Error404Page,
        meta: {
            ...meta.public
        }
    }
]

export default routes
