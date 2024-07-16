import { createRenderer, Config } from '@lightningjs/solid';
import { useFocusManager } from '@lightningtv/solid/primitives';

Config.rendererOptions = {
  rootId: 'storybook-root',
  appWidth: 800,
  appHeight: 600,
  // enableInspector: true
  // deviceLogicalPixelRatio: 1
};

let dispose;
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    Story => {
      const solidRoot = document.createElement('div');
      // teardown previous render (cleans up keyhandling)
      dispose && dispose();

      const { renderer, render } = createRenderer(undefined, solidRoot);
      loadFonts(renderer.stage);

      dispose = render(() => {
        useFocusManager();
        return <Story />;
      });

      return solidRoot;
    }
  ]
};

export default preview;
