export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'downloaders',
      displayName: 'Downloaders',
      meta: {
        icon: 'cloud_download',
      },
    },
    // {
    //   name: 'artificial-intelligence',
    //   displayName: 'Artificial Intelligence',
    //   meta: {
    //     icon: 'smart_toy',
    //   },
    // },
    // {
    //   name: 'canvas',
    //   displayName: 'Canvas',
    //   meta: {
    //     icon: 'brush',
    //   },
    // },
    // {
    //   name: 'downloader',
    //   displayName: 'Downloader',
    //   meta: {
    //     icon: 'cloud_download',
    //   },
    // },
    // {
    //   name: 'entertainment',
    //   displayName: 'Entertainment',
    //   meta: {
    //     icon: 'movie',
    //   },
    // },
    // {
    //   name: 'game',
    //   displayName: 'Game',
    //   meta: {
    //     icon: 'sports_esports',
    //   },
    // },
    // {
    //   name: 'image-effect',
    //   displayName: 'Image Effect',
    //   meta: {
    //     icon: 'photo_filter',
    //   },
    // },
    // {
    //   name: 'image-maker',
    //   displayName: 'Image Maker',
    //   meta: {
    //     icon: 'edit',
    //   },
    // },
    // {
    //   name: 'searching',
    //   displayName: 'Searching',
    //   meta: {
    //     icon: 'search',
    //   },
    // },
    // {
    //   name: 'tools',
    //   displayName: 'Tools',
    //   meta: {
    //     icon: 'construction',
    //   },
    // },
  ] as INavigationRoute[],
}
