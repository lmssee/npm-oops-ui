import { ripplesRenderDataWarehouse } from '../rippersData/renderData';
import { Ripples } from '../ripplesClass';
import { bindTexture } from '../tools';
import { drawQuad } from './drawQuad';
import { swapBufferIndices } from './swapBufferIndices';

export function update(this: Ripples) {
  const { gl } = this;
  const renderData = ripplesRenderDataWarehouse[this.sole];
  const { resolution, updateProgram, textures, framebuffers, bufferWriteIndex, bufferReadIndex } =
    renderData;
  /** 视口设定。官网指出在 canvas 的尺寸变化时需要告知视口  */
  gl.viewport(0, 0, resolution, resolution);
  /**  将给定的 WebGLFramebuffer 绑定到目标
   * - gl.FRAMEBUFFER 收集永远渲染的颜色
   * - this.#Framebuffers
   */
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffers[bufferWriteIndex]);
  Reflect.apply(bindTexture, this, [textures[bufferReadIndex]]);
  /**  将定义好的 WebGLProgram 对喜添加到当前的渲染状态中  */
  gl.useProgram(updateProgram.id!);
  Reflect.apply(drawQuad, this, []);
  Reflect.apply(swapBufferIndices, this, []);
}
