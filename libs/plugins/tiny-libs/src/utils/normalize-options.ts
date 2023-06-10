import {
  getWorkspaceLayout,
  getWorkspacePath,
  names,
  readNxJson,
  Tree,
} from '@nx/devkit';
import { readPackageJson } from 'nx/src/project-graph/file-utils';

export interface NormalizedSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  originalDirectory?: string;
  parsedTags: string[];
  npmScope: string;
}

export function normalizeOptions<
  T extends { name: string; directory?: string }
>({
  tree,
  options,
  tags,
  directoryContainer,
}: {
  tree: Tree;
  options: T;
  tags: string[];
  directoryContainer: string;
}): NormalizedSchema & T {
  const name = names(options.name).fileName;
  const originalDirectory = options.directory;
  options.directory = options.directory
    ? `${options.directory}/${directoryContainer}`
    : directoryContainer;
  const projectDirectory = `${names(options.directory).fileName}/${name}`;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const npmScope = (readPackageJson().name as string)
    .replace('@', '')
    .replace('/source', '');

  return {
    ...options,
    originalDirectory,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags: tags,
    npmScope
  };
}
