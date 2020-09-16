import * as React from 'react';
import {Intent, MenuItem} from '@blueprintjs/core';
import {ItemPredicate, ItemRenderer, MultiSelect} from '@blueprintjs/select';
import DataStore from './util/DataStore';

const IngredientSelect = MultiSelect.ofType<string>();

const rand = () => Math.random().toString(36)
  .substr(0, 8);

function renderItem(selectedSet: Set<string>): ItemRenderer<string> {
  return (i, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={modifiers.active}
        icon={selectedSet.has(i) ? 'tick' : 'blank'}
        key={rand()}
        onClick={handleClick}
        text={i}
        shouldDismissPopover={false}
      />
    );
  };
}

const filterItem: ItemPredicate<string> = (q, item, _0, _1) =>
  item.toLowerCase().indexOf(q.toLowerCase()) >= 0;

const Bar: React.FunctionComponent<{
  selectedIngredients: Set<string>;
  onAddRemove: (_: string) => void;
}> = (props) =>
  <IngredientSelect
    items={DataStore.get().ingredients()}
    selectedItems={[...props.selectedIngredients]}
    itemRenderer={renderItem(props.selectedIngredients)}
    itemPredicate={filterItem}
    tagRenderer={(i) => i}
    onItemSelect={(i) => props.onAddRemove(i)}
    tagInputProps={{
      onRemove: props.onAddRemove,
      tagProps: {
        intent: Intent.NONE,
        minimal: true,
      },
    }}
  />;

export default Bar;
