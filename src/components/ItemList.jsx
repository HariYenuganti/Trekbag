import Select from 'react-select';
import EmptyView from './EmptyView';
import { useMemo, useState } from 'react';
import { useItemsStore } from './stores/itemsStore';

const sortingOptions = [
  { label: 'Sort by default', value: 'default' },
  { label: 'Sort by packed', value: 'packed' },
  { label: 'Sort by unpacked', value: 'unpacked' },
];

export default function ItemList() {
  const [sortBy, setSortBy] = useState(sortingOptions[0]);
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItemPacked = useItemsStore((state) => state.toggleItemPacked);

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy === 'packed') {
          return b.packed - a.packed;
        }
        if (sortBy === 'unpacked') {
          return a.packed - b.packed;
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
            onChange={(option) => setSortBy(option.value)}
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

function Item({ item, handleDeleteItem, handleToggleItemPacked }) {
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
