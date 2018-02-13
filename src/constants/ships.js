import DestroyerImg from '../assets/destroyer.png';
import VertImg from '../assets/vert.png';
import MouseImg from '../assets/mouse.png';

export const DESTROYER = 'destroyer';
export const VERT = 'vert';
export const MOUSE = 'mouse';

export const SHIP_DATA = {
  'destroyer': {
    size: 5,
    img: DestroyerImg,
    direction: 'horizontal',
  },
  'vert': {
    size: 4,
    img: VertImg,
    direction: 'vertical',
  },
  'mouse': {
    size: 2,
    img: MouseImg,
    direction: 'horizontal',
  },
};
