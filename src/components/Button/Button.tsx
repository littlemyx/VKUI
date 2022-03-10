import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import Tappable, { TappableProps } from "../Tappable/Tappable";
import { Title } from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Caption } from "../Typography/Caption/Caption";
import { HasAlign, HasComponent } from "../../types";
import { usePlatform } from "../../hooks/usePlatform";
import {
  AdaptivityProps,
  SizeType,
  withAdaptivity,
} from "../../hoc/withAdaptivity";
import { PlatformType, IOS, VKCOM, ANDROID } from "../../lib/platform";
import Spinner from "../Spinner/Spinner";
import Headline from "../Typography/Headline/Headline";
import styles from "./Button.module.css";

export interface VKUIButtonProps extends HasAlign {
  /**
   Значения `commerce`, `destructive`, `overlay_...` будут упразднены в 5.0.0
   */
  mode?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "outline"
    | "commerce"
    | "destructive"
    | "overlay_primary"
    | "overlay_secondary"
    | "overlay_outline";
  appearance?: "accent" | "positive" | "negative" | "neutral" | "overlay";
  size?: "s" | "m" | "l";
  stretched?: boolean;
  before?: React.ReactNode;
  after?: React.ReactNode;
  loading?: boolean;
}

export interface ButtonProps
  extends Omit<TappableProps, "size">,
    VKUIButtonProps {}

interface ButtonTypographyProps extends HasComponent {
  size: ButtonProps["size"];
  platform: PlatformType | undefined;
  sizeY: AdaptivityProps["sizeY"];
  className?: string;
  children?: ButtonProps["children"];
}

const sizeClasses = {
  s: styles["Button--sz-s"],
  m: styles["Button--sz-m"],
  l: styles["Button--sz-l"],
};

const modeClasses = {
  primary: styles["Button--lvl-primary"],
  secondary: styles["Button--lvl-secondary"],
  tertiary: styles["Button--lvl-tertiary"],
  outline: styles["Button--lvl-outline"],

  // Для обратной совместимости в CSS созданы все последующие классы:
  //  TODO удалить перед релизом 5.0.0
  commerce: styles["Button--lvl-commerce"],
  destructive: styles["Button--lvl-destructive"],
  overlay_primary: styles["Button--lvl-overlay_primary"],
  overlay_secondary: styles["Button--lvl-overlay_secondary"],
  overlay_outline: styles["Button--lvl-overlay_outline"],
};

const appearanceClasses = {
  accent: styles["Button--clr-accent"],
  positive: styles["Button--clr-positive"],
  negative: styles["Button--clr-negative"],
  neutral: styles["Button--clr-neutral"],
  overlay: styles["Button--clr-overlay"],
};

const alignClasses = {
  left: styles["Button--aln-left"],
  center: styles["Button--aln-center"], // для обратной совместимости в CSS создан пустой класс
  right: styles["Button--aln-right"],
};

const sizeYClasses = {
  compact: styles["Button--sizeY-compact"], // для обратной совместимости в CSS создан пустой класс
  regular: styles["Button--sizeY-regular"],
};

const ButtonTypography: React.FC<ButtonTypographyProps> = (props) => {
  const { size, sizeY, platform, ...restProps } = props;
  const isCompact = sizeY === SizeType.COMPACT;

  switch (size) {
    case "l":
      if (isCompact) {
        return <Text weight="medium" {...restProps} />;
      }
      if (platform === ANDROID) {
        return <Headline weight="medium" {...restProps} />;
      }
      return <Title level="3" weight="2" {...restProps} />;
    case "m":
      if (isCompact) {
        return (
          <Subhead weight={platform === VKCOM ? "3" : "2"} {...restProps} />
        );
      }

      return <Text weight="medium" {...restProps} />;
    case "s":
    default:
      if (platform === IOS) {
        return <Subhead weight="2" {...restProps} />;
      }

      if (platform === VKCOM) {
        return <Caption {...restProps} />;
      }

      if (isCompact) {
        return <Caption weight="2" {...restProps} />;
      }

      return <Subhead weight="2" {...restProps} />;
  }
};

interface ResolvedButtonAppearance {
  resolvedAppearance: ButtonProps["appearance"];
  resolvedMode: ButtonProps["mode"];
}

function resolveButtonAppearance(
  appearance: ButtonProps["appearance"],
  mode: ButtonProps["mode"]
): ResolvedButtonAppearance {
  let resolvedAppearance: ButtonProps["appearance"] = appearance;
  let resolvedMode: ButtonProps["mode"] = mode;

  if (appearance === undefined) {
    switch (mode) {
      case "tertiary":
      case "secondary":
      case "primary":
      case "outline":
        resolvedAppearance = "accent";
        break;
      case "commerce":
        resolvedMode = "primary";
        resolvedAppearance = "positive";
        break;
      case "destructive":
        resolvedMode = "primary";
        resolvedAppearance = "negative";
        break;
      case "overlay_primary":
        resolvedMode = "primary";
        resolvedAppearance = "overlay";
        break;
      case "overlay_secondary":
        resolvedMode = "secondary";
        resolvedAppearance = "overlay";
        break;
      case "overlay_outline":
        resolvedMode = "outline";
        resolvedAppearance = "overlay";
        break;
    }
  }

  return {
    resolvedAppearance,
    resolvedMode,
  };
}

const ButtonComponent: React.FC<ButtonProps> = ({
  size = "s",
  mode = "primary",
  appearance,
  stretched = false,
  align = "center",
  children,
  before,
  after,
  getRootRef,
  sizeY,
  Component = "button",
  loading,
  onClick,
  stopPropagation = true,
  className,
  ...restProps
}) => {
  const platform = usePlatform();
  const hasIcons = Boolean(before || after);
  const { resolvedMode, resolvedAppearance } = resolveButtonAppearance(
    appearance,
    mode
  );
  const hasNewTokens = React.useContext(ConfigProviderContext).hasNewTokens;

  return (
    <Tappable
      {...restProps}
      Component={restProps.href ? "a" : Component}
      onClick={loading ? undefined : onClick}
      focusVisibleMode="outside"
      stopPropagation={stopPropagation}
      className={classNamesString(
        className,
        styles.Button,
        size && sizeClasses[size],
        resolvedMode && modeClasses[resolvedMode],
        resolvedAppearance && appearanceClasses[resolvedAppearance],
        align && alignClasses[align],
        sizeY && sizeYClasses[sizeY],
        stretched && styles["Button--stretched"],
        hasIcons && styles["Button--with-icon"], // для обратной совместимости в CSS создан пустой класс
        Boolean(
          (!children && !after && before) || (!children && after && !before)
        ) && styles["Button--singleIcon"]
      )}
      getRootRef={getRootRef}
      hoverMode={hasNewTokens ? styles["Button--hover"] : "background"}
      activeMode={hasNewTokens ? styles["Button--active"] : "opacity"}
    >
      {loading && <Spinner size="small" vkuiClass={styles.Button__spinner} />}
      <span vkuiClass={styles.Button__in}>
        {before && <span className={styles.Button__before}>{before}</span>}
        {children && (
          <ButtonTypography
            size={size}
            sizeY={sizeY}
            platform={platform}
            className={styles.Button__content}
            Component="span"
          >
            {children}
          </ButtonTypography>
        )}
        {after && <span className={styles.Button__after}>{after}</span>}
      </span>
    </Tappable>
  );
};

export const Button = withAdaptivity(ButtonComponent, {
  sizeY: true,
});
