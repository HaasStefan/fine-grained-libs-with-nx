import { generateFiles, names, Tree } from '@nx/devkit';
import * as path from 'path';
import { NormalizedSchema } from './normalize-options';

export function addFiles<T extends { name: string }>(
  tree: Tree,
  options: NormalizedSchema & T,
  dirName: string,
  additionalTemplateOptions: Record<string, unknown> = {}
) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    template: '',
    ...additionalTemplateOptions,
  };
  generateFiles(
    tree,
    path.join(dirName, 'files'),
    options.projectRoot,
    templateOptions
  );
}
