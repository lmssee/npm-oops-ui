/****************************************************************************
 * @Author lmssee
 * @Email lmssee@outlook.com
 * @ProjectName website
 * @FileName index.tsx
 * @CreateDate  周四  12/12/2024
 * @Description 涟漪
 ****************************************************************************/
import { useEffect, useRef } from 'react';
import React from 'react';
import { BackgroundRipplesProps, RipplesOptions } from 'customHooks/useRipples/types';
import { Ripples, useRipples } from 'customHooks/useRipples';

/**************************************
 *
 * ### 一个 ripple 背景组件
 *
 *
 * *需要为该组件或父组件设置背景，否则即便的渲染了，效果不明显*
 *
 *  参数 props 属性：
 * - children 内嵌的 ReactNode
 * - style    更改显示的样式
 * - option   初始化 ripples 的原始数据
 * @param props  使用参数
 * @version 0.0.1
 * @see https://lmssee.com/oops-ui/background-ripple
 * @example
 * 使用：
 *
 * ```ts
 *  import { BackgroundRipple } from 'oops-ui/BackgroundRipple';
 *  // 也可以全量导入
 *  // import { BackgroundRipple } from 'oops-ui';
 *  ...
 *  const animationFrameId = useAnimationFrame();
 *
 *  return <BackgroundRipple>
 *            ...
 *         </BackgroundRipple>
 * ```
 *
 **************************************/

export function BackgroundRipple(props: BackgroundRipplesProps) {
  /**************************
   * canvas 元素
   **************************/
  const canvas = useRef<HTMLCanvasElement>(null);
  /**************************
   * 使用 ripples
   **************************/
  const ripplesRef = useRipples(canvas, props);
  /**************************
   * 使用 配置更新
   **************************/
  useOptionUpdate(ripplesRef, props);

  return <canvas ref={canvas}></canvas>;
}

/**************************
 * 更新参数数据
 **************************/
function useOptionUpdate(
  ripplesRef: React.RefObject<Ripples | null>,
  props: BackgroundRipplesProps,
) {
  /**  监听数据变化并给值  */
  useEffect(() => {
    if (props.option && ripplesRef.current) {
      const options = props.option;
      (Object.keys(ripplesRef.current.defaults) as unknown as (keyof RipplesOptions)[]).forEach(
        e => {
          if (options[e] !== undefined) {
            ripplesRef.current && ripplesRef.current.set(e as keyof RipplesOptions, options[e]);
          }
        },
      );
    }
  }, [props.option]);
}
