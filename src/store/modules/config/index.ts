import { defineStore } from 'pinia';
import { useLoading } from '@sa/hooks';
import { SetupStoreId } from '@/enum';
import { fetchConfig, updateConfig } from '@/service/api';

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

    const config = await fetchConfig(filePath, fileName);

    endLoading();

    return config ?? {};
  }

  /**
   * Update config
   *
   * @param filePath File path
   * @param fileName File name
   * @param configData File content
   */
  async function setConfig(filePath: string, fileName: string, configData: any) {
    startLoading();

    await updateConfig(filePath, fileName, configData);

    endLoading();
  }

  return {
    configLoading,
    getConfig,
    setConfig
  };
});
