import {
  newSparkE2EPage,
  a11yCheck
} from '../../../../../../test/e2eTestUtils';

describe('gux-rich-text-editor-action-link', () => {
  describe('#render', () => {
    [
      `<gux-rich-text-editor-beta>
  <gux-rich-text-editor-action-group slot="inserting">
    <gux-rich-text-editor-action-link></gux-rich-text-editor-action-link>
  </gux-rich-text-editor-action-group>
  <div class="editorElement" slot="editor"></div>
    </gux-rich-text-editor-beta>`
    ].forEach((html, index) => {
      it(`should display component as expected (${index + 1})`, async () => {
        const page = await newSparkE2EPage({ html });

        const element = await page.find('gux-rich-text-editor-action-link');

        await a11yCheck(page);

        expect(element.outerHTML).toMatchSnapshot();
      });
    });
  });

  describe('a11y', () => {
    ['disabled'].forEach(property => {
      it(`should be accessible when "${property}" is set`, async () => {
        const html = `<gux-rich-text-editor-action-link ${property}"></gux-rich-text-editor-action-link>`;
        const page = await newSparkE2EPage({ html });

        await a11yCheck(page);
      });
    });
  });
});
