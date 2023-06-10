import { libraryGenerator } from '@nx/angular/generators';
import {
  formatFiles,
  names,
  Tree,
} from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { normalizeOptions } from '../../utils/normalize-options';
import { SmartComponentGeneratorSchema } from './schema';

export async function smartComponentGenerator(
  tree: Tree,
  options: SmartComponentGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:smart-component'],
    directoryContainer: 'smart-components',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
    buildable: true
  });

  addFiles(tree, normalizedOptions, __dirname, {
    componentSelector: normalizedOptions.originalDirectory
    ? `${normalizedOptions.npmScope}-${normalizedOptions.originalDirectory.replace('/', '-')}-${
        names(normalizedOptions.name).fileName
      }`
    : `${normalizedOptions.npmScope}-${
        names(normalizedOptions.name).fileName
      }`
  });

  await formatFiles(tree);
}

export default smartComponentGenerator;
