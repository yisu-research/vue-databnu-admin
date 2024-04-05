import { demoRequest } from '../request';

/**
 * Get config
 *
 * @param filePath File path
 * @param fileName File name
 */
export function fetchConfig(filePath: string, fileName: string) {
  return demoRequest<Api.Config.Json>({
    url: `/config/get/${filePath}/${fileName}`,
    method: 'get'
  });
}

/**
 * Update config
 *
 * @param filePath File path
 * @param fileName File name
 * @param configData File name
 */
export function updateConfig(filePath: string, fileName: string, configData: any) {
  return demoRequest({
    url: '/config/write',
    method: 'post',
    data: {
      file_path: filePath,
      file_name: fileName,
      data: configData
    }
  });
}
