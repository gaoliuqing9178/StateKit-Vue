/**
 * shared 包的入口只负责导出跨框架共享的协议与预设元数据。
 * 它刻意不依赖 Vue，这样文档站、脚本、代码生成和其他框架适配层都能复用同一份定义。
 */

export * from "./types";
export * from "./block-meta";
