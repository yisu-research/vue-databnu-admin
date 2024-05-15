import { request } from '../request';

/**
 * Get config
 *
 * @param filePath File path
 * @param fileName File name
 */
export function fetchConfig(filePath: string, fileName: string) {
  return request<Api.Config.Json>({
    url: `/config/get/${filePath}/${fileName}`,
    method: 'get'
  });
}

/**
 * Update config
 *
 * @param filePath File path
 * @param fileName File name
 * @param code File name
 */
export function updateConfig(filePath: string, fileName: string, code: string) {
  return request<undefined>({
    url: '/config/write',
    method: 'post',
    data: {
      file_path: filePath,
      file_name: fileName,
      code: JSON.parse(code)
    }
  });
}

/**
 * Get image list
 *
 * @param filePath File path
 */
export function fetchImageList(filePath: string) {
  return request<Api.Config.ImageList>({
    url: `/image/list/${filePath}`,
    method: 'get'
  });
}

/**
 * Append image
 *
 * @param data request data
 */
export function appendImage(data: object) {
  return request<undefined>({
    url: '/image/write',
    method: 'post',
    ...data
  });
}
