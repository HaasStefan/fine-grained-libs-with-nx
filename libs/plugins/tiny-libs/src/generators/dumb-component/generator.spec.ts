import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { dumbComponentGenerator } from './generator';
import { DumbComponentGeneratorSchema } from './schema';

describe('dumb generator', () => {
  let tree: Tree;
  const options: DumbComponentGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await dumbComponentGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
