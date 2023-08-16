import { Checkbox } from 'components/CheckBox';

export type CheckBoxItemProps = {
  item: itemProps;
  isChecked: boolean;
  onCheckboxChange: (id: string | number, isChecked: boolean) => void;
  firstItem: boolean;
};

export type itemProps = {
  id: string | number;
  displayName: string;
};

export const CheckboxItem = ({
  item,
  isChecked,
  onCheckboxChange,
  firstItem,
}: CheckBoxItemProps) => {
  const handleCheckboxChange = (e) => {
    onCheckboxChange(item.id, e);
  };

  return (
    <Checkbox
      key={item.id}
      label={item.displayName}
      name={item.displayName}
      checked={isChecked}
      onCheckboxChange={handleCheckboxChange}
      firstItem={firstItem}
    />
  );
};
