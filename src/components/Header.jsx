import Logo from './Logo';
import Counter from './Counter';
import { useItemsStore } from './stores/itemsStore';

export default function Header() {
  const items = useItemsStore((state) => state.items);
  // const { items } = useItemsStore();
  return (
    <header>
      <Logo />
      <Counter
        numberOfItemsPacked={items.filter((item) => item.packed).length}
        totalNumberOfItems={items.length}
      />
    </header>
  );
}
