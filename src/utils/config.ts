

/**
 *  全局配置样式
 *
 * @interface GlobalDataConfig
 */
interface GlobalDataConfig {
  domainUrl: string;  // 不带协议 例如 'oetest.joyrry.com',
}

export const globalData: GlobalDataConfig = {
  domainUrl: 'http://5c92dbfae7b1a00014078e61.mockapi.io',
};
