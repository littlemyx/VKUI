import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { HasAlign, HasRef, HasRootRef } from "../../types";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { getClassName } from "../../helpers/getClassName";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { SelectType, SelectTypography } from "../Select/Select";
import {
  AdaptivityContextInterface,
  AdaptivityProps,
} from "../AdaptivityProvider/AdaptivityContext";
import "../Select/Select.css";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    HasRef<HTMLSelectElement>,
    HasRootRef<HTMLLabelElement>,
    HasAlign,
    AdaptivityProps {
  placeholder?: string;
  multiline?: boolean;
  selectType?: SelectType;
}

export interface SelectState {
  value?: React.SelectHTMLAttributes<HTMLSelectElement>["value"];
  title?: string;
  notSelected?: boolean;
}

const NativeSelectComponent: React.FC<
  NativeSelectProps & AdaptivityContextInterface
> = ({
  style,
  defaultValue = "",
  align,
  placeholder,
  children,
  className,
  getRef,
  getRootRef,
  disabled,
  sizeX,
  sizeY,
  multiline,
  selectType = SelectType.Default,
  ...restProps
}) => {
  const platform = usePlatform();
  const [title, setTitle] = React.useState("");
  const [empty, setEmpty] = React.useState(false);
  const [value, onChange] = useEnsuredControl(restProps, { defaultValue });
  const selectRef = useExternRef(getRef);
  useIsomorphicLayoutEffect(() => {
    const selectedOption =
      selectRef.current?.options[selectRef.current.selectedIndex];
    if (selectedOption) {
      setTitle(selectedOption.text);
      setEmpty(selectedOption.value === "" && placeholder != null);
    }
  }, [value, children]);

  return (
    <FormField
      Component="label"
      vkuiClass={classNames(
        getClassName("Select", platform),
        `Select--${selectType}`,
        empty && "Select--empty",
        multiline && "Select--multiline",
        align && `Select--align-${align}`,
        `Select--sizeX-${sizeX}`,
        `Select--sizeY-${sizeY}`
      )}
      className={className}
      style={style}
      getRootRef={getRootRef}
      disabled={disabled}
      after={<DropdownIcon />}
    >
      <select
        {...restProps}
        disabled={disabled}
        vkuiClass="Select__el"
        onChange={onChange}
        value={value}
        ref={selectRef}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
      <div vkuiClass="Select__container">
        <SelectTypography vkuiClass="Select__title">{title}</SelectTypography>
      </div>
    </FormField>
  );
};

export const NativeSelect = withAdaptivity(NativeSelectComponent, {
  sizeX: true,
  sizeY: true,
});
