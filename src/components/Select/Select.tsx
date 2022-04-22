import * as React from "react";
import { NativeSelect } from "../NativeSelect/NativeSelect";
import { CustomSelect, CustomSelectProps } from "../CustomSelect/CustomSelect";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { VKCOM } from "../../lib/platform";
import {
  AdaptivityContextInterface,
  AdaptivityProps,
  SizeType,
} from "../AdaptivityProvider/AdaptivityContext";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import Text from "../Typography/Text/Text";
import Headline from "../Typography/Headline/Headline";

export enum SelectType {
  Default = "default",
  Plain = "plain",
  Accent = "accent",
}

export const SelectTypography: React.FC<
  Pick<CustomSelectProps, "selectType">
> = ({ selectType = SelectType.Default, children, ...restProps }) => {
  const platform = usePlatform();
  const { sizeY } = useAdaptivity();

  if (selectType === SelectType.Accent) {
    return (
      <Paragraph weight="2" {...restProps}>
        {children}
      </Paragraph>
    );
  }

  const Component =
    platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;

  return (
    <Component weight="regular" Component="span" {...restProps}>
      {children}
    </Component>
  );
};

export interface SelectProps extends CustomSelectProps, AdaptivityProps {}

const SelectComponent: React.FC<SelectProps & AdaptivityContextInterface> = ({
  hasMouse,
  ...props
}: SelectProps) => {
  // Use custom select if device has connected a mouse
  if (hasMouse) {
    const { children, ...restProps } = props;

    return <CustomSelect {...restProps} />;
  }

  const { options = [], popupDirection, renderOption, ...restProps } = props;

  return (
    <NativeSelect {...restProps}>
      {options.map(({ label, value }) => (
        <option value={value} key={`${value}`}>
          {label}
        </option>
      ))}
    </NativeSelect>
  );
};

export const Select = withAdaptivity(SelectComponent, {
  hasMouse: true,
});
