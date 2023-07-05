import requests from '~/services/requests'
import waka from '~/assets/waka.webp'
import waka12 from '~/assets/waka-1-2.jpg'
import waka2 from '~/assets/waka-2.jpeg'
import waka22 from '~/assets/waka-2-2.jpg'
import waka3 from '~/assets/waka-3.jpg'
import waka32 from '~/assets/waka-3-2.jpg'

export const projects = [
  {
    id: 0,
    title: 'Keep watching',
    fetchUrl: requests.fetchRandom,
  },
  {
    id: 1,
    title: 'Pixar Movies',
    fetchUrl: requests.fetchPixar,
  },
  {
    id: 2,
    title: 'Marvel Movies',
    fetchUrl: requests.fetchMarvelPhaseThree,
  },
  {
    id: 3,
    title: 'Star Wars Movies',
    fetchUrl: requests.fetchStarWars,
  },
]

export const data = [
  {
    id: 0,
    number: 'N°0025',
    name: 'Purple Cylinder Back Arm',
    rating: 'Birch Wood',
    date: '2020-10-10',
    image1: waka,
    image2: waka12,
  },
  {
    id: 1,
    number: 'N°0025',
    name: 'Cylinder Back Steel',
    rating: 'Stainless Steel',
    date: '2020-10-10',
    image1: waka2,
    image2: waka22,
  },
  {
    id: 2,
    number: 'N°0025',
    name: 'Spool Stool',
    rating: 'Birch Wood',
    date: '2020-10-10',
    image1: waka3,
    image2: waka32,
  },
]
