import { libraryGenerator } from '@nx/angular/generators';
import { formatFiles, names, Tree } from '@nx/devkit';
import { addFiles } from '../../utils/add-files';
import { firstLetterLowerCase } from '../../utils/first-letter-lowercase';
import { normalizeOptions } from '../../utils/normalize-options';
import { PipeGeneratorSchema } from './schema';

export async function pipeGenerator(tree: Tree, options: PipeGeneratorSchema) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:pipe'],
    directoryContainer: 'pipes',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
    buildable: true,
  });

  addFiles(tree, normalizedOptions, __dirname, {
    pipeSelector: normalizedOptions.originalDirectory
      ? `${firstLetterLowerCase(names(normalizedOptions.npmScope).className)}${
          names(normalizedOptions.originalDirectory.replace('/', '-')).className
        }${firstLetterLowerCase(names(normalizedOptions.npmScope).className)}`
      : `${firstLetterLowerCase(
          names(normalizedOptions.npmScope).className
        )}${firstLetterLowerCase(names(normalizedOptions.npmScope).className)}`,
  });

  await formatFiles(tree);
}

export default pipeGenerator;
