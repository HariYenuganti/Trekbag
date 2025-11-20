export interface Item {
  id: number;
  name: string;
  packed: boolean;
}

export const initialItems: Item[] = [
  {
    id: 1,
    name: 'good mood',
    packed: true,
  },
  {
    id: 2,
    name: 'passport',
    packed: false,
  },
  {
    id: 3,
    name: 'sunglasses',
    packed: false,
  },
];
