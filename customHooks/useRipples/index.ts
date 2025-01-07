import { useEffect, useRef } from 'react';
import { BackgroundRipplesProps } from './interface';
import { Ripples } from './ripplesClass';

/**************************************
 *
 * 使用绘制 ripples
 *
 * - canvas  `usrRef` 包裹的 `HTMLCanvasElement`，用于绘制图像
 * - props   初始化的
 *
 * 下面是在 <BackgroundRipple> 中使用
 *
 * ```ts
 * import { useRipples } from 'oops-ui/useRipples';
 * // 也可以使用包全量导入
 * // import { useRipples } from 'oops-ui';
 *
 *  export function BackgroundRipple(props: BackgroundRipplesProps) {
 *
 *   // canvas 元素
 *  const canvas = useRef<HTMLCanvasElement>(null);
 *
 *  // 使用 ripples
 *  const ripplesRef = useRipples(canvas, props);
 *
 *  if (props.children) {
 *    return (
 *          <div style={props.style} className="lmssee-ripples">
 *          {props.children}
 *          <canvas ref={canvas}></canvas>
 *        </div>
 *      );
 *    } else {
 *      return <canvas ref={canvas}></canvas>;
 *    }
 *  }
 *
 * ```
 *
 **************************************/
export function useRipples(
  canvas: React.RefObject<HTMLCanvasElement>,
  props?: BackgroundRipplesProps,
): React.RefObject<Ripples> {
  const ripples = useRef<Ripples>(null);

  useEffect(() => {
    ripples.current = new Ripples(canvas.current!, props.children === undefined, props.option);
    return () => ripples.current.destroy();
  }, []);

  return ripples;
}

export { Ripples };
