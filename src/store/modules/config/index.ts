import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import type { UploadFileInfo } from 'naive-ui';
import { SetupStoreId } from '@/enum';
import { appendImage, fetchConfig, fetchImageList, updateConfig } from '@/service/api';

const { VITE_SERVICE_BASE_URL } = import.meta.env;

export const useConfigStore = defineStore(SetupStoreId.Config, () => {
  const { loading: configLoading, startLoading, endLoading } = useLoading();

  /**
   * Get config
   *
   * @param filePath File path
   * @param fileName File name
   */
  async function getConfig(filePath: string, fileName: string) {
    startLoading();

    const { data: config } = await fetchConfig(filePath, fileName);
    const res = JSON.stringify(config, null, '  ');

    endLoading();

    return res ?? '';
  }

  /**
   * Update config
   *
   * @param filePath File path
   * @param fileName File name
   * @param code File content
   */
  async function setConfig(filePath: string, fileName: string, code: string) {
    startLoading();

    await updateConfig(filePath, fileName, code);

    endLoading();
  }

  /**
   * Get image list
   *
   * @param filePath File path
   */
  async function getImageList(filePath: string) {
    startLoading();

    const { data: list } = await fetchImageList(filePath);
    const res = (list ?? []).map(fileName => {
      return {
        id: fileName,
        name: fileName,
        status: 'finished',
        url: `${VITE_SERVICE_BASE_URL}/image/get/${filePath}/${fileName}`
      } as UploadFileInfo;
    });

    endLoading();

    return res;
  }

  /**
   * Update image url
   *
   * @param filePath File path
   * @param fileName File name
   */
  function updateImageUrl(filePath: string, fileName: string) {
    return `${VITE_SERVICE_BASE_URL}/image/get/${filePath}/${fileName}`;
  }

  /**
   * Update image
   *
   * @param data request data
   */
  async function uploadImage(data: any) {
    startLoading();

    await appendImage(data);

    endLoading();
  }

  return {
    configLoading,
    getConfig,
    setConfig,
    getImageList,
    updateImageUrl,
    uploadImage
  };
});
