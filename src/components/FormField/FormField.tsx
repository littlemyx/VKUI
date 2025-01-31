import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { HasComponent, HasRootRef } from "../../types";
import { hasReactNode } from "../../lib/utils";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import "./FormField.css";

export interface FormFieldProps {
  /**
   * Добавляет иконку слева.
   *
   * Рекомендации:
   *
   * - Используйте следующие размеры иконок `12` | `16` | `20` | `24` | `28`.
   * - Используйте [IconButton](#/IconButton), если вам нужна кликабельная иконка.
   */
  before?: React.ReactNode;
  /**
   * Добавляет иконку справа.
   *
   * Рекомендации:
   *
   * - Используйте следующие размеры иконок `12` | `16` | `20` | `24` | `28`.
   * - Используйте [IconButton](#/IconButton), если вам нужна кликабельная иконка.
   */
  after?: React.ReactNode;
}

interface FormFieldOwnProps
  extends React.AllHTMLAttributes<HTMLElement>,
    HasRootRef<HTMLElement>,
    HasComponent,
    FormFieldProps {
  disabled?: boolean;
}

export const FormField: React.FC<FormFieldOwnProps> = ({
  Component = "div",
  children,
  getRootRef,
  before,
  after,
  disabled,
  ...restProps
}: FormFieldOwnProps) => {
  const platform = usePlatform();
  const { sizeY } = useAdaptivity();
  const [hover, setHover] = React.useState(false);

  const handleMouseEnter = (e: MouseEvent) => {
    e.stopPropagation();
    setHover(true);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    e.stopPropagation();
    setHover(false);
  };

  return (
    <Component
      role="presentation"
      {...restProps}
      ref={getRootRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      vkuiClass={classNames(
        getClassName("FormField", platform),
        `FormField--sizeY-${sizeY}`,
        disabled && "FormField--disabled"
      )}
    >
      {hasReactNode(before) && (
        <div role="presentation" vkuiClass="FormField__before">
          {before}
        </div>
      )}
      {children}
      {hasReactNode(after) && (
        <div role="presentation" vkuiClass="FormField__after">
          {after}
        </div>
      )}
      <div
        role="presentation"
        vkuiClass={classNames(
          "FormField__border",
          !disabled && hover && "FormField__border--hover"
        )}
      />
    </Component>
  );
};
