import { formatFiles, names, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { DirectiveGeneratorSchema } from './schema';
import { normalizeOptions } from '../../utils/normalize-options';
import { addFiles } from '../../utils/add-files';
import { firstLetterLowerCase } from '../../utils/first-letter-lowercase';

export async function directiveGenerator(
  tree: Tree,
  options: DirectiveGeneratorSchema
) {
  const normalizedOptions = normalizeOptions({
    tree,
    options,
    tags: ['type:directive'],
    directoryContainer: 'directives',
  });

  await libraryGenerator(tree, {
    name: normalizedOptions.name,
    directory: normalizedOptions.directory,
    tags: normalizedOptions.parsedTags.join(','),
    skipModule: true,
  });

  addFiles(tree, normalizedOptions, __dirname, {
    workspaceSelector: firstLetterLowerCase(names(normalizedOptions.npmScope).className)
  });

  await formatFiles(tree);
}

export default directiveGenerator;
