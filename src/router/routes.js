import Error404Page from '../pages/public/error/404/'
import IndexPage from '../pages/public/index/'

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
        name: 'not-found',
        path: '*',
        component: Error404Page,
        meta: {
            ...meta.public
        }
    }
]

export default routes
