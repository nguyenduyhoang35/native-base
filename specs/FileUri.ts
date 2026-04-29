import { NativeModules } from 'react-native';

interface FileUriModule {
  getContentUri(path: string): Promise<string>;
}

const { FileUri } = NativeModules as { FileUri: FileUriModule };

export function getContentUri(path: string): Promise<string> {
  return FileUri.getContentUri(path);
}
