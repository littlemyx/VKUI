import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField, FormFieldMode } from "../FormField/FormField";
import { HasAlign, HasRootRef } from "../../types";
import { withAdaptivity, AdaptivityProps } from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { SelectType, SelectTypography } from "../Select/Select";
import "../Select/Select.css";

export interface SelectMimicryProps
  extends React.HTMLAttributes<HTMLElement>,
    HasAlign,
    HasRootRef<HTMLElement>,
    AdaptivityProps {
  multiline?: boolean;
  disabled?: boolean;
  after?: React.ReactNode;
  selectType?: SelectType;
}

const SelectMimicryComponent: React.FC<SelectMimicryProps> = ({
  tabIndex = 0,
  placeholder,
  children,
  align,
  getRootRef,
  multiline,
  disabled,
  onClick,
  sizeX,
  sizeY,
  after = <DropdownIcon />,
  selectType = SelectType.Default,
  ...restProps
}) => {
  const platform = usePlatform();
  const title = children || placeholder;

  return (
    <FormField
      {...restProps}
      tabIndex={disabled ? undefined : tabIndex}
      vkuiClass={classNames(
        getClassName("Select", platform),
        `Select--${selectType}`,
        !children && "Select--empty",
        multiline && "Select--multiline",
        align && `Select--align-${align}`,
        `Select--sizeX-${sizeX}`,
        `Select--sizeY-${sizeY}`
      )}
      getRootRef={getRootRef}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      after={after}
      mode={
        selectType === SelectType.Default
          ? FormFieldMode.DEFAULT
          : FormFieldMode.PLAIN
      }
    >
      <div vkuiClass="Select__container">
        <SelectTypography selectType={selectType} vkuiClass="Select__title">
          {title}
        </SelectTypography>
      </div>
    </FormField>
  );
};

export const SelectMimicry = withAdaptivity(SelectMimicryComponent, {
  sizeX: true,
  sizeY: true,
});
