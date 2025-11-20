import Select, { SingleValue } from 'react-select';
import EmptyView from './EmptyView';
import { useMemo, useState } from 'react';
import { useItemsStore } from './stores/itemsStore';
import { Item as ItemType } from '../lib/constants';

const sortingOptions = [
  { label: 'Sort by default', value: 'default' },
  { label: 'Sort by packed', value: 'packed' },
  { label: 'Sort by unpacked', value: 'unpacked' },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState(sortingOptions[0].value);
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItemPacked = useItemsStore((state) => state.toggleItemPacked);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return Number(b.packed) - Number(a.packed);
        }
        if (sortBy === 'unpacked') {
          return Number(a.packed) - Number(b.packed);
        }
        return 0;
      }),
    [items, sortBy]
  );

  return (
    <ul className="item-list">
      {items.length === 0 ? <EmptyView /> : null}
      {items.length > 0 ? (
        <section className="sorting">
          <Select
            onChange={(option: SingleValue<{ label: string; value: string }>) =>
              setSortBy(option?.value || 'default')
            }
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => (
        <Item
          key={item.id}
          item={item}
          handleDeleteItem={deleteItem}
          handleToggleItemPacked={toggleItemPacked}
        />
      ))}
    </ul>
  );
}

interface ItemProps {
  item: ItemType;
  handleDeleteItem: (id: number) => void;
  handleToggleItemPacked: (id: number) => void;
}

function Item({ item, handleDeleteItem, handleToggleItemPacked }: ItemProps) {
  return (
    <li className="item">
      <label>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItemPacked(item.id)}
        />
        {item.name}
      </label>

      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
}
