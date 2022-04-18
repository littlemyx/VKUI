import * as React from "react";
import { classNames } from "../../lib/classNames";
import { DropdownIcon } from "../DropdownIcon/DropdownIcon";
import { FormField } from "../FormField/FormField";
import { HasAlign, HasRootRef } from "../../types";
import {
  withAdaptivity,
  AdaptivityProps,
  SizeType,
} from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import Headline from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
import { VKCOM } from "../../lib/platform";
import { SelectType } from "../CustomSelect/CustomSelect";
import "../Select/Select.css";
import "./SelectMimicry.css";

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

const SelectMimicry: React.FC<SelectMimicryProps> = ({
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
      // eslint-disable-next-line vkui/no-object-expression-in-arguments
      vkuiClass={classNames(
        getClassName("Select", platform),
        "Select--mimicry",
        `Select--mimicry-${selectType}`,
        {
          "Select--not-selected": !children,
          "Select--multiline": multiline,
          [`Select--align-${align}`]: !!align,
          [`Select--sizeX--${sizeX}`]: !!sizeX,
          [`Select--sizeY--${sizeY}`]: !!sizeY,
        }
      )}
      getRootRef={getRootRef}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      after={after}
    >
      <div
        vkuiClass={classNames(
          "Select__container",
          `Select__container--${selectType}`
        )}
      >
        {platform === VKCOM || sizeY === SizeType.COMPACT ? (
          <Text
            weight={selectType === SelectType.Plain ? "2" : undefined}
            vkuiClass="Select__title"
          >
            {title}
          </Text>
        ) : (
          <Headline
            weight={selectType === SelectType.Plain ? "semibold" : "regular"}
            vkuiClass="Select__title"
          >
            {title}
          </Headline>
        )}
      </div>
    </FormField>
  );
};

// eslint-disable-next-line import/no-default-export
export default withAdaptivity(SelectMimicry, {
  sizeX: true,
  sizeY: true,
});
