import * as React from 'react';
import {Intent, MenuItem} from '@blueprintjs/core';
import {ItemRenderer, MultiSelect} from '@blueprintjs/select';
import DataStore from './util/DataStore';

const IngredientSelect = MultiSelect.ofType<string>();

function renderItem(selectedSet: Set<string>): ItemRenderer<string> {
  return (i, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }

    return (
      <MenuItem
        active={modifiers.active}
        icon={selectedSet.has(i) ? 'tick' : 'blank'}
        key={0}
        onClick={handleClick}
        text={i}
        shouldDismissPopover={false}
      />
    );
  };
}

const Bar: React.FunctionComponent<{
  selectedIngredients: Set<string>;
  onAddRemove: (_: string) => void;
}> = (props) =>
  <IngredientSelect
    items={DataStore.get().ingredients()}
    selectedItems={[...props.selectedIngredients]}
    itemRenderer={renderItem(props.selectedIngredients)}
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
