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
 * @param code File name
 */
export function updateConfig(filePath: string, fileName: string, code: string) {
  return demoRequest({
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
  return demoRequest<Api.Config.ImageList>({
    url: `/image/list/${filePath}`,
    method: 'get'
  });
}

/**
 * Get image
 *
 * @param filePath File path
 * @param fileName File name
 */
export function fetchImage(filePath: string, fileName: string) {
  return demoRequest<Api.Config.Json>({
    url: `/image/get/${filePath}/${fileName}`,
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
export function appendImage(filePath: string, fileName: string, code: any) {
  return demoRequest({
    url: '/config/write',
    method: 'post',
    data: {
      file_path: filePath,
      file_name: fileName,
      data: code
    }
  });
}
